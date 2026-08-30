import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractTermsContent } from '@/lib/extractors/ticketExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { TermsContent } from '@/components/TermsContent';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Terms & Conditions — ${loc?.displayName || 'Aqua Imagicaa'}`,
    description: 'Terms and conditions for use of Aqua Imagicaa website and services.',
  };
}

export default async function TermsPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);
    
  const page = await getPage(location.slug, 'pages', 'terms-and-conditions');
  console.log("TERMS page:", page);
  const pageHero = extractPageHero(page);
  
  const body = extractTermsContent(page);
  
  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      <PageHero
        eyebrow={pageHero?.eyebrow || "Legal"}
        title={pageHero?.heading || "Terms & Conditions"}
        subtitle={pageHero?.subtitle || "Please read these terms carefully before using our website and services."}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'Terms & Conditions' },
        ]}
      />

      <main>
        <TermsContent body={body} />
      </main>

      <Footer location={location} navItems={navItems} />
      <MobBook location={location} />
    </>
  );
}