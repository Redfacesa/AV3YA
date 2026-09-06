'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Minus, Plus, ShoppingBag, Star, Truck } from 'lucide-react';
import type { FashionProduct } from '@/lib/types';
import { fetchProduct, fetchProducts, fmtZar } from '@/lib/api';
import { useCart, useWishlist } from '@/lib/store';
import RedFacePayButtons from '@/components/RedFacePayButtons';
import ProductGrid from '@/components/ProductGrid';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<FashionProduct | null>(null);
  const [similar, setSimilar] = useState<FashionProduct[]>([]);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState<string>();
  const [color, setColor] = useState<string>();
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCart((s) => s.addItem);
  const { toggle, has } = useWishlist();

  useEffect(() => {
    if (!id) return;
    fetchProduct(id).then((p) => {
      setProduct(p);
      setActiveImage(0);
      if (p?.sizes?.length) setSize(p.sizes.find((s) => s.inStock)?.label);
      if (p?.colors?.length) setColor(p.colors[0].name);
    });
    fetchProducts({ limit: 4 }).then(setSimilar);
  }, [id]);

  if (!product) {
    return <div className="pt-32 section-padding text-black/40">Loading product...</div>;
  }

  const images = product.images?.length ? product.images : product.image_url ? [product.image_url] : [];

  return (
    <div className="pt-24 pb-16">
      <div className="section-padding">
        <nav className="text-sm text-black/40 mb-8">
          <Link href="/shop" className="hover:text-black">Shop</Link>
          {product.category_name && (
            <>
              <span className="mx-2">/</span>
              <span>{product.category_name}</span>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-black/70">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
              {images[activeImage] ? (
                <Image src={images[activeImage]} alt={product.name} fill className="object-cover" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-8xl">👕</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 8).map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-black/5 border-2 transition-colors ${
                      activeImage === idx ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl lg:text-4xl mb-2">{product.name}</h1>
            {product.rating != null && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(product.rating!) ? 'text-black fill-black' : 'text-black/20'} />
                  ))}
                </div>
                <span className="text-sm text-black/40">({product.review_count ?? 0} reviews)</span>
              </div>
            )}
            <div className="flex items-end justify-between gap-4 mb-6">
              <p className="text-3xl font-mono font-semibold">{fmtZar(product.price)}</p>
              <p className="lab-chip text-av3ya-active">● In stock</p>
            </div>
            {product.description && <p className="text-black/60 leading-relaxed mb-8">{product.description}</p>}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-black/50 mb-3">Color: <span className="text-black">{color}</span></p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color === c.name ? 'border-black scale-110' : 'border-black/15'}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-black/50 mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      disabled={!s.inStock}
                      onClick={() => setSize(s.label)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        size === s.label
                          ? 'border-black bg-black text-white'
                          : s.inStock
                            ? 'border-black/15 hover:border-black/40'
                            : 'border-black/10 text-black/30 line-through cursor-not-allowed'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center glass rounded-full">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-black/60 hover:text-black">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button type="button" onClick={() => setQty(qty + 1)} className="p-3 text-black/60 hover:text-black">
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => toggle(product.id)}
                className={`p-3 rounded-full glass ${has(product.id) ? 'text-red-400' : 'text-black/60 hover:text-black'}`}
              >
                <Heart size={20} fill={has(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="space-y-3 mb-8">
              <button
                type="button"
                onClick={() => addItem(product, { size, color, quantity: qty })}
                className="btn-primary w-full flex"
              >
                <ShoppingBag size={18} />
                Acquire Specimen
              </button>
              <RedFacePayButtons
                amount={product.price * qty}
                label={product.name}
                onBuyNow={() => addItem(product, { size, color, quantity: qty })}
              />
            </div>

            {product.fabric && (
              <div className="glass rounded-xl p-4 mb-4">
                <p className="text-sm text-black/50">Fabric</p>
                <p className="text-sm">{product.fabric}</p>
              </div>
            )}
            {product.delivery_info && (
              <div className="flex items-start gap-3 text-sm text-black/50">
                <Truck size={18} className="text-black shrink-0 mt-0.5" />
                <p>{product.delivery_info}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {similar.length > 0 && <ProductGrid products={similar.filter((p) => p.id !== product.id)} title="Similar Products" />}
    </div>
  );
}
