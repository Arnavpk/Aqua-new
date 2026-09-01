import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllRestaurants } from '@/lib/strapi/getRestaurants';
import { extractRestaurants } from '@/lib/extractors/restaurantExtractor';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { RESTAURANTS } from '@/lib/data/restaurants';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { getNavItems } from '@/lib/strapi/getNav';


export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Restaurants — ${loc?.displayName}`,
    description: `Themed restaurants inside ${loc?.displayName}.`,
  };
}

export default async function RestaurantsPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const restaurantsPage = await getPage(location.slug, 'pages', 'restaurants');
  const strapiRestaurants = await getAllRestaurants(location.slug);

  const pageHero = extractPageHero(restaurantsPage);
  const restaurants = extractRestaurants(strapiRestaurants) || RESTAURANTS;
  const navItems = await getNavItems(location.slug);


  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <PageHero
        eyebrow={pageHero?.eyebrow || "Dining inside the park"}
        title={pageHero?.heading ? (
          <>
            {pageHero.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <em>{pageHero.heading.split(" ").slice(-1)}</em>
          </>
        ) : (
          <>Where to <em>eat.</em></>
        )}
        subtitle={pageHero?.subtitle || "Six themed restaurants serving everything from masala chai to unlimited buffet."}
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Restaurants' }]}
        primaryCta={pageHero?.primaryCta || { label: 'Book tickets →', href: `${base}/tickets` }}
        secondaryCta={pageHero?.secondaryCta || { label: 'See park map', href: `${base}#map` }}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
        stats={pageHero?.stats || []}
      />

      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-3 block">Our restaurants</span>
              <h2 className="h1">Where to <em>eat.</em></h2>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-[720px]:grid-cols-1">
            {restaurants.map((r) => (
              <article key={r.slug} className="rest-card">
                <div className="rest-media relative overflow-hidden">
                  {r.image ? (
                    <img className="absolute inset-0 h-full w-full object-cover" src={r.image} alt={r.name} />
                  ) : (
                    <div className="absolute inset-0" style={{ background: r.gradient || 'linear-gradient(135deg, #0A5566, #00A5C8)' }} />
                  )}
                  <span className="rest-badge">{r.badge}</span>
                </div>
                <div className="rest-body">
                  <div className="rest-cuisine">{r.cuisine}</div>
                  <h3 className="text-base font-bold tracking-tight mb-1.5">{r.name}</h3>
                  <p className="text-[12.5px] text-ink-2 leading-relaxed mb-3.5">{r.desc}</p>
                  <div className="rest-tags">
                    {r.tags.map((t) => <span key={t} className="rest-tag">{t}</span>)}
                  </div>
                  <div className="flex justify-between items-center text-[12px] text-ink-2">
                    <span>{r.hours}</span>
                    <Link href={`${base}/water-park/restaurant/${r.slug}`} className="btn btn-outline btn-sm">
                      {r.viewCtaLabel || "View details →"}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}