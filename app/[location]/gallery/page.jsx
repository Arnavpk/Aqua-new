'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLocation } from '@/lib/locations';
import { Navbar } from '@/components/Navbar';
import { PageHero } from '@/components/PageHero';
import { Footer } from '@/components/Footer';
import { Reveal } from '@/components/Reveal';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'rides', label: 'Rides' },
  { key: 'pools', label: 'Pools' },
  { key: 'dining', label: 'Dining' },
  { key: 'events', label: 'Events' },
  { key: 'park', label: 'Park' },
];

const GALLERY_ITEMS = [
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

export default function GalleryPage() {
  const params = useParams();
  const location = getLocation(params.location);
  const base = `/${location.slug}`;
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === filter);

  return (
    <>
      <Navbar location={location} />
      <PageHero
        eyebrow="#AquaImagicaa"
        title={<>Gallery</>}
        subtitle="Moments captured across every splash, slide and sunset at Aqua Imagicaa."
        breadcrumbs={[{ label: 'Home', href: base }, { label: 'Gallery' }]}
      />

      <section className="section-shell" style={{ paddingTop: 0, marginTop: -20, position: 'relative', zIndex: 3 }}>
        <div className="container-x">
          {/* Filter pills */}
          <Reveal className="mb-8">
            <div className="filter-card">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`filter-chip ${filter === cat.key ? 'is-active' : ''}`}
                  onClick={() => setFilter(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Masonry-ish grid */}
          <Reveal className="gallery-page-grid">
            {filtered.map((item, i) => (
              <div
                key={i}
                className={`gal-tile gallery-page-tile ${item.span === 'big' ? 'gallery-big' : ''}`}
                style={{ background: item.gradient }}
              >
                <span className="gal-tag">{item.tag}</span>
              </div>
            ))}
          </Reveal>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-ink-2">
              No photos in this category yet.
            </div>
          )}
        </div>
      </section>

      <section className="section-shell section-tight">
        <div className="container-x">
          <Reveal>
            <div className="cta-strip">
              <div className="relative">
                <span className="eyebrow eyebrow-sun block mb-4">Liked what you saw?</span>
                <h2 className="h1 text-white">Come make your own memories.</h2>
              </div>
              <div className="flex gap-3 flex-wrap relative">
                <Link href={`${base}/tickets`} className="btn btn-primary">Book tickets →</Link>
                <Link href={`${base}/rides`} className="btn btn-glass">Explore rides</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer location={location} />
    </>
  );
}