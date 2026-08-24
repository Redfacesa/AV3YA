import Link from 'next/link';

const ITEMS = [
  { num: '01', label: 'SHOP', sub: 'ショップ', href: '/shop' },
  { num: '02', label: 'COLLECTIONS', sub: 'コレクション', href: '/shop' },
  { num: '03', label: 'CHARACTERS', sub: 'キャラクター', href: '/inspiration' },
  { num: '04', label: 'WORLD', sub: '世界', href: '/#world' },
  { num: '05', label: 'AV3YA', sub: 'アヴィヤ', href: '/#story' },
];

export default function NavGrid() {
  return (
    <section className="border-y border-white/10 bg-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {ITEMS.map((item) => (
          <Link
            key={item.num}
            href={item.href}
            className="nav-grid-item group"
          >
            <span className="text-av3ya-neon/80 text-xs font-display tracking-widest">{item.num}</span>
            <span className="font-display text-lg sm:text-xl tracking-wide text-white group-hover:text-av3ya-neon transition-colors">
              {item.label}
            </span>
            <span className="text-[10px] text-white/35 tracking-widest">{item.sub}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
