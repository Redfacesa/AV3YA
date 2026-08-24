'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/admin-auth';

type Props = {
  merchantId: string;
};

export default function StorefrontSettings({ merchantId }: Props) {
  const [worldVideoUrl, setWorldVideoUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [youtube, setYoutube] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !merchantId) return;

    void supabase
      .from('pangolin_site_content')
      .select('id, section, video_url, metadata')
      .eq('merchant_id', merchantId)
      .in('section', ['world_intro', 'social_links'])
      .then(({ data }) => {
        for (const row of data ?? []) {
          if (row.section === 'world_intro' && row.video_url) {
            setWorldVideoUrl(String(row.video_url));
          }
          if (row.section === 'social_links' && row.metadata && typeof row.metadata === 'object') {
            const m = row.metadata as Record<string, string>;
            if (m.instagram) setInstagram(m.instagram);
            if (m.tiktok) setTiktok(m.tiktok);
            if (m.youtube) setYoutube(m.youtube);
          }
        }
      });
  }, [merchantId]);

  async function upsertSection(
    section: string,
    payload: { video_url?: string | null; metadata?: Record<string, string> },
  ) {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not configured');
    await requireAdminAuth();

    const { data: existing } = await supabase
      .from('pangolin_site_content')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('section', section)
      .maybeSingle();

    if (existing?.id) {
      const { error } = await supabase
        .from('pangolin_site_content')
        .update({ ...payload, active: true })
        .eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('pangolin_site_content').insert({
        merchant_id: merchantId,
        section,
        active: true,
        sort_order: 0,
        ...payload,
      });
      if (error) throw error;
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await upsertSection('world_intro', {
        video_url: worldVideoUrl.trim() || null,
      });
      await upsertSection('social_links', {
        metadata: {
          instagram: instagram.trim(),
          tiktok: tiktok.trim(),
          youtube: youtube.trim(),
        },
      });
      setMessage('Storefront updated. Changes appear on the shop homepage.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
      <div className="glass rounded-xl p-5 sm:p-6 space-y-4">
        <h2 className="text-xl font-semibold">World intro video</h2>
        <p className="text-sm text-white/50">
          Paste a YouTube, Vimeo, or direct video link. It appears in the &quot;This is AV3YA&quot; section on the homepage.
        </p>
        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Video URL</label>
        <input
          type="url"
          value={worldVideoUrl}
          onChange={(e) => setWorldVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30"
        />
      </div>

      <div className="glass rounded-xl p-5 sm:p-6 space-y-4">
        <h2 className="text-xl font-semibold">Social links</h2>
        <p className="text-sm text-white/50">Shown in the footer and inspiration page when set.</p>
        {[
          { label: 'Instagram URL', value: instagram, set: setInstagram, ph: 'https://instagram.com/av3ya' },
          { label: 'TikTok URL', value: tiktok, set: setTiktok, ph: 'https://tiktok.com/@av3ya' },
          { label: 'YouTube URL', value: youtube, set: setYoutube, ph: 'https://youtube.com/@av3ya' },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">{field.label}</label>
            <input
              type="url"
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.ph}
              className="w-full rounded-lg bg-black/40 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30"
            />
          </div>
        ))}
      </div>

      <button type="submit" disabled={busy} className="btn-enter disabled:opacity-50">
        <span className="btn-enter-label">{busy ? 'Saving…' : 'Save storefront'}</span>
        <span className="btn-enter-arrow">↗</span>
      </button>

      {message && <p className="text-sm text-av3ya-neon">{message}</p>}
    </form>
  );
}
