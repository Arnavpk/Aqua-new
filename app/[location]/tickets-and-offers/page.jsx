import { notFound } from 'next/navigation';
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

// Helpers
const hasItems = (arr) => Array.isArray(arr) && arr.length > 0;
const hasContent = (obj) =>
  obj && typeof obj === 'object' && Object.values(obj).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined && v !== ''
  );
const safe = (promise, fallback = null) => promise.catch(() => fallback);

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Tickets & Offers — ${loc?.displayName}`,
    description: `Book tickets and save at ${loc?.displayName}.`,
  };
}

export default async function TicketsPage({ params }) {
  const location = getLocation(params.location);
  if (!location) notFound();

  // Fetch in parallel; a failed request is treated as "no data"
  const [strapiLocations, ticketsPage, strapiTickets, strapiOffers, navItems] = await Promise.all([
    safe(getAllStrapiLocations(), []),
    safe(getPage(location.slug, 'pages', 'tickets-and-offers')),
    safe(getAllTickets(location.slug), []),
    safe(getAllOffers(location.slug), []),
    safe(getNavItems(location.slug), []),
  ]);

  const pageHero = ticketsPage ? extractPageHero(ticketsPage) : null;
  const helpStrip = ticketsPage ? extractHelpStrip(ticketsPage) : null;
  const tickets = strapiTickets ? extractTickets(strapiTickets) : [];
  const offers = strapiOffers ? extractOffers(strapiOffers) : [];

  const showHero = Boolean(pageHero?.heading);
  const showTickets = hasItems(tickets);
  const showOffers = hasItems(offers);
  const showHelpStrip = hasContent(helpStrip);

  // Split heading so the last word is italicised
  const headingWords = pageHero?.heading?.trim().split(/\s+/) ?? [];
  const headingLead = headingWords.slice(0, -1).join(' ');
  const headingLast = headingWords.slice(-1)[0];

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      {showHero && (
        <PageHero
          eyebrow={pageHero.eyebrow}
          title={
            <>
              {headingLead && <>{headingLead}{' '}</>}
              <em>{headingLast}</em>
            </>
          }
          subtitle={pageHero.subtitle}
          breadcrumbs={[
            { label: 'Home', href: `/${location.slug}` },
            { label: 'Tickets & Offers' },
          ]}
          primaryCta={pageHero.primaryCta?.label ? pageHero.primaryCta : undefined}
          secondaryCta={
            pageHero.secondaryCta?.label
              ? pageHero.secondaryCta
              : undefined
          }
          bgImage={pageHero.bgImage}
          mobileImage={pageHero.mobileImage}
        />
      )}

      {showTickets && <TicketsGrid locationSlug={location.slug} data={tickets} />}
      {showOffers && <OffersGrid locationSlug={location.slug} data={offers} />}
      {showHelpStrip && <HelpStrip locationSlug={location.slug} data={helpStrip} />}

      <Footer location={location} navItems={navItems} locations={strapiLocations} />
      <MobBook location={location} />
    </>
  );
}