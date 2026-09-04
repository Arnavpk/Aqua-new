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

const FALLBACK_BODY = [
  'Aqua Imagicaa Water Park offers a range of nylon, lycra and polyester branded swimwear and costumes for purchase at the Park. For hygiene reasons swimwear is not available on rental. Only nylon, polyester and lycra-based swimwear is permitted on all slides and attractions.',
  '',
  '## Swimsuit Dress Code Policy',
  '',
  '- When visiting the park\'s attractions, suitable swimwear of nylon, lycra or polyester must be worn at all times. If you arrive at the park wearing inappropriate clothing, you may be requested to change or to leave.',
  '- Clothes cannot be transparent, indecently expose body parts, or feature offensive or obscene images or statements.',
  '- Our retail stores offer a variety of swimwear and everyday clothing if you want to purchase bathing suits. Rental swimwear is available at the park for guests who need appropriate attire for the water rides.',
  '- Any pool or attraction prohibits the use of regular diapers. At our retail locations, swim diapers are available for purchase.',
  '- Management reserves the final decision on which clothing/swimwear is suitable and acceptable for park entry or use on slides and attractions.',
  '',
  '## Inappropriate Swimwear Includes & Is Not Limited To',
  '',
  '- Transparent swimwear or bathing suit',
  '- Street attire, long flowing garments, sarees, and undergarments are not allowed',
  '- Shorts with projecting designs or accessories on backside e.g. wetsuits or rivets',
  '- Chains, jewellery, and long necklaces of any kind are not permissible',
  '- Swimwear with metal snaps, buckles, or buttons that is coarse/abrasive and could possibly damage slides and hurt other swimmers',
  '- Everything that could endanger the slides, including clothing and accessories',
  '- Management reserves the final decision on which clothing/swimwear is suitable and acceptable for park entry or use on slides and attractions',
].join('\n');

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Clothing & Footwear Rules — ${loc?.displayName || 'Aqua Imagicaa'}`,
    description: 'Plan your water park attire. Learn about Aqua Imagicaa\'s clothing rules, including swimwear requirements.',
  };
}

export default async function ClothingAndFootwearPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);

  const page = await getPage(location.slug, 'pages', 'clothing-and-footwear');
  const pageHero = extractPageHero(page);
  const body = extractTermsContent(page) || FALLBACK_BODY;
console.log("BODY PREVIEW:", JSON.stringify(body).slice(0, 200));

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      <PageHero
        eyebrow={pageHero?.eyebrow || "Park guidelines"}
        title={pageHero?.heading || "Clothing & Footwear Rules"}
        subtitle={pageHero?.subtitle || "Know what to wear before you visit. Appropriate swimwear is required on all slides and attractions."}
        breadcrumbs={[
          { label: 'Home', href: base },
          { label: 'Clothing & Footwear' },
        ]}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />

      <main>
        <TermsContent body={body} />
      </main>

      <Footer location={location} navItems={navItems} />
      <MobBook location={location} />
    </>
  );
}