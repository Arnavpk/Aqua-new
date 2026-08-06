import { notFound } from 'next/navigation';
import { getLocation, getAllLocationSlugs } from '@/lib/locations';
import { MobileTabBar } from '@/components/MobileTabBar';

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ location: slug }));
}

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  if (!loc) return {};
  return {
    title: `${loc.displayName} — India's Premier Water Park`,
    description: `${loc.displayName} — 14 signature rides, 3 pools. Book tickets from ${loc.pricing.currency}${loc.pricing.from}.`,
    openGraph: {
      title: `${loc.displayName} — Make a splash this summer`,
      description: loc.hero.subtitle,
      siteName: 'Aqua Imagicaa',
      type: 'website',
    },
  };
}

export default function LocationLayout({ children, params }) {
  if (!getLocation(params.location)) notFound();
  return (
    <>
      {children}
      <MobileTabBar locationSlug={params.location} />
    </>
  );
}
