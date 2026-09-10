import React from 'react'
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractTermsContent } from '@/lib/extractors/ticketExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { PageHero } from '@/components/PageHero';
import { TermsContent } from '@/components/TermsContent';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Rules & Regulations — ${loc?.displayName || 'Aqua Imagicaa'}`,
    description: 'Learn about Aqua Imagicaa\'s rules and regulations for a safe and enjoyable experience.',
  };
}

export default async function PrivacyPolicy({params}) {
    const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);
    
  const page = await getPage(location.slug, 'pages', 'privacy-policy');
  
  const pageHero = extractPageHero(page);
  
  const body = extractTermsContent(page);

  return (
    <>    

      <PageHero
        eyebrow={pageHero?.eyebrow || "Legal"}
        title={pageHero?.heading || "Privacy Policy"}
        subtitle={pageHero?.subtitle || "Please read our privacy policy carefully before using our website and services."}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'Privacy Policy' },
        ]}
      />

      <main>
        <TermsContent body={body} />
      </main>

      <Footer location={location} navItems={navItems} />
      <MobBook location={location} />
    </>
  )
}