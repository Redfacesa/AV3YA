import Link from 'next/link';
import Image from 'next/image';
import type { StorefrontContent } from '@/lib/site-content';

type Props = {
  social?: Pick<StorefrontContent, 'instagram' | 'tiktok' | 'youtube'>;
};

export default function Footer({ social }: Props) {
  const links = [
    social?.instagram ? { label: 'Instagram', href: social.instagram } : null,
    social?.tiktok ? { label: 'TikTok', href: social.tiktok } : null,
    social?.youtube ? { label: 'YouTube', href: social.youtube } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/brand/logo.png"
              alt="AV3YA"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-black/40 text-xs max-w-xs leading-relaxed tracking-[0.14em] uppercase">
            AV3YA Labs // Researching identity.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs tracking-[0.2em] uppercase">
          <div>
            <p className="text-black/30 mb-3">Shopping</p>
            <ul className="space-y-2 text-black/60 font-medium tracking-wide normal-case">
              <li><Link href="/shop" className="hover:text-black transition-colors">Experiments</Link></li>
              <li><Link href="/cart" className="hover:text-black transition-colors">Cart</Link></li>
              <li><Link href="/dashboard" className="hover:text-black transition-colors">Access</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-black/30 mb-3">Support</p>
            <ul className="space-y-2 text-black/60 font-medium tracking-wide normal-case">
              <li><Link href="/terms" className="hover:text-black transition-colors">Returns</Link></li>
              <li><Link href="/terms" className="hover:text-black transition-colors">FAQ</Link></li>
              <li><a href="mailto:av3ya.inc@gmail.com" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-black/30 mb-3">The Lab</p>
            <ul className="space-y-2 text-black/60 font-medium tracking-wide normal-case">
              <li><Link href="/#story" className="hover:text-black transition-colors">About</Link></li>
              <li><Link href="/inspiration" className="hover:text-black transition-colors">Archive</Link></li>
              <li><Link href="/#world" className="hover:text-black transition-colors">Classified</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-black/30 mb-3">Social</p>
            <ul className="space-y-2 text-black/60 font-medium tracking-wide normal-case">
              {links.length ? (
                links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))
              ) : (
                <li><span className="text-black/35">Add links in Admin → Storefront</span></li>
              )}
              <li><a href="mailto:av3ya.inc@gmail.com" className="hover:text-black transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-black/30 tracking-widest uppercase">
        <p>© {new Date().getFullYear()} AV3YA Labs. All rights reserved.</p>
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2a1.2 1.2 0 0 1 1.06.63l1.1 2.12 2.34.34a1.2 1.2 0 0 1 .67 2.05l-1.7 1.65.4 2.33A1.2 1.2 0 0 1 14.5 12L12.3 11l-2.2 1.16a1.2 1.2 0 0 1-1.37-.9l.4-2.33-1.7-1.65a1.2 1.2 0 0 1 .67-2.05l2.34-.34 1.1-2.12A1.2 1.2 0 0 1 12 2Zm-6.5 13.2 1.7 1.2-1.7 1.2L4 18.8l1.5 1.2 1.7-1.2 1.7 1.2 1.5-1.2-1.7-1.2 1.7-1.2-1.5-1.2-1.7 1.2-1.7-1.2-1.5 1.2Zm13 0 1.7 1.2-1.7 1.2-1.5 1.2 1.5 1.2 1.7-1.2 1.7 1.2 1.5-1.2-1.7-1.2 1.7-1.2-1.5-1.2-1.7 1.2-1.7-1.2-1.5 1.2ZM12 13.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
          />
        </svg>
        <p>Secure checkout · Payments via RedFace Pay</p>
      </div>
    </footer>
  );
}
