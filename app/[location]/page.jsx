import { getLocation } from '@/lib/locations';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HotOffers } from '@/components/HotOffers';
import { FeaturedRides } from '@/components/FeaturedRides';
import { Categories } from '@/components/Categories';
import { EventsSplit } from '@/components/EventsSplit';
import { ParkMap } from '@/components/ParkMap';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { SafetyBand } from '@/components/SafetyBand';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { PlanVisit } from '@/components/PlanVisit';

export default function LocationHome({ params }) {
  const location = getLocation(params.location);

  return (
    <>
      <Navbar location={location} />
      <Hero location={location} />
      <main>
        <FeaturedRides locationSlug={location.slug} />
        {/* <Categories /> */}
        <EventsSplit />
        <HotOffers locationSlug={location.slug} />
        <PlanVisit locationSlug={location.slug} />
        <ParkMap />
        <Gallery locationSlug={location.slug} />
        <Testimonials />
        <SafetyBand />
        <FAQ />
        <CtaBanner locationSlug={location.slug} />
      </main>
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}
