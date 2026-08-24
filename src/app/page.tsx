import Hero from '@/components/Hero';
import NavGrid from '@/components/NavGrid';
import NewDropSection from '@/components/NewDropSection';
import WorldSection, { StorySection } from '@/components/WorldSection';
import { fetchProducts } from '@/lib/api';
import { getAv3yaConfig, getMerchantIdFromConfig } from '@/lib/platform-config';

export default async function HomePage() {
  const config = await getAv3yaConfig();
  const merchantId = getMerchantIdFromConfig(config);

  const products = await fetchProducts({ merchantId, featured: true, limit: 4 }).catch(() => []);
  const featured = products.length
    ? products
    : await fetchProducts({ merchantId, limit: 4 }).catch(() => []);

  return (
    <>
      <Hero />
      <NavGrid />
      <NewDropSection products={featured} />
      <WorldSection />
      <StorySection />
    </>
  );
}
