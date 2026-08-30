import { getLocation } from '@/lib/locations';
import { getContactLocations } from '@/lib/strapi/getContact';
import { extractContactPage } from '@/lib/extractors/contactExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { CONTACT_DATA } from '@/lib/data/contact';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { ContactBody } from '@/components/contact/ContactBody';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Contact Us — ${loc?.displayName || 'Aqua Imagicaa'}`,
    description: 'Connect with Aqua Imagicaa for tickets, bookings, complaints, sales, and press queries.',
  };
}

export default async function ContactUsPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);

  const strapiContact = await getContactLocations();
  const data = extractContactPage(strapiContact) || CONTACT_DATA;

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'Contact Us' },
        ]}
      />

      <main>
        <ContactBody data={data} base={base} />
      </main>

      <Footer location={location} navItems={navItems} />
      <MobBook location={location} />
    </>
  );
}