'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import type { Category, FashionProduct } from '@/lib/types';
import { DEFAULT_CATEGORIES } from '@/lib/types';
import { fetchCategories, fetchProducts } from '@/lib/api';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<FashionProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const cats = await fetchCategories().catch(() => []);
      setCategories(cats);

      const cat = cats.find((c) => c.slug === categorySlug);
      const prods = await fetchProducts({
        categoryId: cat?.id,
        limit: 50,
      }).catch(() => []);
      setProducts(prods);
      setLoading(false);
    }
    load();
  }, [categorySlug]);

  const allCats = categories.length
    ? categories
    : DEFAULT_CATEGORIES.map((c, i) => ({ ...c, id: `cat-${i}`, merchant_id: '' }));

  return (
    <div className="pt-24 pb-16">
      <div className="section-padding mb-12">
        <h1 className="font-display text-4xl lg:text-5xl mb-4">Shop</h1>
        <p className="text-white/50">Premium fashion for every occasion</p>
      </div>

      <div className="section-padding mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          <a
            href="/shop"
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              !categorySlug ? 'bg-av3ya-gold text-av3ya-black font-medium' : 'glass text-white/60 hover:text-white'
            }`}
          >
            All
          </a>
          {allCats.map((cat) => (
            <a
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                categorySlug === cat.slug ? 'bg-av3ya-gold text-av3ya-black font-medium' : 'glass text-white/60 hover:text-white'
              }`}
            >
              {cat.emoji} {cat.name}
            </a>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="section-padding py-24 text-center text-white/40">Loading collection...</div>
      ) : (
        <ProductGrid products={products} title="" />
      )}
    </div>
  );
}
