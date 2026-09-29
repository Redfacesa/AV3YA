import Image from 'next/image';
import Link from 'next/link';
import { LAB_COLORWAYS, LAB_LOOKBOOK, LAB_PRODUCTS, LAB_TURN_FRAMES } from '@/lib/lab-media';
import LabChemistryLines from '@/components/LabChemistryLines';

const PUZZLE = [
  { src: LAB_TURN_FRAMES[0], className: 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto', label: 'Body · Front' },
  { src: LAB_TURN_FRAMES[1], className: 'aspect-square', label: 'Body · Side' },
  { src: LAB_TURN_FRAMES[2], className: 'aspect-[4/5]', label: 'Body · Back' },
  { src: LAB_LOOKBOOK, className: 'md:col-span-2 aspect-[16/8]', label: 'Lookbook mosaic' },
  { src: LAB_TURN_FRAMES[3], className: 'aspect-[5/4]', label: 'Cobalt in lab' },
  { src: LAB_TURN_FRAMES[4], className: 'md:col-span-2 aspect-[16/9]', label: 'Magenta in lab' },
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
            <div className="relative aspect-[16/10] max-h-[420px] border border-black/10 overflow-hidden bg-neutral-50">
              <Image src={LAB_PRODUCTS} alt="Base syndicate tracksuits" fill className="object-contain p-4" sizes="(max-width: 1024px) 100vw, 60vw" />
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {LAB_COLORWAYS.map((look) => (
                <Link
                  key={look.id}
                  href="/shop"
                  className="relative min-h-[88px] lg:min-h-0 lg:flex-1 border border-black/10 overflow-hidden bg-white"
                >
                  <Image src={look.src} alt={look.name} fill className="object-cover" sizes="200px" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${look.tint} to-transparent`} />
                  <span className="absolute bottom-2 left-2 lab-chip text-black">{look.name}</span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 gap-3 md:h-[820px]">
            {PUZZLE.map((tile) => (
              <article key={tile.label} className={`relative overflow-hidden border border-white/15 bg-black ${tile.className}`}>
                <Image src={tile.src} alt={tile.label} fill className="object-contain object-center p-1" sizes="(max-width: 768px) 50vw, 33vw" />
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
            Empty chambers for the next upload. Add products in Admin and they land here.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Slot A', 'Slot B', 'Slot C', 'Slot D'].map((slot) => (
              <div
                key={slot}
                className="aspect-[3/4] border border-dashed border-black/20 bg-white flex flex-col items-center justify-center text-center p-4"
              >
                <p className="lab-chip text-black/35 mb-2">{slot}</p>
                <p className="text-xs text-black/35">Awaiting specimen</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-black border-t">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
          <p className="lab-chip text-white/40 mb-2">Image trays</p>
          <h2 className="font-display text-4xl leading-none mb-8">ADD MORE STUDIES</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {['Collection stills', 'Campaign frames', 'Lab notes'].map((tray) => (
              <div key={tray} className="min-h-[160px] border border-white/15 bg-black flex items-center justify-center">
                <p className="lab-chip text-white/40">{tray} · drop images in Admin</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
