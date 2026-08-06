import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractHero } from '@/lib/extractors/homeExtractor';
import { extractFeaturedRides } from '@/lib/extractors/featuredRidesExtractor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedRides } from '@/components/FeaturedRides';
import { Categories } from '@/components/Categories';
import { HotOffers } from '@/components/HotOffers';
import { EventsSplit } from '@/components/EventsSplit';
import { PlanVisit } from '@/components/PlanVisit';
import { ParkMap } from '@/components/ParkMap';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { SafetyBand } from '@/components/SafetyBand';
import { FAQ } from '@/components/FAQ';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';

export default async function LocationHome({ params }) {
  const location = getLocation(params.location);
  const homePage = await getPage(location.slug, 'pages', 'home');
  const hero = homePage ? extractHero(homePage) : null;
  const featuredRides = homePage ? extractFeaturedRides(homePage) : null;

  return (
    <>
      <Navbar location={location} />
      <Hero location={{ ...location, hero: hero || location.hero }} />
      <main>
        <FeaturedRides locationSlug={location.slug} data={featuredRides} />
        <Categories />
        <HotOffers locationSlug={location.slug} />
        <EventsSplit />
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