import Link from 'next/link';
import { getLocation } from '@/lib/locations';
import { BLOG_DETAIL, BLOGS } from '@/lib/data/about';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';

export function generateMetadata({ params }) {
  const loc = getLocation(params.location);
  return { title: `${BLOG_DETAIL.title} — ${loc?.displayName}`, description: BLOG_DETAIL.intro };
}

export default function BlogDetailPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const blog = BLOG_DETAIL;
  const related = BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 4);

  return (
    <>
      <Navbar location={location} />

      {/* Hero banner */}
      <div className="blog-hero-placeholder">
        <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-20" aria-hidden="true">📝</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="container-x absolute bottom-8 left-0 right-0 z-[2]">
          <nav className="breadcrumb text-white/80" aria-label="Breadcrumb">
            <Link href={base} className="!text-white/80 hover:!text-white">Home</Link>
            <span className="sep">›</span>
            <Link href={`${base}/about`} className="!text-white/80 hover:!text-white">About</Link>
            <span className="sep">›</span>
            <span className="text-white">Blog</span>
          </nav>
        </div>
      </div>

      {/* Article layout */}
      <div className="container-x">
        <div className="article-layout">
          <main>
            <Reveal>
              <article>
                <div className="mb-8">
                  <span className="inline-block rounded-full font-accent text-[11px] font-bold bg-brand-50 text-brand-700 mb-3 px-3 py-1.5" style={{ letterSpacing: '.08em' }}>
                    {blog.cat}
                  </span>
                  <h1 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight mb-4">
                    {blog.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-ink-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-300 to-brand-600" />
                      <span className="font-medium text-ink">{blog.author}</span>
                    </div>
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <div className="prose">
                  <p>{blog.intro}</p>
                  {blog.sections.map((s, i) => (
                    <div key={i}>
                      <h2>{i + 1}. {s.heading}</h2>
                      <p>{s.body}</p>
                      {i === 1 && <div className="prose-img" />}
                      {i === 4 && (
                        <blockquote>
                          Pro tip: Our changing rooms have hot showers, so you can freshen up properly before heading home.
                        </blockquote>
                      )}
                    </div>
                  ))}
                  <div className="prose-img" />
                  <p>{blog.outro}</p>
                </div>

                <div className="share-bar">
                  <span>Share:</span>
                  {['𝕏', 'f', 'W', '🔗'].map((icon) => (
                    <button key={icon} type="button" className="share-btn" aria-label="Share">{icon}</button>
                  ))}
                </div>
              </article>
            </Reveal>

            <div className="mt-6 flex gap-3">
              <Link href={`${base}/about`} className="btn btn-outline btn-sm">← Back to blog</Link>
              <Link href={`${base}/tickets`} className="btn btn-primary btn-sm">Book your visit →</Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside>
            <Reveal>
              <div className="side-card">
                <h4>In this article</h4>
                {blog.toc.map((item) => (
                  <a key={item} href="#" className="toc-item">{item}</a>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="side-card">
                <h4>Categories</h4>
                <div>
                  {blog.categories.map((c) => (
                    <a key={c} href="#" className="cat-pill">{c}</a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="side-card !border-0" style={{ background: 'linear-gradient(135deg, var(--brand-400), var(--brand-300))', color: 'white' }}>
                <h4 style={{ color: 'rgba(255,255,255,.8)' }}>Plan your visit</h4>
                <p className="text-sm mb-3.5 opacity-90 leading-relaxed">Ready to make a splash? Book tickets online and save up to 70%.</p>
                <Link href={`${base}/tickets`} className="btn btn-primary btn-sm w-full text-center">Book now →</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      <section style={{ padding: '40px 0 20px' }}>
        <div className="container-x">
          <Reveal className="flex justify-between items-end mb-6 gap-4">
            <div>
              <span className="eyebrow mb-2 block">Keep reading</span>
              <h2 className="h2">Related articles.</h2>
            </div>
            <Link href={`${base}/about`} className="btn btn-outline btn-sm max-[720px]:hidden">All articles →</Link>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {related.map((b) => (
              <Link key={b.slug} href={`${base}/about/blog/${b.slug}`} className="blog-card">
                <div className="blog-media"><div className="absolute inset-0" style={{ background: b.gradient }} /></div>
                <div className="blog-body">
                  <div className="cat">{b.cat}</div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                  <div className="blog-meta-row"><span>{b.date}</span><span>{b.readTime}</span></div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
      <MobBook location={location} />
    </>
  );
}
