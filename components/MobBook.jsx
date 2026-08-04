import Link from 'next/link';

export function MobBook({ location }) {
  return (
    <Link href={`/${location.slug}/tickets`} className="mob-book" aria-label="Book tickets">
      <div>
        <div>Book now</div>
        <div className="price">{location.pricing.fromLabel}</div>
      </div>
      <span className="go">Reserve →</span>
    </Link>
  );
}
