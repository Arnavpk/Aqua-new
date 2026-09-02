import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getRestaurantBySlug as getStrapiRestaurant, getAllRestaurants } from '@/lib/strapi/getRestaurants';
import { extractRestaurantDetail, extractRestaurants } from '@/lib/extractors/restaurantExtractor';
import { getRestaurantBySlug, RESTAURANTS } from '@/lib/data/restaurants';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { getNavItems } from '@/lib/strapi/getNav';
import Image from 'next/image';



export async function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  const strapiR = await getStrapiRestaurant(loc.slug, params.slug);
  const name = strapiR?.name || params.slug;
  return {
    title: `${name} — ${loc?.displayName}`,
    description: strapiR?.description || '',
  };
}

export default async function RestaurantDetailPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const strapiR = await getStrapiRestaurant(location.slug, params.slug);
  const r = extractRestaurantDetail(strapiR) || getRestaurantBySlug(params.slug) || RESTAURANTS[0];

  // Related restaurants
  const allStrapiRestaurants = await getAllRestaurants(location.slug);
  const allRestaurants = extractRestaurants(allStrapiRestaurants) || RESTAURANTS;
  const related = allRestaurants.filter((x) => x.slug !== r.slug).slice(0, 3);
  const navItems = await getNavItems(location.slug);

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <PageHero
        eyebrow={r.cuisine}
        title={r.name}
        subtitle={r.desc}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'Restaurants', href: `${base}/restaurants` },
          { label: r.name },
        ]}
        bgImage={r.image}
        mobileImage={r.mobileImage}
      />

      <div className="container-x">
        <div className="detail-layout">
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">About {r.name}</span>
                <h2>What&apos;s on the <em>menu.</em></h2>
                <p className="lead">{r.desc}</p>
                {r.aboutText && <p>{r.aboutText}</p>}
                {r.tags.length > 0 && (
                  <div className="rest-tags mt-4">
                    {r.tags.map((t) => <span key={t} className="rest-tag">{t}</span>)}
                  </div>
                )}
              </div>
            </Reveal>

            {r.diningInfo.length > 0 && (
              <Reveal>
                <div className="content-block">
                  <span className="eyebrow mb-3 block">Dining info</span>
                  <h2>Good to know.</h2>
                  <ul className="list-none m-0 p-0">
                    {r.diningInfo.map((item, i) => (
                      <li key={i} className="relative text-sm text-ink-2 py-2.5 pl-7 border-b border-line last:border-0">
                        <span className="absolute left-0 top-2.5 w-4 h-4 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal>
              <div className="cta-block">
                <h3 className="text-[32px] font-extrabold tracking-tight leading-none mb-4 relative">
                  {r.cta.heading}
                </h3>
                <p className="relative text-white/90 mb-6 text-base">
                  {r.cta.description || `Book your park tickets and enjoy ${r.name} along with all 14 rides.`}
                </p>
                <div className="relative flex gap-3 flex-wrap">
                  <Link href={r.cta.url || `${base}/tickets`} className="btn btn-primary">
                    {r.cta.label}
                  </Link>
                  <Link href={`${base}/restaurants`} className="btn btn-glass">← All restaurants</Link>
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="sticky top-[110px] self-start flex flex-col gap-5 max-[1024px]:static">
            <Reveal>
              <div className="book-card">
                <h3 className="text-xl font-bold tracking-tight mb-1">{r.name}</h3>
                <p className="text-[13px] text-ink-2 mb-5">{r.cuisine}</p>
                <div className="text-sm text-ink-2 leading-[1.9] pb-4 border-b border-dashed border-line mb-4">
                  <div className="flex justify-between">
                    <span>Timings</span>
                    <strong className="text-ink">{r.hours.replace('⏰ ', '')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Type</span>
                    <strong className="text-ink">{r.badge}</strong>
                  </div>
                </div>
                <Link href={r.cta.url || `${base}/tickets`} className="btn btn-primary w-full text-center">
                  {r.cta.label}
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ padding: '40px 0 20px' }}>
          <div className="container-x">
            <Reveal className="flex justify-between items-end mb-6 gap-4">
              <div>
                <span className="eyebrow mb-3 block">More dining</span>
                <h2 className="h1">Other <em>restaurants.</em></h2>
              </div>
              <Link href={`${base}/restaurants`} className="btn btn-outline max-[720px]:hidden">All restaurants →</Link>
            </Reveal>
            <Reveal className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
              {related.map((x) => (
                <Link key={x.slug} href={`${base}/restaurants/${x.slug}`} className="rest-card no-underline text-inherit hover:text-inherit">
                  <div className="rest-media relative overflow-hidden">
                    {x.image ? (
                      <Image height={200} width={400} className="absolute inset-0 h-full w-full object-cover" src={x.image} alt={x.name} />
                    ) : (
                      <div className="absolute inset-0" style={{ background: x.gradient || 'linear-gradient(135deg, #0A5566, #00A5C8)' }} />
                    )}
                    <span className="rest-badge">{x.badge}</span>
                  </div>
                  <div className="rest-body">
                    <div className="rest-cuisine">{x.cuisine}</div>
                    <h3 className="text-base font-bold tracking-tight mb-1.5">{x.name}</h3>
                    <p className="text-[12.5px] text-ink-2 leading-relaxed m-0">{x.desc}</p>
                  </div>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}