'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLocation } from '@/lib/locations';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { MobBook } from '@/components/MobBook';
import { Reveal } from '@/components/Reveal';
import { ABOUT_STATS, WHY_CARDS, VISION_MISSION, TIMELINE, ABOUT_FAQS, BLOGS } from '@/lib/data/about';

export default function AboutPage() {
  const params = useParams();
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow="Gujarat's favourite water park"
        title={<>Where every drop is an <em>adventure.</em></>}
        subtitle="Aqua Imagicaa is a world-class themed water park offering 14 thrilling rides, premium dining, and unforgettable family experiences across two locations in India — Surat and Indore."
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'About Aqua Imagicaa' }]}
        primaryCta={{ label: 'Book tickets →', href: `${base}/tickets` }}
        secondaryCta={{ label: 'Explore rides', href: `${base}/rides` }}
      />

      {/* Stats */}
      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          <Reveal className="grid grid-cols-5 gap-4 max-[1024px]:grid-cols-3 max-[720px]:grid-cols-2">
            {ABOUT_STATS.map((s) => (
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
              <span className="eyebrow mb-3 block">About Aqua Imagicaa</span>
              <h2 className="h2 mb-4">India&apos;s premier themed water park.</h2>
              <p className="text-[15px] text-ink-2 leading-relaxed mb-3">Aqua Imagicaa is not just a water park — it&apos;s a destination where families come together to create memories that last a lifetime. Spread across expansive grounds in Surat, Gujarat, the park features 14 world-class water rides.</p>
              <p className="text-[15px] text-ink-2 leading-relaxed mb-3">Every ride is designed and manufactured to international safety standards, with regular inspections, certified lifeguards, and round-the-clock monitoring.</p>
              <p className="text-[15px] text-ink-2 leading-relaxed">The park also features six themed restaurants, premium cabana lounges, well-maintained changing facilities, and lush landscaped areas.</p>
            </div>
            <div className="rounded-rx overflow-hidden aspect-[4/3]" style={{ background: 'linear-gradient(135deg, #22C4DE, #5FDDEA)' }} />
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head"><div><span className="eyebrow mb-2 block">Why choose us</span><h2 className="h2">What makes Aqua Imagicaa special.</h2></div></Reveal>
          <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {WHY_CARDS.map((c) => (
              <div key={c.title} className="why-card"><div className="why-icon">{c.icon}</div><h4 className="text-base font-semibold mb-1.5">{c.title}</h4><p className="text-[13px] text-ink-2 leading-relaxed m-0">{c.desc}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Rides showcase */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="section-head">
            <div><span className="eyebrow mb-2 block">Our rides & attractions</span><h2 className="h2">14 ways to make a splash.</h2></div>
            <Link href={`${base}/rides`} className="btn btn-outline btn-sm max-[720px]:hidden">Explore all rides →</Link>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {[{ name: 'Boomerango', badge: 'THRILL', sub: 'Extreme · 120cm min', g: 'linear-gradient(135deg,#FF7A9C,#FFD84D)' },
              { name: 'Tornado', badge: 'THRILL', sub: 'High thrill · 120cm min', g: 'linear-gradient(135deg,#0A5566,#00A5C8)' },
              { name: 'Wave Pool', badge: 'FAMILY', sub: 'All ages · No restriction', g: 'linear-gradient(135deg,#22C4DE,#5FDDEA)' },
              { name: 'Lazy River', badge: 'LEISURE', sub: 'Relaxation · All ages', g: 'linear-gradient(135deg,#3FE0A5,#5FDDEA)' },
            ].map((ride) => (
              <Link key={ride.name} href={`${base}/rides`} className="block rounded-rl overflow-hidden shadow-s2 no-underline text-ink hover:text-ink transition-transform duration-300 ease-smooth hover:-translate-y-1.5">
                <div className="relative aspect-[4/3]">
                  <div className="absolute inset-0" style={{ background: ride.g }} />
                  <span className="absolute top-3 left-3 rounded-full font-accent text-[10px] font-bold z-[2] bg-white/95 text-ink px-3 py-1.5" style={{ letterSpacing: '.06em' }}>{ride.badge}</span>
                </div>
                <div className="p-4"><h4 className="text-base font-bold mb-1">{ride.name}</h4><span className="text-[12px] text-ink-2">{ride.sub}</span></div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head"><div><span className="eyebrow mb-2 block">Our purpose</span><h2 className="h2">Vision & mission.</h2></div></Reveal>
          <Reveal className="grid grid-cols-2 gap-5 max-[720px]:grid-cols-1">
            {VISION_MISSION.map((v) => (
              <div key={v.title} className="vm-card"><div className="text-3xl mb-3">{v.icon}</div><h3 className="h3 mb-3">{v.title}</h3><p className="text-sm text-ink-2 leading-relaxed m-0">{v.desc}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal className="grid grid-cols-2 gap-12 items-start max-[1024px]:grid-cols-1">
            <div>
              <span className="eyebrow mb-2 block">Our journey</span>
              <h2 className="h2 mb-6">A decade of making <em>waves.</em></h2>
              <div className="mt-6">
                {TIMELINE.map((t) => (
                  <div key={t.year} className="tl-item"><div className="tl-dot" /><div className="year">{t.year}</div><h4>{t.title}</h4><p>{t.desc}</p></div>
                ))}
              </div>
            </div>
            <div className="rounded-rx overflow-hidden aspect-[4/3] sticky top-[110px]" style={{ background: 'linear-gradient(135deg, #FFD84D, #FF7A9C)' }} />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
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
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head"><div><span className="eyebrow mb-2 block">Common questions</span><h2 className="h2">Frequently asked.</h2></div></Reveal>
          <Reveal>
            {ABOUT_FAQS.map((faq, i) => (
              <div key={i} className="about-faq-item">
                <button type="button" className={`about-faq-q ${openFaq === i ? 'is-open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  {faq.q}<span className="arrow">⌄</span>
                </button>
                <div className="about-faq-a" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                  <div className="about-faq-a-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell">
        <div className="container-x">
          <Reveal>
            <div className="cta-banner">
              <h2 className="h1 text-white mb-3 relative">Ready to make a splash?</h2>
              <p className="relative text-white/90 max-w-[500px] mx-auto mb-5">Book your tickets online and save up to 70%. Gujarat&apos;s favourite water park is waiting for you.</p>
              <div className="flex gap-3 justify-center relative">
                <Link href={`${base}/tickets`} className="btn btn-primary">Book tickets →</Link>
                <Link href={`${base}/rides`} className="btn btn-glass">Explore rides</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog */}
      <section className="section-shell" style={{ background: 'white', padding: '44px 0' }}>
        <div className="container-x">
          <Reveal className="section-head">
            <div><span className="eyebrow mb-2 block">From the blog</span><h2 className="h2">Stories & tips.</h2></div>
            <Link href={`${base}/about/blog/10-things-to-pack`} className="btn btn-outline btn-sm max-[720px]:hidden">All articles →</Link>
          </Reveal>
          <Reveal className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
            {BLOGS.map((b) => (
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
