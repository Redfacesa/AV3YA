'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FashionProduct } from '@/lib/types';
import { fmtZar } from '@/lib/api';
import Av3yaEnterButton from '@/components/Av3yaEnterButton';

type Props = {
  products: FashionProduct[];
};

export default function NewDropSection({ products }: Props) {
  const drops = products.slice(0, 2);

  return (
    <section className="relative bg-black py-16 lg:py-24 overflow-hidden">
      <span className="vertical-label hidden xl:block" aria-hidden>
        ALL COLLECTION
      </span>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-6">
              NEW
              <br />
              DROP
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Limited pieces built to be experienced. Upload your first products in Admin to fill this section.
            </p>
            <Av3yaEnterButton href="/shop" label="SHOP NOW" />
          </div>

          {drops.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {drops.map((product) => {
                const cover = product.images?.[0] ?? product.image_url;
                return (
                  <article key={product.id} className="drop-card group">
                    <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-zinc-950">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={product.name}
                          fill
                          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display text-xl">
                          AV3YA
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                        <p className="font-display text-sm sm:text-base tracking-wide text-white mb-1">
                          {product.name.toUpperCase()}
                        </p>
                        <p className="text-av3ya-neon text-sm font-semibold tracking-wider">{fmtZar(product.price)}</p>
                      </div>
                    </Link>
                    <Link href={`/product/${product.id}`} className="drop-card-cta">
                      <span>VIEW PRODUCT</span>
                      <span className="btn-enter-arrow text-base">↗</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {[0, 1].map((slot) => (
                <article key={slot} className="drop-card">
                  <div className="relative aspect-[3/4] bg-zinc-950 border-b border-white/10 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="font-display text-2xl text-white/15">DROP {slot + 1}</span>
                    <p className="text-white/35 text-xs tracking-[0.15em] uppercase">Product image from your catalog</p>
                  </div>
                  <div className="drop-card-cta text-white/30 pointer-events-none">
                    <span>COMING SOON</span>
                    <span className="btn-enter-arrow text-base opacity-40">↗</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
