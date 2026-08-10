import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { DOS, DONTS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `DO's & DON'Ts — ${loc?.displayName}`,
    description: `Park guidelines, safety rules and visitor instructions for ${loc?.displayName}.`,
  };
}

export default function DosAndDontsPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow="Park guidelines"
        title={<>DOs &amp; DON&apos;Ts.</>}
        subtitle="For everyone's safety and enjoyment, please follow these guidelines during your visit to Aqua Imagicaa."
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'About', href: `${base}/about` },
          { label: "DO's & DON'Ts" },
        ]}
      />

      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal>
            <div className="dd-grid">
              {/* DO column */}
              <div>
                <div className="dd-col-head">
                  <span className="dd-icon">✅</span>
                  <h3>DO</h3>
                </div>
                {DOS.map((item) => (
                  <div key={item.title} className="dd-item dd-do">
                    <span className="dd-item-icon">{item.icon}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DON'T column */}
              <div>
                <div className="dd-col-head">
                  <span className="dd-icon">🚫</span>
                  <h3>DON&apos;T</h3>
                </div>
                {DONTS.map((item) => (
                  <div key={item.title} className="dd-item dd-dont">
                    <span className="dd-item-icon">{item.icon}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Bottom CTA */}
          <Reveal className="mt-12">
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">Have questions?</span>
                <h2 className="h2 text-white">Visit our FAQ or contact us.</h2>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={`${base}/about`} className="btn btn-primary">View FAQ →</Link>
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