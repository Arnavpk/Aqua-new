import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllStrapiRides } from '@/lib/strapi/getRides';
import { extractRideSections, extractFeaturedSpotlight, extractRideCategories, extractMosaicTiles, extractRidesHero, extractPlanSafety } from '@/lib/extractors/rideExtractor';

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

  // Fetch page content (hero, plan-safety) from Page collection
  // Inside RidesPage, after ridesPage fetch:
  const ridesPage = await getPage(location.slug, 'pages', 'rides');
  // console.log("RIDES PAGE:", JSON.stringify(ridesPage, null, 2));
  // console.log("RIDES HERO:", extractRidesHero(ridesPage));

  // Fetch ride entries from Ride collection
  const strapiRides = await getAllStrapiRides(location.slug);

  const sections = extractRideSections(strapiRides) || RIDE_SECTIONS;
  const featured = extractFeaturedSpotlight(strapiRides) || FEATURED_RIDE;
  const categories = extractRideCategories(strapiRides) || RIDE_CATEGORIES;

  // Extract hero and plan-safety from the Page entry
  const ridesHero = extractRidesHero(ridesPage);
  const planSafety = extractPlanSafety(ridesPage);
  const mosaicTiles = extractMosaicTiles(strapiRides);


  return (
    <>
      <Navbar location={location} />
      <RidesHero locationSlug={location.slug} data={ridesHero} mosaic={mosaicTiles} />
      <CategoryNav categories={categories} />
      <FeaturedRideSpotlight locationSlug={location.slug} ride={featured} />
      <main>
        {sections.map((section) => (
          <RideSection key={section.key} section={section} locationSlug={location.slug} />
        ))}
        <PlanSafety locationSlug={location.slug} data={planSafety} />
      </main>
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}