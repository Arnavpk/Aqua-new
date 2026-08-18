import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { getAllArticles } from '@/lib/strapi/getArticles';
import { extractArticles } from '@/lib/extractors/articleExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { getNavItems } from '@/lib/strapi/getNav';

import { BLOGS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return {
    title: `Blog — ${loc?.displayName}`,
    description: `Tips, guides and stories from ${loc?.displayName}.`,
  };
}

export default async function BlogListingPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const strapiArticles = await getAllArticles(location.slug);
  const blogs = extractArticles(strapiArticles) || BLOGS;
  const navItems = await getNavItems(location.slug);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />      <PageHero
        eyebrow="Stories & tips"
        title={<>From the <em>blog.</em></>}
        subtitle="Practical guides, insider tips and stories to help you plan the perfect day at Aqua Imagicaa."
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Blog' }]}
      />

      {featured && (
        <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
          <div className="container-x">
            <Reveal>
              <Link href={`${base}/about/blog/${featured.slug}`} className="blog-featured">
                <div className="bf-media relative overflow-hidden">
                  {featured.cover ? (
                    <img className="absolute inset-0 h-full w-full object-cover" src={featured.cover} alt={featured.title} />
                  ) : (
                    <div className="absolute inset-0" style={{ background: featured.gradient || 'linear-gradient(135deg, #FFD84D, #FF7A9C)' }} />
                  )}
                  <span className="absolute top-4 left-4 rounded-full font-accent text-[11px] font-bold z-[2] bg-white/95 text-ink px-3 py-1.5" style={{ letterSpacing: '.08em' }}>
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
                  <span className="btn btn-outline btn-sm self-start">Read article →</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-shell">
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-3 block">All articles</span>
              <h2 className="h1">Latest <em>posts.</em></h2>
            </div>
          </Reveal>
          <Reveal className="blog-grid">
            {blogs.map((blog) => (
              <Link key={blog.slug} href={`${base}/about/blog/${blog.slug}`} className="blog-card">
                <div className="blog-media relative overflow-hidden">
                  {blog.cover ? (
                    <img className="absolute inset-0 h-full w-full object-cover" src={blog.cover} alt={blog.title} />
                  ) : (
                    <div className="absolute inset-0" style={{ background: blog.gradient || 'linear-gradient(135deg, #00A5C8, #5FDDEA)' }} />
                  )}
                </div>
                <div className="blog-body">
                  <div className="cat">{blog.cat}</div>
                  <h4>{blog.title}</h4>
                  <p>{blog.desc}</p>
                  <div className="blog-meta-row">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>

          {blogs.length === 0 && (
            <div className="bg-white rounded-rx p-12 shadow-s2 text-center">
              <div className="text-[48px] mb-4">📝</div>
              <h3 className="h3 mb-2">No blog posts yet</h3>
              <p className="body-lg">Check back soon for tips, guides and park stories.</p>
            </div>
          )}
        </div>
      </section>

      <Footer location={location} />
    </>
  );
}