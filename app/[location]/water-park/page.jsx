import { notFound } from 'next/navigation';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { extractWaterPark } from '@/lib/extractors/waterParkExtractor';
import { getWaterParkContent, activeExperiences } from '@/lib/data/waterPark';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { PageHero } from '@/components/PageHero';
import { ExperienceGrid } from '@/components/water-park/ExperienceGrid';
import { PriceCards } from '@/components/water-park/PriceCards';

// Re-render hourly so Strapi edits show up and dated cards drop off on time.
export const revalidate = 3600;

/**
 * Accepts any of: "tickets-and-offers", "/tickets-and-offers",
 * "/surat/tickets-and-offers", "#experiences", "https://…".
 */
function resolveHref(url, base) {
    if (!url) return `${base}/tickets-and-offers`;
    if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;
    if (url === base || url.startsWith(`${base}/`)) return url;
    return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`;
}

const withHref = (cta, base) => (cta ? { label: cta.label, href: resolveHref(cta.href, base) } : null);

export function generateMetadata({ params }) {
    const loc = getLocation(params.location);
    if (!loc) return {};
    const fallback = getWaterParkContent(params.location);
    return {
        title: fallback?.meta?.title || `Water Park — ${loc.displayName}`,
        description:
            fallback?.meta?.description ||
            `Slides, wave pool, rain dance and more at ${loc.displayName}.`,
    };
}

export default async function WaterParkPage({ params }) {
    const location = getLocation(params.location);
    if (!location) notFound();

    const [page, strapiLocations, navItems] = await Promise.all([
        getPage(location.slug, 'pages', 'water-park').catch(() => null),
        getAllStrapiLocations(),
        getNavItems(location.slug),
    ]);

    // Strapi first, section by section; static content only fills the gaps.
    const fromStrapi = extractWaterPark(page);
    const fallback = getWaterParkContent(location.slug) || {};
    const hero = fromStrapi.hero || fallback.hero;
    const experiences = fromStrapi.experiences || fallback.experiences;
    const pricing = fromStrapi.pricing || fallback.pricing;

    if (!hero && !experiences && !pricing) notFound();

    const base = `/${location.slug}`;

    return (
        <>
            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            <PageHero
                eyebrow={hero?.eyebrow}
                title={hero?.title || 'Water Park'}
                subtitle={hero?.subtitle}
                breadcrumbs={[{ label: 'Home', href: base }, { label: 'Water Park' }]}
                primaryCta={withHref(hero?.primaryCta, base)}
                secondaryCta={withHref(hero?.secondaryCta, base)}
                bgVideo={hero?.video}
                mobileVideo={hero?.mobileVideo}
                videoPoster={hero?.poster}
            />

            {experiences && (
                <ExperienceGrid
                    eyebrow={experiences.eyebrow}
                    heading={experiences.heading}
                    items={activeExperiences(experiences.items)}
                />
            )}

            {pricing && (
                <PriceCards
                    eyebrow={pricing.eyebrow}
                    heading={pricing.heading}
                    prices={pricing.prices}
                    ctaLabel={pricing.cta?.label || 'Book Now'}
                    ctaHref={resolveHref(pricing.cta?.href, base)}
                    note={pricing.note}
                />
            )}

            <Footer location={location} navItems={navItems} locations={strapiLocations} />
            <MobBook location={location} />
        </>
    );
}