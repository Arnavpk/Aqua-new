import { notFound } from 'next/navigation';
import { getLocation, getAllLocationSlugs } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { MobileTabBar } from '@/components/MobileTabBar';
import { LocationPicker } from '@/components/LocationPicker';

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

export default async function LocationLayout({ children, params }) {
  if (!getLocation(params.location)) notFound();

  const strapiLocations = await getAllStrapiLocations();

  return (
    <>
      <LocationPicker locations={strapiLocations} currentSlug={params.location} />
      {children}
      <MobileTabBar locationSlug={params.location} />
    </>
  );
}