import { Suspense } from 'react';
import ShopClient from './ShopClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-24 section-padding text-white/40">Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
