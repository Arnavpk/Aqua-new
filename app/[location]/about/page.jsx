import { getLocation } from '@/lib/locations';
import { getPage } from '@/lib/strapi/getPage';
import { extractPageHero } from '@/lib/extractors/ticketExtractor';
import { extractAboutStats, extractAboutStory, extractWhyChoose, extractVisionMission, extractAboutTimeline, extractAboutCta } from '@/lib/extractors/aboutExtractor';
import { extractFaq } from '@/lib/extractors/faqExtractor';
import { getAllStrapiLocations } from '@/lib/strapi/getLocations';
import { ABOUT_STATS, WHY_CARDS, VISION_MISSION, TIMELINE, ABOUT_FAQS, BLOGS } from '@/lib/data/about';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { AboutContent } from '@/components/AboutContent';
import { getAllArticles } from '@/lib/strapi/getArticles';
import { extractArticles } from '@/lib/extractors/articleExtractor'
import { getNavItems } from '@/lib/strapi/getNav';


export default async function AboutPage({ params }) {
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const strapiLocations = await getAllStrapiLocations();

  const aboutPage = await getPage(location.slug, 'pages', 'about');

  const pageHero = extractPageHero(aboutPage);
  const stats = extractAboutStats(aboutPage) || ABOUT_STATS;
  const story = extractAboutStory(aboutPage);
  const whyChoose = extractWhyChoose(aboutPage);
  const visionMission = extractVisionMission(aboutPage);
  const timeline = extractAboutTimeline(aboutPage);
  const faqData = extractFaq(aboutPage);
  const aboutCta = extractAboutCta(aboutPage);
  const strapiArticles = await getAllArticles(location.slug);
  const blogs = extractArticles(strapiArticles) || BLOGS;
  const navItems = await getNavItems(location.slug);


  return (
    <>
      <Navbar location={location} locations={strapiLocations} navItems={navItems} />
      <PageHero
        eyebrow={pageHero?.eyebrow || "Gujarat's favourite water park"}
        title={pageHero?.heading ? (
          <>
            {pageHero.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <em>{pageHero.heading.split(" ").slice(-1)}</em>
          </>
        ) : (
          <>Where every drop is an <em>adventure.</em></>
        )}
        subtitle={pageHero?.subtitle || "Aqua Imagicaa is a world-class themed water park."}
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'About Aqua Imagicaa' }]}
        primaryCta={pageHero?.primaryCta || { label: 'Book tickets →', href: `${base}/tickets` }}
        secondaryCta={pageHero?.secondaryCta || { label: 'Explore rides', href: `${base}/rides` }}
        bgImage={pageHero?.bgImage}
        mobileImage={pageHero?.mobileImage}
      />

      {/* Stats */}
      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal className="grid grid-cols-5 gap-4 max-[1024px]:grid-cols-3 max-[720px]:grid-cols-2">
            {stats.map((s) => (
              <div key={s.l} className="stat-card-about"><div className="num">{s.n}</div><div className="lab">{s.l}</div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="grid grid-cols-2 gap-12 items-center max-[1024px]:grid-cols-1">
            <div>
              <span className="eyebrow mb-3 block">{story?.eyebrow || "About Aqua Imagicaa"}</span>
              <h2 className="h2 mb-4">{story?.heading || "India's premier themed water park."}</h2>
              {(story?.paragraphs || [
                "Aqua Imagicaa is not just a water park — it's a destination where families come together to create memories that last a lifetime.",
                "Every ride is designed and manufactured to international safety standards.",
                "The park also features six themed restaurants, premium cabana lounges, and lush landscaped areas.",
              ]).map((p, i) => (
                <p key={i} className="text-[15px] text-ink-2 leading-relaxed mb-3">{p}</p>
              ))}
            </div>
            <div className="rounded-rx overflow-hidden aspect-[4/3] relative">
              {story?.image ? (
                <img className="absolute inset-0 h-full w-full object-cover" src={story.image} alt={story.heading} />
              ) : (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #22C4DE, #5FDDEA)' }} />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-2 block">{whyChoose?.eyebrow || "Why choose us"}</span>
              <h2 className="h2">{whyChoose?.heading || "What makes Aqua Imagicaa special."}</h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {(whyChoose?.cards || WHY_CARDS).map((c) => (
              <div key={c.title} className="why-card">
                <div className="why-icon">{c.icon}</div>
                <h4 className="text-base font-semibold mb-1.5">{c.title}</h4>
                <p className="text-[13px] text-ink-2 leading-relaxed m-0">{c.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Rides showcase — pulls from Ride collection, stays hardcoded for now */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="section-head">
            <div><span className="eyebrow mb-2 block">Our rides & attractions</span><h2 className="h2">14 ways to make a splash.</h2></div>
            <Link href={`${base}/rides`} className="btn btn-outline btn-sm max-[720px]:hidden">Explore all rides →</Link>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow mb-2 block">{visionMission?.eyebrow || "Our purpose"}</span>
              <h2 className="h2">{visionMission?.heading || "Vision & mission."}</h2>
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
            {(visionMission?.items || VISION_MISSION).map((v) => (
              <div key={v.title} className="vm-card">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="h3 mb-3">{v.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed m-0">{v.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="grid grid-cols-2 gap-12 items-start max-[1024px]:grid-cols-1">
            <div>
              <span className="eyebrow mb-2 block">{timeline?.eyebrow || "Our journey"}</span>
              <h2 className="h2 mb-6">
                {timeline?.heading ? (
                  <>
                    {timeline.heading.split(" ").slice(0, -1).join(" ")}{" "}
                    <em>{timeline.heading.split(" ").slice(-1)}</em>
                  </>
                ) : (
                  <>A decade of making <em>waves.</em></>
                )}
              </h2>
              <div className="mt-6">
                {(timeline?.milestones || TIMELINE).map((t) => (
                  <div key={t.year} className="tl-item">
                    <div className="tl-dot" />
                    <div className="year">{t.year}</div>
                    <h4>{t.title}</h4>
                    <p>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-rx overflow-hidden aspect-[4/3] sticky top-[110px] relative">
              {timeline?.image ? (
                <img className="absolute inset-0 h-full w-full object-cover" src={timeline.image} alt="Timeline" />
              ) : (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FFD84D, #FF7A9C)' }} />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact — uses local location data */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="section-head"><div><span className="eyebrow mb-2 block">Plan your visit</span><h2 className="h2">How to reach us.</h2></div></Reveal>
          <Reveal className="grid grid-cols-2 gap-6 max-[1024px]:grid-cols-1">
            <div className="contact-card">
              <h4 className="text-xl font-bold mb-4">Aqua Imagicaa — {location.name}</h4>
              <div className="c-row"><span className="icon">📍</span><div>{location.address.line}</div></div>
              <div className="c-row"><span className="icon">📞</span><div><a href={location.contact.phoneHref}>{location.contact.phone}</a> · Available {location.contact.phoneHours} daily</div></div>
              <div className="c-row"><span className="icon">✉️</span><div><a href={`mailto:${location.contact.email}`}>{location.contact.email}</a></div></div>
              <div className="c-row"><span className="icon">⏰</span><div><strong>Park timings:</strong> {location.hours.open} – {location.hours.close} daily</div></div>
              <div className="flex gap-2.5 mt-4">
                <Link href={`${base}/tickets`} className="btn btn-primary btn-sm">Book tickets →</Link>
                <Link href={`${base}/rides`} className="btn btn-outline btn-sm">Explore rides</Link>
              </div>
            </div>
            <div className="rounded-rx overflow-hidden aspect-[4/3]" style={{ background: 'linear-gradient(135deg, #0A5566, #0E7A93)' }}>
              <div className="w-full h-full flex items-center justify-center text-[80px] opacity-30">🗺️</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <AboutContent faqData={faqData} aboutFaqs={ABOUT_FAQS} />

      {/* CTA */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal>
            <div className="cta-banner">
              <h2 className="h1 text-white mb-3 relative">{aboutCta?.heading || "Ready to make a splash?"}</h2>
              <p className="relative text-white/90 max-w-[500px] mx-auto mb-5">{aboutCta?.subtitle || "Book your tickets online and save up to 70%."}</p>
              <div className="flex gap-3 justify-center relative">
                {aboutCta?.primaryCta ? (
                  <Link href={aboutCta.primaryCta.href} className="btn btn-primary">{aboutCta.primaryCta.label}</Link>
                ) : (
                  <Link href={`${base}/tickets`} className="btn btn-primary">Book tickets →</Link>
                )}
                {aboutCta?.secondaryCta ? (
                  <Link href={aboutCta.secondaryCta.href} className="btn btn-glass">{aboutCta.secondaryCta.label}</Link>
                ) : (
                  <Link href={`${base}/rides`} className="btn btn-glass">Explore rides</Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog — uses Article collection, stays as-is for now */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div><span className="eyebrow mb-2 block">From the blog</span><h2 className="h2">Stories & tips.</h2></div>
            <Link href={`${base}/about/blog`} className="btn btn-outline btn-sm max-[720px]:hidden">All articles →</Link>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {blogs.slice(0, 4).map((b) => (
              <Link key={b.slug} href={`${base}/about/blog/${b.slug}`} className="blog-card">
                <div className="blog-media relative overflow-hidden">
                  {b.cover ? (
                    <img className="absolute inset-0 h-full w-full object-cover" src={b.cover} alt={b.title} />
                  ) : (
                    <div className="absolute inset-0" style={{ background: b.gradient || 'linear-gradient(135deg, #00A5C8, #5FDDEA)' }} />
                  )}
                </div>
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