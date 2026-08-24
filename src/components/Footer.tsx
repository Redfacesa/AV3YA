import Link from 'next/link';
import Av3yaLogo from '@/components/Av3yaLogo';
import { Mail, MapPin } from 'lucide-react';
import { AV3YA_SOCIAL, AV3YA_SOCIAL_LINKS } from '@/lib/social';

export default function Footer() {
  return (
    <footer className="border-t border-av3ya-neon/15 mt-24">
      <div className="section-padding py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Av3yaLogo variant="full" href="/" className="mb-4" />
          <p className="text-white/55 text-sm leading-relaxed">
            Different by design. Unapologetically original. AV3YA blurs streetwear, luxury, art, and culture into
            pieces made to be experienced.
          </p>
          <div className="flex gap-4 mt-6">
            <a href={AV3YA_SOCIAL.email} className="text-white/40 hover:text-av3ya-neon transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-av3ya-neon">Shop</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=streetwear" className="hover:text-white transition-colors">Streetwear</Link></li>
            <li><Link href="/shop?category=syndicate" className="hover:text-white transition-colors">Syndicate</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-av3ya-neon">Brand</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/#story" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/inspiration" className="hover:text-white transition-colors">Inspiration</Link></li>
            <li><Link href="/try-on" className="hover:text-white transition-colors">Virtual Try-On</Link></li>
            <li><Link href="/tailoring" className="hover:text-white transition-colors">Alterations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-av3ya-neon">Contact</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-av3ya-neon" />
              <span>South Africa</span>
            </li>
            <li>
              <a href={AV3YA_SOCIAL.email} className="hover:text-av3ya-neon transition-colors">
                av3ya.inc@gmail.com
              </a>
            </li>
            {AV3YA_SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-av3ya-neon transition-colors"
                >
                  {link.label}: {link.handle}
                </a>
              </li>
            ))}
            <li>
              <span className="text-white/30">Payments via</span>
              <br />
              <span className="text-av3ya-neon font-semibold">RedFace Pay</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 section-padding py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} AV3YA. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
          <Link href="/admin" className="hover:text-white/60 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
