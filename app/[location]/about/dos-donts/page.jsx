import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractDosDonts } from '@/lib/extractors/aboutExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { DOS, DONTS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `DO's & DON'Ts — ${loc?.displayName}`,
    description: `Park guidelines for ${loc?.displayName}.`,
  };
}

export default async function DosAndDontsPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const ddPage = await getPage(location.slug, 'pages', 'dos-donts');
  const pageHero = extractPageHero(ddPage);
  const ddData = extractDosDonts(ddPage);

  const dos = ddData?.dos || DOS;
  const donts = ddData?.donts || DONTS;

  return (
    <>
      <Navbar location={location} locations={strapiLocations} />
      <PageHero
        eyebrow={pageHero?.eyebrow || "Park guidelines"}
        title={pageHero?.heading || "DOs & DON'Ts."}
        subtitle={pageHero?.subtitle || "For everyone's safety and enjoyment, please follow these guidelines."}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'About', href: `${base}/about` },
          { label: "DO's & DON'Ts" },
        ]}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />

      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal>
            <div className="dd-grid">
              <div>
                <div className="dd-col-head"><span className="dd-icon">✅</span><h3>DO</h3></div>
                {dos.map((item) => (
                  <div key={item.title} className="dd-item dd-do">
                    <span className="dd-item-icon">{item.icon}</span>
                    <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                  </div>
                ))}
              </div>
              <div>
                <div className="dd-col-head"><span className="dd-icon">🚫</span><h3>DON&apos;T</h3></div>
                {donts.map((item) => (
                  <div key={item.title} className="dd-item dd-dont">
                    <span className="dd-item-icon">{item.icon}</span>
                    <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">{ddData?.ctaEyebrow || "Have questions?"}</span>
                <h2 className="h2 text-white">{ddData?.ctaHeading || "Visit our FAQ or contact us."}</h2>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={ddData?.ctaUrl || `${base}/about`} className="btn btn-primary">{ddData?.ctaLabel || "View FAQ →"}</Link>
                <a href="tel:02269660000" className="btn btn-glass">📞 Call us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
    </>
  );
}