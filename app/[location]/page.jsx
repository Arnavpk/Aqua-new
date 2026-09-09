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
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { extractAboutStory } from '@/lib/extractors/aboutExtractor';
import Image from 'next/image';


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
  const navItems = await getNavItems(location.slug);
  const story = homePage ? extractAboutStory(homePage) : null;


  const strapiLocations = await getAllStrapiLocations();

  // console.log("STRAPI BADGE:", hotOffers.offers.map((offer) => offer.badge));

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <Hero location={{ ...location, hero: hero || location.hero }} />
      <main>
        {location.slug == "ahmedabad" && (<FeaturedRides locationSlug={location.slug} data={featuredRides} />)}

        {/* About Story */}
        {story && (
          <section className="section-shell">
            <div className="container-x">
              <div className="grid grid-cols-2 gap-12 items-center max-[1024px]:grid-cols-1">
                <div>
                  {story.eyebrow && <span className="eyebrow mb-3 block">{story.eyebrow}</span>}
                  <h2 className="h2 mb-4">{story.heading}</h2>
                  {(story.paragraphs || []).map((p, i) => (
                    <p key={i} className="text-[15px] text-ink-2 leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
                <div className="rounded-rx overflow-hidden aspect-[4/3] relative">
                  {story.image ? (
                    <Image height={200} width={400} className="absolute inset-0 h-full w-full object-cover" src={story.image} alt={story.heading} />
                  ) : (
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #22C4DE, #5FDDEA)' }} />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <HotOffers locationSlug={location.slug} data={hotOffers} />
        <EventsSplit data={eventsSplit} />
        {/* <PlanVisit locationSlug={location.slug} data={planVisit} /> */}
        {/* <ParkMap data={parkMap} /> */}
        <Gallery locationSlug={location.slug} data={gallery} />
        <Testimonials data={testimonials} />
        <SafetyBand data={safetyBand} />
        <FAQ data={faq} />
        <CtaBanner locationSlug={location.slug} data={ctaBanner} />
      </main>
      <Footer location={location} navItems={navItems} />
      <MobBook location={location} />
    </>
  );
}