import Link from 'next/link';
import { getAllLocations, DEFAULT_LOCATION } from '@/lib/locations';

export default function NotFound() {
  const locations = getAllLocations();
  // console.log('locations', locations);
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-brand-50">
      <div className="text-center max-w-md">
        <p className="eyebrow mb-4">404 · Page not found</p>
        <h1 className="h1 mb-4">We&apos;re not in that city yet.</h1>
        <p className="body-lg mb-8">Pick from one of our current locations:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {locations.map((loc) => (
            <Link key={loc.slug} href={`/${loc.slug}`} className="btn btn-primary">{loc.name} →</Link>
          ))}
        </div>
      </div>
    </main>
  );
}
