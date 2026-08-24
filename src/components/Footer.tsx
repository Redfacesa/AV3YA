import Link from 'next/link';
import Av3yaLogo from '@/components/Av3yaLogo';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import { AV3YA_SOCIAL, AV3YA_SOCIAL_LINKS } from '@/lib/social';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="section-padding py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Av3yaLogo variant="full" href="/" className="mb-4" />
          <p className="text-white/50 text-sm leading-relaxed">
            Africa&apos;s smartest fashion commerce platform. Shop, tailor, try on, and pay with RedFace Pay.
          </p>
          <div className="flex gap-4 mt-6">
            {AV3YA_SOCIAL_LINKS.map((link) => {
              const Icon = link.id === 'instagram' ? Instagram : Facebook;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-av3ya-gold transition-colors"
                  aria-label={`AV3YA on ${link.label}`}
                  title={link.handle}
                >
                  <Icon size={20} />
                </a>
              );
            })}
            <a href={AV3YA_SOCIAL.email} className="text-white/40 hover:text-av3ya-gold transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-av3ya-gold">Shop</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=mens-wear" className="hover:text-white transition-colors">Men&apos;s Wear</Link></li>
            <li><Link href="/shop?category=womens-wear" className="hover:text-white transition-colors">Women&apos;s Wear</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-av3ya-gold">Services</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><Link href="/tailoring" className="hover:text-white transition-colors">Tailoring & Alterations</Link></li>
            <li><Link href="/try-on" className="hover:text-white transition-colors">AI Virtual Try-On</Link></li>
            <li><Link href="/measurements" className="hover:text-white transition-colors">AI Measurements</Link></li>
            <li><Link href="/wardrobe" className="hover:text-white transition-colors">My Wardrobe</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-av3ya-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-av3ya-gold" />
              <span>South Africa</span>
            </li>
            {AV3YA_SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-av3ya-gold transition-colors"
                >
                  {link.label}: {link.handle}
                </a>
              </li>
            ))}
            <li>
              <span className="text-white/30">Payments powered by</span>
              <br />
              <span className="text-av3ya-gold font-semibold">RedFace Pay</span>
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
