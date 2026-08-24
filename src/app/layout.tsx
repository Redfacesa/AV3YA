import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AV3YA_SOCIAL } from '@/lib/social';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'AV3YA — Anime streetwear & neon fashion',
  description:
    'Limited anime-inspired drops, bold streetwear, and instant checkout with RedFace Pay.',
  keywords: ['AV3YA', 'anime fashion', 'streetwear', 'South Africa', 'RedFace Pay'],
  openGraph: {
    title: 'AV3YA',
    description: 'Wear the voltage. Shop anime streetwear and pay with RedFace Pay.',
    type: 'website',
  },
  other: {
    'instagram:site': AV3YA_SOCIAL.instagram,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://av3ya.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'AV3YA',
    url: siteUrl,
    sameAs: [AV3YA_SOCIAL.instagram].filter(Boolean),
    areaServed: 'ZA',
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} antialiased bg-av3ya-black text-av3ya-mist`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
