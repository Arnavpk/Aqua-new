import { notFound } from 'next/navigation';
import { getLocation, getAllLocationSlugs } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { MobileTabBar } from '@/components/MobileTabBar';
import { LocationPicker } from '@/components/LocationPicker';
import { Navbar } from '@/components/Navbar';
import { GTMHead, GTMNoScript, MetaPixelHead, MetaPixelNoScript } from '@/components/GTM';

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ location: slug }));
}

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  if (!loc) return {};
  return {
    title: `${loc.displayName} — India's Premier Water Park`,
    description: `${loc.displayName} — 14 signature rides, 3 pools. Book tickets from ${loc.pricing.currency}${loc.pricing.from}.`,
  };
}

export default async function LocationLayout({ children, params }) {
  if (!getLocation(params.location)) notFound();
  const location = getLocation(params.location);

  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(params.location);

  return (
    <>
      <LocationPicker locations={strapiLocations} currentSlug={params.location} />
      <GTMHead gtmId={location?.gtmId} />
      <GTMNoScript gtmId={location?.gtmId} />
      <MetaPixelHead pixelId={location.metaPixelId} />
      <MetaPixelNoScript pixelId={location.metaPixelId} />

      <Navbar
        location={location}
        locations={strapiLocations}
        navItems={navItems}
      />

      {children}
      <MobileTabBar locationSlug={params.location} />
    </>
  );
}