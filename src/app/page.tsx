import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import TailoringSection from '@/components/TailoringSection';
import AIFeatures from '@/components/AIFeatures';
import { fetchCategories, fetchProducts, fetchTailoringServices } from '@/lib/api';
import { getAv3yaConfig, getMerchantIdFromConfig } from '@/lib/platform-config';

export default async function HomePage() {
  const config = await getAv3yaConfig();
  const merchantId = getMerchantIdFromConfig(config);

  const [categories, products, services] = await Promise.all([
    fetchCategories(merchantId).catch(() => []),
    fetchProducts({ merchantId, featured: true, limit: 8 }).catch(() => []),
    fetchTailoringServices(merchantId).catch(() => []),
  ]);

  const featured = products.length
    ? products
    : await fetchProducts({ merchantId, limit: 8 }).catch(() => []);

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <ProductGrid products={featured} />
      <TailoringSection services={services} />
      <AIFeatures />
    </>
  );
}
