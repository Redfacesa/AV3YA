import Image from 'next/image';
import Link from 'next/link';
import {
  LAB_COLORWAYS,
  LAB_LANDSCAPE,
  LAB_PORTRAITS,
  LAB_PRODUCTS,
  LAB_SPECIAL,
  LAB_TRAYS,
} from '@/lib/lab-media';
import LabChemistryLines from '@/components/LabChemistryLines';

const PUZZLE = [
  {
    src: LAB_LANDSCAPE.group,
    className: 'col-span-2 md:row-span-2 aspect-[3/2] md:aspect-auto',
    label: 'Campaign room',
  },
  {
    src: LAB_PORTRAITS.leoHood,
    className: 'aspect-square md:row-span-2 md:aspect-auto',
    label: 'Leopard lining',
  },
  {
    src: LAB_PORTRAITS.pinkBack,
    className: 'aspect-[2/3] md:row-span-2 md:aspect-auto',
    label: 'Magenta lace',
  },
  {
    src: LAB_LANDSCAPE.duo,
    className: 'col-span-2 aspect-[3/2]',
    label: 'Syndicate pair',
  },
  {
    src: LAB_PORTRAITS.blueKneel,
    className: 'aspect-[2/3]',
    label: 'Cobalt',
  },
  {
    src: LAB_PORTRAITS.blackSit,
    className: 'aspect-[2/3]',
    label: 'Black syndicate',
  },
];

export default function LabPuzzle() {
  return (
    <>
      <section className="relative band-white border-t">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
          <p className="lab-chip text-black/40 mb-2">Base clothes</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-none mb-3">THE CUT</h2>
          <p className="text-sm text-black/45 max-w-lg mb-8">
            Core syndicate set — hoodie and pants in cobalt, origin white, and magenta.
          </p>
          <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-4">
            <div className="relative aspect-[3/2] max-h-[520px] border border-black/10 overflow-hidden bg-neutral-50">
              <Image
                src={LAB_PRODUCTS}
                alt="AV3YA Syndicate colourways"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {LAB_COLORWAYS.map((look) => (
                <Link
                  key={look.id}
                  href="/shop"
                  className="relative min-h-[120px] lg:min-h-[140px] border border-black/10 overflow-hidden bg-white"
                >
                  <Image src={look.src} alt={look.name} fill className="object-cover object-top" sizes="280px" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${look.tint} to-transparent`} />
                  <span className="absolute bottom-2 left-2 lab-chip text-black bg-white/80 px-2 py-1">{look.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative band-black border-t overflow-hidden">
        <LabChemistryLines className="opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
          <p className="lab-chip text-white/40 mb-2">Body studies</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-none mb-8">SPECIMEN PUZZLE</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-3 md:h-[860px]">
            {PUZZLE.map((tile) => (
              <article key={tile.label} className={`relative overflow-hidden border border-white/15 bg-black ${tile.className}`}>
                <Image src={tile.src} alt={tile.label} fill className="object-cover object-center" sizes="(max-width: 768px) 50vw, 40vw" />
                <p className="absolute top-2 left-2 lab-chip bg-black/70 text-white px-2 py-1">{tile.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-white border-t">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
          <p className="lab-chip text-black/40 mb-2">Reserved tray</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-none mb-3">SPECIAL COLLECTION</h2>
          <p className="text-sm text-black/45 max-w-lg mb-8">
            Extra cuts from the last studio day — leopard, fleece, lace, and paired looks.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {LAB_SPECIAL.map((slot) => (
              <Link key={slot.label} href="/shop" className="relative aspect-[2/3] border border-black/10 bg-neutral-100 overflow-hidden group">
                <Image src={slot.src} alt={slot.label} fill className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                <p className="absolute bottom-2 left-2 lab-chip bg-white/85 text-black px-2 py-1">{slot.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band-black border-t">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
          <p className="lab-chip text-white/40 mb-2">Image trays</p>
          <h2 className="font-display text-4xl leading-none mb-8">MORE STUDIES</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {LAB_TRAYS.map((tray) => (
              <div key={tray.label} className="relative min-h-[280px] sm:min-h-[360px] border border-white/15 bg-black overflow-hidden">
                <Image src={tray.src} alt={tray.label} fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, 33vw" />
                <p className="absolute bottom-3 left-3 lab-chip bg-black/70 text-white px-2 py-1">{tray.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
