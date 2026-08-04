import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getRestaurantBySlug, RESTAURANTS } from '@/lib/data/restaurants';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  const r = getRestaurantBySlug(params.slug);
  return { title: `${r?.name || params.slug} — ${loc?.displayName}`, description: r?.desc || '' };
}

export default function RestaurantDetailPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const r = getRestaurantBySlug(params.slug) || RESTAURANTS[0];
  const related = RESTAURANTS.filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow={r.cuisine}
        title={r.name}
        subtitle={r.desc}
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Restaurants', href: `${base}/restaurants` }, { label: r.name }]}
      />

      <div className="container-x">
        <div className="detail-layout">
          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">About {r.name}</span>
                <h2>What&apos;s on the <em>menu.</em></h2>
                <p className="lead">{r.desc}</p>
                <p>Enjoy a wide selection of dishes prepared fresh daily by our in-house chefs. Whether you&apos;re looking for a quick snack between rides or a full sit-down meal with the family, {r.name} has you covered.</p>
                <div className="rest-tags mt-4">
                  {r.tags.map((t) => <span key={t} className="rest-tag">{t}</span>)}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="content-block">
                <span className="eyebrow mb-3 block">Dining info</span>
                <h2>Good to know.</h2>
                <ul className="list-none m-0 p-0">
                  {[`Timings: ${r.hours.replace('⏰ ', '')}`, 'Located inside the park — park ticket required', 'UPI, cards and cash accepted', 'Seating capacity varies — walk-in only'].map((item, i) => (
                    <li key={i} className="relative text-sm text-ink-2 py-2.5 pl-7 border-b border-line last:border-0">
                      <span className="absolute left-0 top-2.5 w-4 h-4 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="cta-block">
                <h3 className="text-[32px] font-extrabold tracking-tight leading-none mb-4 relative">Hungry already?</h3>
                <p className="relative text-white/90 mb-6 text-base">Book your park tickets and enjoy {r.name} along with all 14 rides.</p>
                <div className="relative flex gap-3 flex-wrap">
                  <Link href={`${base}/tickets`} className="btn btn-primary">Book tickets →</Link>
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
                  <div className="flex justify-between"><span>Timings</span><strong className="text-ink">{r.hours.replace('⏰ ', '')}</strong></div>
                  <div className="flex justify-between"><span>Type</span><strong className="text-ink">{r.badge}</strong></div>
                </div>
                <Link href={`${base}/tickets`} className="btn btn-primary w-full text-center">Book park tickets →</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* Related restaurants */}
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
                <div className="rest-media"><div className="absolute inset-0" style={{ background: x.gradient }} /><span className="rest-badge">{x.badge}</span></div>
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

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}
