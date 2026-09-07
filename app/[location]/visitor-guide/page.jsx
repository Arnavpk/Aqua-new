import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero, extractTermsContent } from '@/lib/extractors/ticketExtractor';
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
    title: `Visitor Guide — ${loc?.displayName || 'Aqua Imagicaa'}`,
    description: 'Plan your perfect visit with Aqua Imagicaa\'s Visitor Guide. Park facilities, safety info, food options, and more.',
  };
}

export default async function VisitorGuidePage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);

  const page = await getPage(location.slug, 'pages', 'visitor-guide');
  const pageHero = extractPageHero(page);
  const body = extractTermsContent(page);

  return (
    <>
      {/* <Navbar location={location} locations={strapiLocations} navItems={navItems} /> */}

       <PageHero
              eyebrow={pageHero?.eyebrow || "Legal"}
              title={pageHero?.heading || "Visitor Guide"}
              subtitle={pageHero?.subtitle || "Everything you need to know for a safe, fun, and hassle-free day at Aqua Imagicaa."}
              breadcrumbs={[
                { label: 'Home', href: base },
                { label: 'Visitor Guide' },
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