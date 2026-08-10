import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { RETAIL_PRODUCTS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Retail Shop — ${loc?.displayName}`,
    description: `Swimwear, accessories, souvenirs and essentials at the ${loc?.displayName} retail shop.`,
  };
}

export default function RetailShopPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow="Inside the park"
        title={<>Retail <em>shop.</em></>}
        subtitle="Forgot your swimwear? Need sunscreen? Our on-site retail shop has everything you need for a perfect day — right at the park entrance."
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'About', href: `${base}/about` },
          { label: 'Retail Shop' },
        ]}
        primaryCta={{ label: 'Book tickets →', href: `${base}/tickets` }}
      />

      {/* Quick info strip */}
      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
            {[
              { icon: '📍', title: 'Location', desc: 'Near the main entrance gate — before and after the park.' },
              { icon: '⏰', title: 'Timings', desc: '10:00 AM – 6:30 PM daily. Opens 30 minutes before park.' },
              { icon: '💳', title: 'Payment', desc: 'Cash, UPI, and all major cards accepted.' },
            ].map((info) => (
              <div key={info.title} className="help-card-sm">
                <div className="help-icon">{info.icon}</div>
                <h4 className="text-base font-semibold mb-1.5">{info.title}</h4>
                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{info.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-3 block">Available at the shop</span>
              <h2 className="h1">What we <em>sell.</em></h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {RETAIL_PRODUCTS.map((p) => (
              <div key={p.name} className="product-card">
                <div className="product-media" style={{ background: p.gradient }}>
                  <span className="product-emoji">{p.icon}</span>
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <span className="product-price">{p.price}</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Costume rental highlight */}
      <section className="section-shell section-tight">
        <div className="container-x">
          <Reveal>
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">Don&apos;t have swimwear?</span>
                <h2 className="h2 text-white">Costume rental is free!</h2>
                <p className="text-white/85 mt-3 max-w-[400px]">
                  Swimwear rental is available free of charge until 31st March 2026. Only a refundable ₹100 deposit is required.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={`${base}/tickets`} className="btn btn-primary">Book tickets →</Link>
                <Link href={`${base}/dos-donts`} className="btn btn-glass">What to wear →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
    </>
  );
}