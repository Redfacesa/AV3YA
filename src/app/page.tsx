import Hero from '@/components/Hero';
import NavGrid from '@/components/NavGrid';
import NewDropSection from '@/components/NewDropSection';
import ProductRail from '@/components/ProductRail';
import WorldSection, { StorySection } from '@/components/WorldSection';
import { fetchProducts } from '@/lib/api';
import { fetchStorefrontContent } from '@/lib/site-content';
import { getAv3yaConfig, getMerchantIdFromConfig } from '@/lib/platform-config';

export default async function HomePage() {
  const config = await getAv3yaConfig();
  const merchantId = getMerchantIdFromConfig(config);

  const [allProducts, storefront] = await Promise.all([
    fetchProducts({ merchantId, limit: 24 }).catch(() => []),
    fetchStorefrontContent(merchantId).catch(() => ({
      worldVideoUrl: null,
      instagram: null,
      tiktok: null,
      youtube: null,
    })),
  ]);

  const newest = allProducts;
  const featured = allProducts.filter((p) => p.featured);
  const newDrop = newest.slice(0, 2);
  const justArrived = newest.slice(0, 4);
  const bestSelling = (featured.length ? featured : newest).slice(0, 4);

  return (
    <>
      <Hero />
      <NavGrid />
      <NewDropSection products={newDrop} />
      <ProductRail
        title="JUST ARRIVED"
        subtitle="Newest uploads from your catalog show here automatically."
        products={justArrived}
        max={4}
      />
      <ProductRail
        title="FEATURED"
        subtitle="Mark products as featured in Admin to highlight them here."
        products={bestSelling}
        max={4}
        viewAllLabel="VIEW MORE"
      />
      <WorldSection videoUrl={storefront.worldVideoUrl} />
      <StorySection />
    </>
  );
}
