import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { TicketFilterBar } from '@/components/tickets/TicketFilterBar';
import { TicketsGrid } from '@/components/tickets/TicketsGrid';
import { OffersGrid } from '@/components/tickets/OffersGrid';
import { HelpStrip } from '@/components/tickets/HelpStrip';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Tickets & Offers — ${loc?.displayName}`,
    description: `Book tickets and save up to 70% at ${loc?.displayName}. 4 ticket types, 6 live offers.`,
  };
}

export default function TicketsPage({ params }) {
  const location = getLocation(params.location);

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow="Save more · splash more"
        title={<>Tickets &amp; <em>offers.</em></>}
        subtitle="Enjoy the best deals that give you the best value of unlimited fun, amazing experiences, and delightful memories at Aqua Imagicaa Surat."
        breadcrumbs={[
          { label: 'Home', href: `/${location.slug}` },
          { label: 'Tickets & Offers' },
        ]}
        stats={[
          { n: '6', l: 'Live offers' },
          { n: '70%', l: 'Max savings' },
          { n: '4', l: 'Ticket types' },
          { n: 'All-day', l: 'Unlimited fun' },
        ]}
        primaryCta={{ label: 'Book tickets from ₹599 →', href: `/${location.slug}/tickets` }}
        secondaryCta={{ label: 'Browse offers', href: '#offers' }}
      />
      {/* <TicketFilterBar /> */}
      {/* <TicketsGrid locationSlug={location.slug} /> */}
      <OffersGrid locationSlug={location.slug} />
      <HelpStrip locationSlug={location.slug} />
      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}
