import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { PageHero } from '@/components/PageHero';
import { TermsContent } from '@/components/TermsContent';
import { extractPageHero, extractTermsContent } from '@/lib/extractors/ticketExtractor';
import { getLocation } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { getPage } from '@/lib/strapi/getPage';
import React from 'react'

const GuestServices = async ({ params }) => {
    const location = getLocation(params.location);
    const base = `/${location.slug}`;
    const strapiLocations = await getAllStrapiLocations();
    const navItems = await getNavItems(location.slug);

    const page = await getPage(location.slug, 'pages', 'guest-services');
    const pageHero = extractPageHero(page);
    const body = extractTermsContent(page);
    return (
        <>
            <PageHero
                eyebrow={pageHero?.eyebrow || "Legal"}
                title={pageHero?.heading || "Guest Services"}
                subtitle={pageHero?.subtitle || "Everything you need to know for a safe, fun, and hassle-free day at Aqua Imagicaa."}
                breadcrumbs={[
                    { label: 'Home', href: base },
                    { label: 'Guest Services' },
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

export default GuestServices;