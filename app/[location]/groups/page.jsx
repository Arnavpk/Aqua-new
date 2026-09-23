import { getLocation } from '@/lib/locations';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { GroupEnquiryForm } from '@/components/GroupEnquiryForm';

export function generateMetadata({ params }) {
    const loc = getLocation(params.location);
    return {
        title: `Group Enquiry — Aqua Imagicaa ${loc.name}`,
        description: `Plan a group visit to Aqua Imagicaa ${loc.name}. Get a custom quotation for corporate outings, student trips and large groups.`,
    };
}

export default async function GroupEnquiryPage({ params }) {
    const location = getLocation(params.location);
    const base = `/${location.slug}`;

    const [strapiLocations, navItems] = await Promise.all([
        getAllStrapiLocations(),
        getNavItems(location.slug),
    ]);

    return (
        <>
            <Navbar location={location} locations={strapiLocations} navItems={navItems} />

            <PageHero
                eyebrow="Groups & events"
                title="Plan a group visit."
                subtitle="Corporate outings, student trips, family reunions — get a custom quotation for your group."
                breadcrumbs={[
                    { label: 'Home', href: base },
                    { label: 'Group Enquiry' },
                ]}
                primaryCta={{ label: 'Book tickets', href: `${base}/tickets-and-offers` }}
                secondaryCta={{ label: 'Contact us', href: `${base}/contact-us` }}
            />

            <section className="section-shell">
                <div className="container-x">
                    <Reveal>
                        <GroupEnquiryForm
                            locationSlug={location.slug}
                            locationName={location.name}
                        />
                    </Reveal>
                </div>
            </section>

            <Footer location={location} navItems={navItems} locations={strapiLocations} />
            <MobBook location={location} />
        </>
    );
}