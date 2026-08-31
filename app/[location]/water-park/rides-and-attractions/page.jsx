import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllStrapiRides, getRideCategories } from '@/lib/strapi/getRides';
import { extractRideSections, extractFeaturedSpotlight, extractRideCategories, extractMosaicTiles, extractRidesHero, extractPlanSafety, extractFeaturedSpotlightSection } from '@/lib/extractors/rideExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { RidesHero } from '@/components/rides/RidesHero';
import { RidesContent } from '@/components/rides/RidesContent';
import { RIDE_SECTIONS, RIDE_CATEGORIES, FEATURED_RIDE } from '@/lib/data/rides';
import { RidesContent1 } from '@/components/rides/RidesContent1';

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
  // console.log("LOCATION:", location.slug, "RIDES COUNT:", strapiRides.length);
  const sections = extractRideSections(strapiRides, strapiCategories) || RIDE_SECTIONS;
  const categories = extractRideCategories(strapiRides, strapiCategories) || RIDE_CATEGORIES;
  const featured = extractFeaturedSpotlight(strapiRides) || FEATURED_RIDE;
  const featuredSection = extractFeaturedSpotlightSection(ridesPage);


  const ridesHero = extractRidesHero(ridesPage);
  const planSafety = extractPlanSafety(ridesPage);
  const mosaicTiles = extractMosaicTiles(strapiRides);
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);


  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <RidesHero locationSlug={location.slug} data={ridesHero} mosaic={mosaicTiles} />
     
      {location.slug == "ahmedabad" && (<RidesContent1 params={params} />)}
      <RidesContent
        locationSlug={location.slug}
        sections={sections}
        featured={featured}
        categories={categories}
        planSafety={planSafety}
        featuredSection={featuredSection}
      />
      
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}