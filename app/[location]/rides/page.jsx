import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllStrapiRides, getRideCategories } from '@/lib/strapi/getRides';
import { extractRideSections, extractFeaturedSpotlight, extractRideCategories, extractMosaicTiles, extractRidesHero, extractPlanSafety, extractFeaturedSpotlightSection } from '@/lib/extractors/rideExtractor';


import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { RidesHero } from '@/components/rides/RidesHero';
import { RidesContent } from '@/components/rides/RidesContent';
import { RIDE_SECTIONS, RIDE_CATEGORIES, FEATURED_RIDE } from '@/lib/data/rides';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Rides & Attractions — ${loc?.displayName}`,
    description: `Explore signature rides, pools and live events at ${loc?.displayName}.`,
  };
}

export default async function RidesPage({ params }) {

  const strapiCategories = await getRideCategories();
  const location = getLocation(params.location);

  const ridesPage = await getPage(location.slug, 'pages', 'rides');
  const strapiRides = await getAllStrapiRides(location.slug);

  const sections = extractRideSections(strapiRides, strapiCategories) || RIDE_SECTIONS;
  const categories = extractRideCategories(strapiRides, strapiCategories) || RIDE_CATEGORIES;
  // const featured = extractFeaturedSpotlight(strapiRides) || FEATURED_RIDE;
  const featuredSection = extractFeaturedSpotlightSection(ridesPage);


  const ridesHero = extractRidesHero(ridesPage);
  const planSafety = extractPlanSafety(ridesPage);
  const mosaicTiles = extractMosaicTiles(strapiRides);





  return (
    <>
      <Navbar location={location} />
      <RidesHero locationSlug={location.slug} data={ridesHero} mosaic={mosaicTiles} />
      <RidesContent
        locationSlug={location.slug}
        sections={sections}

        categories={categories}
        planSafety={planSafety}
        featuredSection={featuredSection}
      />
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}