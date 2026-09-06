import Link from 'next/link';

const ITEMS = [
  { num: '01', label: 'LAB', sub: 'ラボ', href: '/' },
  { num: '02', label: 'EXPERIMENTS', sub: '実験', href: '/shop' },
  { num: '03', label: 'SPECIMENS', sub: '標本', href: '/shop' },
  { num: '04', label: 'ARCHIVE', sub: 'アーカイブ', href: '/inspiration' },
  { num: '05', label: 'CLASSIFIED', sub: '機密', href: '/#world' },
];

export default function NavGrid() {
  return (
    <section className="border-y border-black/10 bg-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map((item) => (
          <Link
            key={item.num}
            href={item.href}
            className="nav-grid-item group"
          >
            <span className="text-black/40 text-xs font-mono tracking-widest">{item.num}</span>
            <span className="font-display text-lg sm:text-xl tracking-wide text-black group-hover:opacity-60 transition-opacity">
              {item.label}
            </span>
            <span className="text-[10px] text-black/35 tracking-widest">{item.sub}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
