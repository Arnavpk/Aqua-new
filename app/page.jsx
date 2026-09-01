import Link from 'next/link';
import { getAllLocations } from '@/lib/locations';

const LOCATION_META = {
  surat: {
    tagline: 'Gujarat\'s favourite water park',
    rides: '14 signature rides',
    highlight: '3 pools · 6 restaurants',
    status: 'open',
    ctaLabel: 'Explore Surat →',
    bookLabel: 'Book Now',
    bookUrl: '/surat/tickets-and-offers',
    image: '	https://www.aquaimagicaa.com/assets/images/surat-bg.jpg',
  },
  indore: {
    tagline: 'Central India\'s biggest water park',
    rides: '12 signature rides',
    highlight: '3 pools · 4 restaurants',
    status: 'open',
    ctaLabel: 'Explore Indore →',
    bookLabel: 'Book Now',
    bookUrl: '/indore/tickets-and-offers',
    image: 'https://www.aquaimagicaa.com/assets/images/indore-bg.jpg',
  },
  ahmedabad: {
    tagline: 'Coming soon to Ahmedabad',
    rides: 'Opening 2026',
    highlight: 'For booking: +91 9099080024',
    status: 'coming-soon',
    image: "https://www.shankuswaterpark.com/wp-content/uploads/2024/05/waterpark.jpg",
  },
};

export const metadata = {
  title: 'Aqua Imagicaa — India\'s Most Loved Water Park Experience',
  description: 'Choose your Aqua Imagicaa location — Surat, Indore, or Ahmedabad. World-class water slides, wave pools, and family fun.',
};

export default function RootPage() {
  const locations = getAllLocations();

  return (
    <div className="lp-shell">
      <div className="lp-bg" aria-hidden="true">
        <div className="lp-wave lp-wave-1" />
        <div className="lp-wave lp-wave-2" />
        <div className="lp-wave lp-wave-3" />
      </div>

      <div className="lp-inner">
        <header className="lp-header">
          <div className="lp-logo" aria-hidden="true" >
            <img src="https://www.aquaimagicaa.com/assets/images/Aquamagicaa-logo.png" alt="logo" />
          </div>
          
          <p className="lp-subtitle">India's Most Loved Water Park Experience</p>
        </header>

        <div className="lp-prompt">
          <span className="lp-prompt-icon">📍</span>
          <span>Choose your park location</span>
        </div>

        <div className="lp-grid">
          {locations.map((loc) => {
            const meta = LOCATION_META[loc.slug] || {};
            const isOpen = meta.status === 'open';

            return (
              <div key={loc.slug} className={`lp-card ${!isOpen ? 'lp-card-soon' : ''}`}>
                {/* Full background image */}
                <div className="lp-card-bg">
                  {meta.image ? (
                    <img src={meta.image} alt={loc.displayName} />
                  ) : (
                    <div
                      className="lp-card-bg-placeholder"
                      style={{ background: 'linear-gradient(135deg, #0E7A93, #00A5C8)' }}
                    >
                      🚧
                    </div>
                  )}
                </div>

                {/* Dark gradient overlay */}
                <div className="lp-card-overlay" />

                {/* Content pinned to bottom */}
                <div className="lp-card-content">
                  <h2 className="lp-card-city">{loc.name}</h2>
                  <p className="lp-card-state">{loc.state}</p>
                  <p className="lp-card-tagline">{meta.tagline}</p>

                  <div className="lp-card-stats">
                    <span>{meta.rides}</span>
                    <span className="lp-dot">·</span>
                    <span>{meta.highlight}</span>
                  </div>

                  {isOpen ? (
                    <div className="lp-card-actions">
                      <Link href={`/${loc.slug}`} className="lp-btn-primary">
                        {meta.ctaLabel}
                      </Link>
                      <Link href={meta.bookUrl} className="lp-btn-secondary">
                        {meta.bookLabel}
                      </Link>
                    </div>
                  ) : (
                    <div className="lp-card-actions">
                      <span className="lp-badge-soon">Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="lp-footer">
          <div className="lp-footer-links">
            <Link href="/surat/contact-us">Contact Us</Link>
            <Link href="/surat/about">About</Link>
            <a href="https://www.instagram.com/aquaimagicaa/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <p className="lp-copyright">© 2026 Aqua Imagicaa · Imagicaaworld Entertainment Ltd.</p>
        </footer>
      </div>
    </div>
  );
}