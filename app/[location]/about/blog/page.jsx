import Link from 'next/link';
import Image from 'next/image';
import { getLocation } from '@/lib/locations';
import { getAllArticles } from '@/lib/strapi/getArticles';
import { extractArticles } from '@/lib/extractors/articleExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';
import { BLOGS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { BlogGrid } from '@/components/blog/BlogGrid';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Blog — Aqua Imagicaa ${loc.name}`,
    description: `Tips, guides and stories from Aqua Imagicaa ${loc.name}.`,
  };
}

export default async function BlogListingPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;

  const [strapiLocations, navItems, strapiArticles] = await Promise.all([
    getAllStrapiLocations(),
    getNavItems(location.slug),
    getAllArticles(location.slug),
  ]);

  const blogs = extractArticles(strapiArticles) || BLOGS;
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />

      <PageHero
        eyebrow="Stories & tips"
        title="From the blog."
        subtitle="Practical guides, insider tips and stories to help you plan the perfect day at Aqua Imagicaa."
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Blog' }]}
      />

      {/* Featured article */}
      {featured && (
        <section
          className="section-shell"
          style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}
        >
          <div className="container-x">
            <Reveal>
              <Link
                href={`${base}/about/blog/${featured.slug}`}
                className="blog-featured"
              >
                <div className="bf-media relative overflow-hidden">
                  {featured.cover ? (
                    <Image
                      src={featured.cover}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFD84D, #FF7A9C)',
                      }}
                    />
                  )}
                  <span
                    className="absolute top-4 left-4 rounded-full font-accent text-[11px] font-bold z-[2] bg-white/95 text-ink px-3 py-1.5"
                    style={{ letterSpacing: '.08em' }}
                  >
                    {featured.cat}
                  </span>
                </div>
                <div className="bf-body">
                  <span className="eyebrow mb-3 block">Featured article</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.desc}</p>
                  <div className="flex gap-4 text-[12px] text-ink-2 mb-4">
                    <span>{featured.date}</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="btn btn-outline btn-sm self-start">
                    Read article →
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid with year archive — uses `rest` so featured isn't duplicated */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal>
            <BlogGrid blogs={rest} base={base} />
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}