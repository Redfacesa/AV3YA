import { getSupabase } from './supabase';

export type StorefrontContent = {
  worldVideoUrl: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
};

const EMPTY: StorefrontContent = {
  worldVideoUrl: null,
  instagram: null,
  tiktok: null,
  youtube: null,
};

function rowMeta(meta: unknown): Record<string, unknown> {
  return meta && typeof meta === 'object' ? (meta as Record<string, unknown>) : {};
}

export async function fetchStorefrontContent(merchantId: string): Promise<StorefrontContent> {
  const supabase = getSupabase();
  if (!merchantId || !supabase) return EMPTY;

  const { data } = await supabase
    .from('pangolin_site_content')
    .select('section, video_url, metadata')
    .eq('merchant_id', merchantId)
    .eq('active', true)
    .in('section', ['world_intro', 'social_links']);

  if (!data?.length) return EMPTY;

  let worldVideoUrl: string | null = null;
  let instagram: string | null = null;
  let tiktok: string | null = null;
  let youtube: string | null = null;

  for (const row of data) {
    if (row.section === 'world_intro' && row.video_url) {
      worldVideoUrl = String(row.video_url).trim() || null;
    }
    if (row.section === 'social_links') {
      const m = rowMeta(row.metadata);
      instagram = m.instagram ? String(m.instagram) : null;
      tiktok = m.tiktok ? String(m.tiktok) : null;
      youtube = m.youtube ? String(m.youtube) : null;
    }
  }

  return { worldVideoUrl, instagram, tiktok, youtube };
}

/** YouTube / Vimeo / direct mp4 → embed-friendly URL when possible */
export function resolveVideoEmbedUrl(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  const url = raw.trim();

  const ytMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/) ??
    url.match(/youtube\.com\/shorts\/([\w-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  if (/\.(mp4|webm)(\?|$)/i.test(url) || url.includes('supabase.co/storage')) return url;
  return url;
}

export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm)(\?|$)/i.test(url) || url.includes('supabase.co/storage');
}
