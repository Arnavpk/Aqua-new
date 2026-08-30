import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { getAllTickets, getAllOffers } from '@/lib/strapi/getTickets';
import { extractTickets, extractOffers, extractPageHero, extractHelpStrip } from '@/lib/extractors/ticketExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { TicketsGrid } from '@/components/tickets/TicketsGrid';
import { OffersGrid } from '@/components/tickets/OffersGrid';
import { HelpStrip } from '@/components/tickets/HelpStrip';
import { getNavItems } from '@/lib/strapi/getNav';


export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Tickets & Offers — ${loc?.displayName}`,
    description: `Book tickets and save at ${loc?.displayName}.`,
  };
}

export default async function TicketsPage({ params }) {
  const location = getLocation(params.location);
  const strapiLocations = await getAllStrapiLocations();

  const ticketsPage = await getPage(location.slug, 'pages', 'tickets');
  const strapiTickets = await getAllTickets(location.slug);
  const strapiOffers = await getAllOffers(location.slug);

  const pageHero = extractPageHero(ticketsPage);
  const helpStrip = extractHelpStrip(ticketsPage);
  const tickets = extractTickets(strapiTickets);
  const offers = extractOffers(strapiOffers);
  const navItems = await getNavItems(location.slug);


  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <PageHero
        eyebrow={pageHero?.eyebrow || "Save more · splash more"}
        title={pageHero?.heading ? (
          <>
            {pageHero.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <em>{pageHero.heading.split(" ").slice(-1)}</em>
          </>
        ) : (
          <>Tickets &amp; <em>offers.</em></>
        )}
        subtitle={pageHero?.subtitle || "Enjoy the best deals at Aqua Imagicaa."}
        breadcrumbs={[
          { label: 'Home', href: `/${location.slug}` },
          { label: 'Tickets & Offers' },
        ]}
        stats={pageHero?.stats || [
          { n: '6', l: 'Live offers' },
          { n: '70%', l: 'Max savings' },
          { n: '4', l: 'Ticket types' },
          { n: 'All-day', l: 'Unlimited fun' },
        ]}
        primaryCta={pageHero?.primaryCta || { label: 'Book tickets from ₹599 →', href: `/${location.slug}/tickets` }}
        secondaryCta={pageHero?.secondaryCta || { label: 'Browse offers', href: '#offers' }}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />
      <TicketsGrid locationSlug={location.slug} data={tickets} />
      <OffersGrid locationSlug={location.slug} data={offers} />
      <HelpStrip locationSlug={location.slug} data={helpStrip} />
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}