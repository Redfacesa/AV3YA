import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AV3YA_SOCIAL } from '@/lib/social';
import { fetchStorefrontContent } from '@/lib/site-content';
import { getAv3yaConfig, getMerchantIdFromConfig } from '@/lib/platform-config';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'AV3YA — One of a kind streetwear',
  description: 'A brand for the outcasts, the originals, the ones who create their own path.',
  openGraph: {
    title: 'AV3YA',
    description: 'One of a kind. Different by design.',
    type: 'website',
    images: [{ url: '/brand/hero-main.png' }],
  },
  other: {
    'instagram:site': AV3YA_SOCIAL.instagram,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={`${inter.variable} ${bebas.variable} antialiased bg-black text-white`}>
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
