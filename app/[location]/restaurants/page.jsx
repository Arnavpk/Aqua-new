import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { RESTAURANTS } from '@/lib/data/restaurants';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return { title: `Restaurants — ${loc?.displayName}`, description: `6 themed restaurants inside ${loc?.displayName}. Multi-cuisine dining from quick bites to unlimited buffet.` };
}

export default function RestaurantsPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow="Dining inside the park"
        title={<>Where to <em>eat.</em></>}
        subtitle="Six themed restaurants serving everything from masala chai to unlimited buffet — all inside the park, all delicious."
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Restaurants' }]}
        primaryCta={{ label: 'Book tickets →', href: `${base}/tickets` }}
        secondaryCta={{ label: 'See park map', href: `${base}#map` }}
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
            {RESTAURANTS.map((r) => (
              <article key={r.slug} className="rest-card">
                <div className="rest-media">
                  <div className="absolute inset-0" style={{ background: r.gradient }} />
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
                    <Link href={`${base}/restaurants/${r.slug}`} className="btn btn-outline btn-sm">View details →</Link>
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
