import Link from 'next/link';

type Props = {
  href?: string;
  label?: string;
  className?: string;
};

/** Mockup-style CTA: outlined label + pink arrow box */
export default function Av3yaEnterButton({
  href = '/shop',
  label = 'ENTER AV3YA',
  className = '',
}: Props) {
  return (
    <Link href={href} className={`btn-enter group ${className}`}>
      <span className="btn-enter-label">{label}</span>
      <span className="btn-enter-arrow" aria-hidden>
        ↗
      </span>
    </Link>
  );
}
