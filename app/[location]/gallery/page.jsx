import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractGalleryPage } from '@/lib/extractors/galleryExtractor';
import { extractAboutCta } from '@/lib/extractors/aboutExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';
import { GalleryContent } from '@/components/GalleryContent';

const FALLBACK_TILES = [
  { cat: 'rides', gradient: 'linear-gradient(135deg, #0A5566, #00A5C8)', tag: 'Loopy Woopy', span: 'big' },
  { cat: 'pools', gradient: 'linear-gradient(135deg, #22C4DE, #5FDDEA)', tag: 'Wave Pool' },
  { cat: 'rides', gradient: 'linear-gradient(135deg, #FFD84D, #FF7A9C)', tag: 'Wild Raft' },
  { cat: 'dining', gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)', tag: 'Hungry Bird', span: 'big' },
  { cat: 'events', gradient: 'linear-gradient(135deg, #FF7A9C, #FFD84D)', tag: 'Rain Disco' },
  { cat: 'park', gradient: 'linear-gradient(135deg, #0E7A93, #22C4DE)', tag: 'Park Aerial' },
  { cat: 'rides', gradient: 'linear-gradient(135deg, #00A5C8, #5FDDEA)', tag: 'Boomeranggo' },
  { cat: 'pools', gradient: 'linear-gradient(135deg, #5FDDEA, #A8ECF3)', tag: 'Lazy River', span: 'big' },
  { cat: 'events', gradient: 'linear-gradient(135deg, #0A5566, #0E7A93)', tag: 'Splash Parade' },
  { cat: 'dining', gradient: 'linear-gradient(135deg, #FFD84D, #3FE0A5)', tag: 'Buffetaria' },
  { cat: 'park', gradient: 'linear-gradient(135deg, #22C4DE, #0A5566)', tag: 'Sunset View' },
  { cat: 'rides', gradient: 'linear-gradient(135deg, #FF7A9C, #0E7A93)', tag: 'Aqua Twister' },
];

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Gallery — ${loc?.displayName}`,
    description: `Photos and moments from ${loc?.displayName}.`,
  };
}

export default async function GalleryPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();
  const navItems = await getNavItems(location.slug);

  const galleryPage = await getPage(location.slug, 'pages', 'gallery');
  const pageHero = extractPageHero(galleryPage);
  const galleryData = extractGalleryPage(galleryPage);
  const ctaData = extractAboutCta(galleryPage);

  const tiles = galleryData?.tiles || FALLBACK_TILES;

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <PageHero
        eyebrow={pageHero?.eyebrow || "#AquaImagicaa"}
        title={pageHero?.heading || "Gallery"}
        subtitle={pageHero?.subtitle || "Moments captured across every splash, slide and sunset at Aqua Imagicaa."}
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Gallery' }]}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />

      <GalleryContent tiles={tiles} />

      <section className="section-shell section-tight">
        <div className="container-x">
          <Reveal>
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">{ctaData?.subtitle || "Liked what you saw?"}</span>
                <h2 className="h1 text-white">{ctaData?.heading || "Come make your own memories."}</h2>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={ctaData?.primaryCta?.href || `${base}/tickets`} className="btn btn-primary">
                  {ctaData?.primaryCta?.label || "Book tickets →"}
                </Link>
                <Link href={ctaData?.secondaryCta?.href || `${base}/rides`} className="btn btn-glass">
                  {ctaData?.secondaryCta?.label || "Explore rides"}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
    </>
  );
}