'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Av3yaLogo from '@/components/Av3yaLogo';
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Scissors,
  Search,
} from 'lucide-react';
import { useCart } from '@/lib/store';

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/#story', label: 'Story' },
  { href: '/try-on', label: 'Try On' },
  { href: '/inspiration', label: 'Inspiration' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const itemCount = useCart((s) => s.itemCount());

  const closeMenu = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeMenu]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="section-padding flex items-center justify-between h-16 lg:h-20">
          <Av3yaLogo variant="icon" href="/" className="sm:hidden" priority />
          <Av3yaLogo variant="full" href="/" className="hidden sm:inline-flex" priority />

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-white/70 hover:text-av3ya-neon transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <Link href="/search" className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Search">
              <Search size={20} />
            </Link>
            <Link href="/wishlist" className="p-2 text-white/70 hover:text-white transition-colors hidden sm:block" aria-label="Wishlist">
              <Heart size={20} />
            </Link>
            <Link href="/dashboard" className="p-2 text-white/70 hover:text-white transition-colors hidden sm:block" aria-label="Account">
              <User size={20} />
            </Link>
            <Link href="/cart" className="relative p-2 text-white/70 hover:text-white transition-colors" aria-label="Cart">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-av3ya-neon text-av3ya-black text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 text-white/70 relative z-[60]"
              onClick={open ? closeMenu : openMenu}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-16 left-0 right-0 z-[56] lg:hidden border-t border-white/10 glass overflow-hidden"
            >
              <nav className="section-padding py-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="py-3 text-lg text-white/80 hover:text-av3ya-neon transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/dashboard" onClick={closeMenu} className="py-3 text-lg text-white/80 hover:text-av3ya-neon flex items-center gap-2">
                  <User size={18} /> My Account
                </Link>
                <Link href="/admin" onClick={closeMenu} className="py-3 text-lg text-white/80 hover:text-av3ya-neon flex items-center gap-2">
                  <Scissors size={18} /> Admin
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
