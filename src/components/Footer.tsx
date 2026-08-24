import Link from 'next/link';
import Image from 'next/image';
import { AV3YA_SOCIAL } from '@/lib/social';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/brand/logo.png"
              alt="AV3YA"
              width={160}
              height={48}
              className="h-10 w-auto brightness-0 invert hue-rotate-[300deg] saturate-[4]"
            />
          </Link>
          <p className="text-white/40 text-xs max-w-xs leading-relaxed">
            Different by design. Unapologetically original. Made to be experienced.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs tracking-[0.2em] uppercase">
          <div>
            <p className="text-white/30 mb-3">Shopping</p>
            <ul className="space-y-2 text-white/60 font-medium tracking-wide normal-case">
              <li><Link href="/shop" className="hover:text-av3ya-neon transition-colors">Shop all</Link></li>
              <li><Link href="/cart" className="hover:text-av3ya-neon transition-colors">Cart</Link></li>
              <li><Link href="/dashboard" className="hover:text-av3ya-neon transition-colors">Account</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white/30 mb-3">Support</p>
            <ul className="space-y-2 text-white/60 font-medium tracking-wide normal-case">
              <li><Link href="/terms" className="hover:text-av3ya-neon transition-colors">Returns</Link></li>
              <li><Link href="/terms" className="hover:text-av3ya-neon transition-colors">FAQ</Link></li>
              <li><a href={AV3YA_SOCIAL.email} className="hover:text-av3ya-neon transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-white/30 mb-3">Brand</p>
            <ul className="space-y-2 text-white/60 font-medium tracking-wide normal-case">
              <li><Link href="/#story" className="hover:text-av3ya-neon transition-colors">About</Link></li>
              <li><Link href="/inspiration" className="hover:text-av3ya-neon transition-colors">Characters</Link></li>
              <li><Link href="/#world" className="hover:text-av3ya-neon transition-colors">World</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white/30 mb-3">Social</p>
            <ul className="space-y-2 text-white/60 font-medium tracking-wide normal-case">
              <li><span className="text-white/35">Instagram · soon</span></li>
              <li><span className="text-white/35">TikTok · soon</span></li>
              <li><a href={AV3YA_SOCIAL.email} className="hover:text-av3ya-neon transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between gap-3 text-[10px] text-white/30 tracking-widest uppercase">
        <p>© {new Date().getFullYear()} AV3YA</p>
        <p>Payments via RedFace Pay</p>
      </div>
    </footer>
  );
}
