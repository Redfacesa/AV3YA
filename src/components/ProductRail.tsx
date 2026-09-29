'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FashionProduct } from '@/lib/types';
import { fmtZar } from '@/lib/api';
import Av3yaEnterButton from '@/components/Av3yaEnterButton';

type Props = {
  products: FashionProduct[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  emptyLabel?: string;
  max?: number;
  tone?: 'light' | 'dark';
};

export default function ProductRail({
  products,
  title,
  subtitle,
  viewAllHref = '/shop',
  viewAllLabel = 'VIEW ALL PRODUCTS',
  emptyLabel = 'Products you add in Admin appear here automatically.',
  max = 4,
  tone = 'light',
}: Props) {
  const items = products.slice(0, max);
  const dark = tone === 'dark';

  return (
    <section className={`${dark ? 'band-black' : 'band-white'} border-t py-16 lg:py-20`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl leading-none mb-3">{title}</h2>
            {subtitle && (
              <p className={`text-sm max-w-md ${dark ? 'text-white/45' : 'text-black/45'}`}>{subtitle}</p>
            )}
          </div>
          <Link
            href={viewAllHref}
            className={`text-xs tracking-[0.25em] uppercase transition-colors ${
              dark ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'
            }`}
          >
            {viewAllLabel} ↗
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {items.map((product) => {
              const cover = product.images?.[0] ?? product.image_url;
              return (
                <article key={product.id} className={`drop-card group ${dark ? 'border-white/15 bg-black' : ''}`}>
                  <Link href={`/product/${product.id}`} className={`block relative aspect-[3/4] overflow-hidden ${dark ? 'bg-neutral-950' : 'bg-neutral-100'}`}>
                    {cover ? (
                      <Image
                        src={cover}
                        alt={product.name}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-black/15 font-display">AV3YA</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[11px] sm:text-xs font-display tracking-wide text-white line-clamp-2">{product.name.toUpperCase()}</p>
                      <p className="text-white text-xs mt-1">{fmtZar(product.price)}</p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`aspect-[3/4] border flex items-center justify-center p-4 text-center ${dark ? 'border-white/15 bg-black' : 'border-black/10 bg-neutral-100'}`}>
                <p className={`text-[10px] tracking-[0.15em] uppercase ${dark ? 'text-white/30' : 'text-black/25'}`}>{emptyLabel}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Av3yaEnterButton href={viewAllHref} label="VIEW ALL PRODUCTS" />
        </div>
      </div>
    </section>
  );
}
