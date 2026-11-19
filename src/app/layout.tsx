import type { Metadata } from 'next';
import { Bebas_Neue, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_UNDER_CONSTRUCTION } from '@/lib/construction';
import { AV3YA_SOCIAL } from '@/lib/social';
import { fetchStorefrontContent } from '@/lib/site-content';
import { getAv3yaConfig, getMerchantIdFromConfig } from '@/lib/platform-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const plex = IBM_Plex_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = SITE_UNDER_CONSTRUCTION
  ? {
      title: 'AV3YA — Under construction',
      description: 'AV3YA is under construction.',
      robots: { index: false, follow: false },
    }
  : {
      title: 'AV3YA Labs — The future is currently under development',
      description: 'Clinical streetwear from AV3YA Labs. Experiments in fabric, silhouette, and identity.',
      openGraph: {
        title: 'AV3YA Labs',
        description: 'The future is currently under development.',
        type: 'website',
        images: [{ url: '/brand/hero-main.jpg' }],
      },
      other: {
        'instagram:site': AV3YA_SOCIAL.instagram,
      },
    };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  if (SITE_UNDER_CONSTRUCTION) {
    return (
      <html lang="en">
        <body className={`${inter.variable} ${bebas.variable} ${plex.variable} antialiased bg-white text-black`}>
          <div className="flex min-h-svh w-full flex-col items-center justify-center bg-white">
            <p className="font-display text-5xl tracking-wide text-black">AV3YA</p>
            <p className="mt-4 text-[11px] tracking-[0.35em] uppercase text-black/40">Under construction</p>
          </div>
        </body>
      </html>
    );
  }

  const config = await getAv3yaConfig();
  const merchantId = getMerchantIdFromConfig(config);
  const storefront = merchantId
    ? await fetchStorefrontContent(merchantId).catch(() => null)
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://av3ya.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'AV3YA',
    url: siteUrl,
    sameAs: [storefront?.instagram, storefront?.tiktok, storefront?.youtube].filter(Boolean),
    areaServed: 'ZA',
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} ${plex.variable} antialiased bg-white text-black`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer social={storefront ?? undefined} />
      </body>
    </html>
  );
}
