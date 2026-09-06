import Image from 'next/image';
import Link from 'next/link';
import { LAB_COLORWAYS, LAB_LOOKBOOK, LAB_PRODUCTS } from '@/lib/lab-media';
import LabChemistryLines from '@/components/LabChemistryLines';

export default function SpecimenLooks() {
  return (
    <section className="relative overflow-hidden border-t border-black/10 bg-white">
      <LabChemistryLines className="opacity-70" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="lab-chip text-black/40 mb-2">Active specimens</p>
            <h2 className="font-display text-4xl sm:text-5xl leading-none">COLORWAYS IN TESTING</h2>
          </div>
          <p className="text-sm text-black/45 max-w-sm">
            Cobalt, origin white, and magenta — the same syndicate cut, three lab states.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {LAB_COLORWAYS.map((look) => (
            <Link
              key={look.id}
              href="/shop"
              className="group relative aspect-[4/5] overflow-hidden border border-black/10 bg-neutral-50"
            >
              <Image
                src={look.src}
                alt={look.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${look.tint} via-transparent to-transparent`} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="lab-chip text-black/45 mb-1">{look.label}</p>
                <p className="font-display text-2xl">{look.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 grid lg:grid-cols-2 gap-4">
          <div className="relative aspect-[16/10] overflow-hidden border border-black/10">
            <Image src={LAB_PRODUCTS} alt="AV3YA syndicate tracksuits" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden border border-black/10">
            <Image src={LAB_LOOKBOOK} alt="AV3YA Labs lookbook" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
