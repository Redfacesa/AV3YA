'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { FashionProduct } from '@/lib/types';
import { fmtZar } from '@/lib/api';
import { useCart, useWishlist } from '@/lib/store';

type Props = {
  products: FashionProduct[];
  title?: string;
};

export default function ProductGrid({ products, title = 'Featured Products' }: Props) {
  const addItem = useCart((s) => s.addItem);
  const { toggle, has } = useWishlist();

  if (!products.length) {
    return (
      <section className="section-padding py-24">
        <h2 className="font-display text-4xl mb-8">{title}</h2>
        <p className="text-black/50">No products yet. Add items from admin or your RedFace Pay merchant portal.</p>
      </section>
    );
  }

  return (
    <section className="section-padding py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="font-display text-4xl lg:text-5xl mb-2">{title}</h2>
          <p className="text-black/50">Curated pieces from our latest collection</p>
        </div>
        <Link href="/shop" className="text-black hover:opacity-60 transition-opacity text-sm hidden sm:block">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, i) => {
          const cover = product.images?.[0] ?? product.image_url;
          return (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 border border-black/10">
              <Link href={`/product/${product.id}`}>
                {cover ? (
                  <Image
                    src={cover}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">👕</div>
                )}
              </Link>

              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => toggle(product.id)}
                  className={`w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center transition-colors ${has(product.id) ? 'text-av3ya-classified' : 'text-black/70 hover:text-black'}`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} fill={has(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button
                  type="button"
                  onClick={() => addItem(product)}
                  className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-black/70 hover:text-black transition-colors"
                  aria-label="Quick add to cart"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>

              {product.stock_quantity != null && product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-av3ya-testing text-white text-xs tracking-widest uppercase">
                  Only {product.stock_quantity} left
                </span>
              )}
            </div>

            <Link href={`/product/${product.id}`}>
              <h3 className="font-medium mb-1 group-hover:opacity-60 transition-opacity line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center justify-between">
              <span className="font-semibold font-mono text-sm">{fmtZar(product.price)}</span>
              {product.rating != null && (
                <span className="flex items-center gap-1 text-xs text-black/40">
                  <Star size={12} className="text-black fill-black" />
                  {product.rating.toFixed(1)}
                </span>
              )}
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-1.5 mt-2">
                {product.colors.slice(0, 5).map((c) => (
                  <span
                    key={c.name}
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}
