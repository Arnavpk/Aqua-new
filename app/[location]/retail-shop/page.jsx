import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractHelpStrip } from '@/lib/extractors/ticketExtractor';
import { extractRetailProducts } from '@/lib/extractors/aboutExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { RETAIL_PRODUCTS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { getNavItems } from '@/lib/strapi/getNav';
import Image from 'next/image';


export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Retail Shop — ${loc?.displayName}`,
    description: `Swimwear, accessories, souvenirs at ${loc?.displayName}.`,
  };
}

export default async function RetailShopPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const retailPage = await getPage(location.slug, 'pages', 'retail-shop');
  const pageHero = extractPageHero(retailPage);
  const helpStrip = extractHelpStrip(retailPage);
  const retailData = extractRetailProducts(retailPage);
  const navItems = await getNavItems(location.slug);

  const products = retailData?.products || RETAIL_PRODUCTS;
  const costume = retailData?.costume;

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <PageHero
        eyebrow={pageHero?.eyebrow || "Inside the park"}
        title={pageHero?.heading ? (
          <>
            {pageHero.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <em>{pageHero.heading.split(" ").slice(-1)}</em>
          </>
        ) : (
          <>Retail <em>shop.</em></>
        )}
        subtitle={pageHero?.subtitle || "Our on-site retail shop has everything you need."}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'About', href: `${base}/about` },
          { label: 'Retail Shop' },
        ]}
        primaryCta={pageHero?.primaryCta || { label: 'Book tickets →', href: `${base}/tickets` }}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />

      {/* Quick info */}
      {helpStrip && (
        <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
          <div className="container-x">
            <Reveal className="grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
              {helpStrip.items.map((info) => (
                <div key={info.title} className="help-card-sm">
                  <div className="help-icon">{info.icon}</div>
                  <h4 className="text-base font-semibold mb-1.5">{info.title}</h4>
                  <p className="text-[13px] text-ink-2 leading-relaxed m-0">{info.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Products */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-3 block">{retailData?.eyebrow || "Available at the shop"}</span>
              <h2 className="h1">
                {retailData?.heading ? (
                  <>
                    {retailData.heading.split(" ").slice(0, -1).join(" ")}{" "}
                    <em>{retailData.heading.split(" ").slice(-1)}</em>
                  </>
                ) : (
                  <>What we <em>sell.</em></>
                )}
              </h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {products.map((p) => (
              <div key={p.name} className="product-card">
                <div className="product-media relative overflow-hidden">
                  {p.image ? (
                    <Image height={200} width={400} className="absolute inset-0 h-full w-full object-cover" src={p.image} alt={p.name} />
                  ) : (
                    <div className="absolute inset-0" style={{ background: p.gradient || 'linear-gradient(135deg, #00A5C8, #5FDDEA)' }} />
                  )}
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

      {/* Costume rental */}
      <section className="section-shell section-tight">
        <div className="container-x">
          <Reveal>
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">{costume?.eyebrow || "Don't have swimwear?"}</span>
                <h2 className="h2 text-white">{costume?.heading || "Costume rental is free!"}</h2>
                {(costume?.description || "Swimwear rental is available free of charge until 31st March 2026. Only a refundable ₹100 deposit is required.") && (
                  <p className="text-white/85 mt-3 max-w-[400px]">{costume?.description || "Swimwear rental is available free of charge until 31st March 2026. Only a refundable ₹100 deposit is required."}</p>
                )}
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={costume?.ctaUrl || `${base}/tickets`} className="btn btn-primary">{costume?.ctaLabel || "Book tickets →"}</Link>
                <Link href={`${base}/about/dos-donts`} className="btn btn-glass">What to wear →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
    </>
  );
}