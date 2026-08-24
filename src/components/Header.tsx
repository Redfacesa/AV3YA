'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Av3yaLogo from '@/components/Av3yaLogo';
import { useCart } from '@/lib/store';

const NAV = [
  { href: '/', label: 'HOME', match: (p: string) => p === '/' },
  { href: '/shop', label: 'SHOP', match: (p: string) => p.startsWith('/shop') || p.startsWith('/product') },
  { href: '/shop', label: 'COLLECTIONS', match: () => false },
  { href: '/inspiration', label: 'CHARACTERS', match: (p: string) => p.startsWith('/inspiration') },
  { href: '/#world', label: 'WORLD', match: (p: string) => p.includes('#world') },
  { href: '/#story', label: 'ABOUT', match: (p: string) => p.includes('#story') },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const itemCount = useCart((s) => s.itemCount());

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[72px]">
          <Av3yaLogo variant="full" href="/" priority className="shrink-0" />

          <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link ${active ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase">
            <Link href="/search" className="nav-utility hidden sm:inline">
              Search
            </Link>
            <Link href="/dashboard" className="nav-utility hidden md:inline">
              Account
            </Link>
            <Link href="/cart" className="nav-utility">
              Cart ({itemCount})
            </Link>
            <button
              type="button"
              className="lg:hidden nav-utility"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/80" onClick={closeMenu} aria-label="Close menu" />
          <nav className="absolute top-16 left-0 right-0 bg-black border-b border-white/10 px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMenu} className="nav-link text-base">
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={closeMenu} className="nav-utility text-sm pt-2 border-t border-white/10">
              Account
            </Link>
            <Link href="/admin" onClick={closeMenu} className="nav-utility text-sm">
              Admin
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
