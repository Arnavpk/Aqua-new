import { getLocation } from '@/lib/locations';
import { getAllStrapiRides } from '@/lib/strapi/getRides';
import { extractRideSections, extractFeaturedSpotlight, extractRideCategories } from '@/lib/extractors/rideExtractor';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { RidesHero } from '@/components/rides/RidesHero';
import { CategoryNav } from '@/components/rides/CategoryNav';
import { FeaturedRideSpotlight } from '@/components/rides/FeaturedRideSpotlight';
import { RideSection } from '@/components/rides/RideSection';
import { PlanSafety } from '@/components/rides/PlanSafety';
import { RIDE_SECTIONS, RIDE_CATEGORIES, FEATURED_RIDE } from '@/lib/data/rides';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Rides & Attractions — ${loc?.displayName}`,
    description: `Explore signature rides, pools and live events at ${loc?.displayName}.`,
  };
}

export default async function RidesPage({ params }) {
  const location = getLocation(params.location);
  const strapiRides = await getAllStrapiRides(location.slug);

  const sections = extractRideSections(strapiRides) || RIDE_SECTIONS;
  const featured = extractFeaturedSpotlight(strapiRides) || FEATURED_RIDE;
  const categories = extractRideCategories(strapiRides) || RIDE_CATEGORIES;

  return (
    <>
      <Navbar location={location} />
      <RidesHero locationSlug={location.slug} />
      <CategoryNav categories={categories} />
      <FeaturedRideSpotlight locationSlug={location.slug} ride={featured} />
      <main>
        {sections.map((section) => (
          <RideSection key={section.key} section={section} locationSlug={location.slug} />
        ))}
        <PlanSafety locationSlug={location.slug} />
      </main>
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}