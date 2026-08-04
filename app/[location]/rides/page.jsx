import { getLocation } from '@/lib/locations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { RidesHero } from '@/components/rides/RidesHero';
import { CategoryNav } from '@/components/rides/CategoryNav';
import { FilterBar } from '@/components/rides/FilterBar';
import { FeaturedRideSpotlight } from '@/components/rides/FeaturedRideSpotlight';
import { RideSection } from '@/components/rides/RideSection';
import { PlanSafety } from '@/components/rides/PlanSafety';
import { RIDE_SECTIONS } from '@/lib/data/rides';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Rides & Attractions — ${loc?.displayName}`,
    description: `Explore 14 signature rides, 3 pools and live events at ${loc?.displayName}.`,
  };
}

export default function RidesPage({ params }) {
  const location = getLocation(params.location);

  return (
    <>
      <Navbar location={location} />
      <RidesHero locationSlug={location.slug} />
      <CategoryNav />
      <FilterBar />
      <FeaturedRideSpotlight locationSlug={location.slug} />
      <main>
        {RIDE_SECTIONS.map((section) => (
          <RideSection key={section.key} section={section} locationSlug={location.slug} />
        ))}
        <PlanSafety locationSlug={location.slug} />
      </main>
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}
