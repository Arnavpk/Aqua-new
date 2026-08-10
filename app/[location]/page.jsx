import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractHero } from '@/lib/extractors/homeExtractor';
import { extractFeaturedRides } from '@/lib/extractors/featuredRidesExtractor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedRides } from '@/components/FeaturedRides';
import { Categories } from '@/components/Categories';
import { HotOffers } from '@/components/HotOffers';
import { extractHotOffers } from '@/lib/extractors/hotOffersExtractor';
import { EventsSplit } from '@/components/EventsSplit';
import { extractEventsSplit } from '@/lib/extractors/eventsSplitExtractor';
import { PlanVisit } from '@/components/PlanVisit';
import { extractPlanVisit } from '@/lib/extractors/planVisitExtractor';
import { ParkMap } from '@/components/ParkMap';
import { extractParkMap } from '@/lib/extractors/parkMapExtractor';
import { Gallery } from '@/components/Gallery';
import { extractGallery } from '@/lib/extractors/galleryExtractor';
import { Testimonials } from '@/components/Testimonials';
import { extractTestimonials } from '@/lib/extractors/testimonialsExtractor';
import { SafetyBand } from '@/components/SafetyBand';
import { extractSafetyBand } from '@/lib/extractors/safetyBandExtractor';
import { FAQ } from '@/components/FAQ';
import { extractFaq } from '@/lib/extractors/faqExtractor';
import { CtaBanner } from '@/components/CtaBanner';
import { extractCtaBanner } from '@/lib/extractors/ctaBannerExtractor';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';

export default async function LocationHome({ params }) {
  const location = getLocation(params.location);
  const homePage = await getPage(location.slug, 'pages', 'home');
  const hero = homePage ? extractHero(homePage) : null;
  const featuredRides = homePage ? extractFeaturedRides(homePage) : null;
  const hotOffers = homePage ? extractHotOffers(homePage) : null;
  const eventsSplit = homePage ? extractEventsSplit(homePage) : null;
  const parkMap = homePage ? extractParkMap(homePage) : null;
  const planVisit = homePage ? extractPlanVisit(homePage) : null;
  const gallery = homePage ? extractGallery(homePage) : null;
  const testimonials = homePage ? extractTestimonials(homePage) : null;
  const safetyBand = homePage ? extractSafetyBand(homePage) : null;
  const faq = homePage ? extractFaq(homePage) : null;
  const ctaBanner = homePage ? extractCtaBanner(homePage) : null;




  return (
    <>
      <Navbar location={location} />
      <Hero location={{ ...location, hero: hero || location.hero }} />
      <main>
        <FeaturedRides locationSlug={location.slug} data={featuredRides} />
        {/* <Categories /> */}
        <HotOffers locationSlug={location.slug} data={hotOffers} />
        <EventsSplit data={eventsSplit} />
        <PlanVisit locationSlug={location.slug} data={planVisit} />
        <ParkMap data={parkMap} />
        <Gallery locationSlug={location.slug} data={gallery} />
        <Testimonials data={testimonials} />
        <SafetyBand data={safetyBand} />
        <FAQ data={faq} />
        <CtaBanner locationSlug={location.slug} data={ctaBanner} />
      </main>
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}