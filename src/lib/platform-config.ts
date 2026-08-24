import { getSupabase, SITE_URL } from './supabase';

export type Av3yaPlatformConfig = {
  slug: string;
  name: string;
  siteUrl: string;
  domains: string[];
  payMerchantId: string;
  adminEmails: string[];
  merchant?: {
    id: string;
    business_name: string;
    email: string;
    status: string;
    paystack_subaccount?: string;
    site_slug?: string;
  };
};

const FALLBACK: Av3yaPlatformConfig = {
  slug: 'av3ya',
  name: 'AV3YA',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://av3ya.vercel.app',
  domains: [
    'av3ya.vercel.app',
    'av3ya-redfacesa-8644s-projects.vercel.app',
    'av3ya-git-main-redfacesa-8644s-projects.vercel.app',
    'localhost',
    '127.0.0.1',
  ],
  payMerchantId: process.env.NEXT_PUBLIC_AV3YA_MERCHANT_ID ?? '',
  adminEmails: ['av3ya.inc@gmail.com', 'redfacesa@gmail.com', 'info@redfacepay.co.za'],
};

let cached: Av3yaPlatformConfig | null = null;

export async function getAv3yaConfig(): Promise<Av3yaPlatformConfig> {
  if (cached?.payMerchantId) return cached;

  const envMerchantId = process.env.NEXT_PUBLIC_AV3YA_MERCHANT_ID ?? '';
  if (envMerchantId) {
    cached = { ...FALLBACK, payMerchantId: envMerchantId };
    return cached;
  }

  const supabase = getSupabase();
  if (!supabase) return FALLBACK;

  try {
    const { data, error } = await supabase.rpc('get_ecosystem_app_config', { p_slug: 'av3ya' });
    if (error || !data?.ok) return FALLBACK;

    const adminEmails = Array.isArray(data.admin_emails)
      ? (data.admin_emails as string[])
      : FALLBACK.adminEmails;

    cached = {
      slug: String(data.slug ?? 'av3ya'),
      name: String(data.name ?? FALLBACK.name),
      siteUrl: String(data.site_url ?? FALLBACK.siteUrl),
      domains: Array.isArray(data.domains) ? (data.domains as string[]) : FALLBACK.domains,
      payMerchantId: String(data.pay_merchant_id ?? ''),
      adminEmails,
      merchant: data.merchant as Av3yaPlatformConfig['merchant'],
    };
    return cached;
  } catch {
    return FALLBACK;
  }
}

export function getMerchantIdFromConfig(config: Av3yaPlatformConfig): string {
  return config.payMerchantId || process.env.NEXT_PUBLIC_AV3YA_MERCHANT_ID || '';
}

export function isAv3yaAdmin(email: string | null | undefined, config?: Av3yaPlatformConfig): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const admins = config?.adminEmails ?? FALLBACK.adminEmails;
  return admins.some((a) => a.toLowerCase() === normalized);
}

export function resolveSiteUrl(config?: Av3yaPlatformConfig): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return config?.siteUrl ?? SITE_URL;
}
