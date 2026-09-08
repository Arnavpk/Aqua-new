import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getNavItems } from '@/lib/strapi/getNav';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractFaqGroups, groupFaqs } from '@/lib/extractors/faqExtractor';
import { FAQ_ITEMS, FAQ_PAGE_FALLBACK } from '@/lib/data/faq';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export async function generateMetadata({ params }) {
    const location = getLocation(params.location);
    return {
        title: `Aqua Imagicaa Water Park ${location.name} — FAQ & Help`,
        description: `Answers to common questions about tickets, timings, rides, safety and facilities at Aqua Imagicaa ${location.name}.`,
        alternates: { canonical: `/${location.slug}/faq-help` },
    };
}

export default async function FaqHelpPage({ params }) {
    const location = getLocation(params.location);
    const base = `/${location.slug}`;

    const [strapiLocations, navItems, faqPage] = await Promise.all([
        getAllStrapiLocations(),
        getNavItems(location.slug),
        getPage(location.slug, 'pages', 'faq-help'),
    ]);

    const pageHero = extractPageHero(faqPage);
    const faqData = extractFaqGroups(faqPage) || {
        ...FAQ_PAGE_FALLBACK,
        groups: groupFaqs(FAQ_ITEMS),
    };

    // FAQPage structured data — worth having on this page specifically.
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.groups.flatMap((g) =>
            g.items.map((i) => ({
                '@type': 'Question',
                name: i.q,
                acceptedAnswer: { '@type': 'Answer', text: i.a },
            }))
        ),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            <PageHero
                eyebrow={pageHero?.eyebrow || 'Help centre'}
                title={pageHero?.heading || `Aqua Imagicaa ${location.name} — FAQ`}
                subtitle={
                    pageHero?.subtitle ||
                    'Timings, tickets, ride restrictions and everything else guests ask us before they visit.'
                }
                breadcrumbs={[
                    { label: 'Home', href: base },
                    { label: 'Water Park', href: `${base}/water-park/rides-and-attractions` },
                    { label: 'FAQ & Help' },
                ]}
                primaryCta={
                    pageHero?.primaryCta || {
                        label: 'Book tickets',
                        href: `${base}/tickets-and-offers`,
                    }
                }
                secondaryCta={
                    pageHero?.secondaryCta || {
                        label: 'Contact us',
                        href: `${base}/contact-us`,
                    }
                }
                bgImage={pageHero?.bgImage}
                mobileImage={pageHero?.mobileImage}
            />

            <section className="section-shell">
                <div className="container-x">
                    <Reveal>
                        <FaqAccordion groups={faqData.groups} />
                    </Reveal>
                </div>
            </section>

            {/* Still stuck */}
            <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
                <div className="container-x">
                    <Reveal className="contact-card">
                        <h2 className="h3 mb-2">Didn&apos;t find your answer?</h2>
                        <p className="mb-4 max-w-[60ch] text-sm text-ink-2">
                            Our guest helpline is open {location.contact.phoneHours} daily.
                        </p>
                        <div className="c-row">
                            <span className="icon">📞</span>
                            <div>
                                <a href={location.contact.phoneHref}>{location.contact.phone}</a>
                            </div>
                        </div>
                        <div className="c-row">
                            <span className="icon">✉️</span>
                            <div>
                                <a href={`mailto:${location.contact.email}`}>
                                    {location.contact.email}
                                </a>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2.5">
                            <Link href={`${base}/contact-us`} className="btn btn-primary btn-sm">
                                Contact us
                            </Link>
                            <Link
                                href={`${base}/water-park/ride-restrictions`}
                                className="btn btn-outline btn-sm"
                            >
                                Ride restrictions
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer location={location} />
            <MobBook location={location} />
        </>
    );
}