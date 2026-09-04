import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { IMSContent } from '@/components/ims/IMSContent';
import { IMS_DATA } from '@/lib/data/ims';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Integrated Management System — ${loc?.displayName || 'Aqua Imagicaa'}`,
    description: 'ISO 9001, ISO 14001, ISO 45001 certified. Learn about Aqua Imagicaa\'s Integrated Management System for quality, environment, and safety.',
  };
}

export default async function IMSPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);

  const page = await getPage(location.slug, 'pages', 'ims');
  const pageHero = extractPageHero(page);

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      <PageHero
        eyebrow={pageHero?.eyebrow || "Quality & safety"}
        title={pageHero?.heading || "Integrated Management System"}
        subtitle={pageHero?.subtitle || "ISO 9001 · ISO 14001 · ISO 45001 — India's first BIS Esteemed License holder in the amusement industry."}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'IMS' },
        ]}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />

      <main>
        <IMSContent data={IMS_DATA} />
      </main>

      <Footer location={location} navItems={navItems} />
      <MobBook location={location} />
    </>
  );
}