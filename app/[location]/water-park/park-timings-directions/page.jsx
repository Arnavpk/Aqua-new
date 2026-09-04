import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import ScheduleCard from "@/components/timings/ScheduleCard";
import DirectionsMap from "@/components/timings/DirectionsMap";
import RideTimingsModal from "@/components/timings/RideTimingsModal";
import { Navbar } from '@/components/Navbar';
import { getParkTimings } from "@/lib/strapi/getParkTimings";
import { getLocation, getAllLocationSlugs } from "@/lib/locations";

export const revalidate = 300;

export function generateStaticParams() {
    return getAllLocationSlugs().map((location) => ({ location }));
}

export async function generateMetadata({ params }) {
    const { location } = await params;
    const loc = getLocation(location);
    if (!loc) return {};

    const data = await getParkTimings(location);
    const city = loc.name || loc.displayName || location;

    return {
        title: `${data.seo.title} | Aqua Imagicaa ${city}`,
        description: data.seo.description,
        alternates: { canonical: `/${location}/water-park/park-timings-directions` },
    };
}

export default async function ParkTimingsDirectionsPage({ params }) {
    const { location } = await params;
    const loc = getLocation(location);
    if (!loc) notFound();

    const data = await getParkTimings(location);
    const city = loc.name || loc.displayName || location;

    return (
        <>
            <PageHero
                title={data.title}
                breadcrumbs={[
                    { label: "Home", href: `/${location}` },
                    { label: "Water Park", href: `/${location}/water-park/rides-and-attractions` },
                    { label: data.title },
                ]}
            />

            {/* Soft brand-tinted background so the page doesn't read as a bare white slab */}
            <section className="relative bg-gradient-to-b from-sky-50 via-white to-white py-14 sm:py-20">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <Reveal>
                        <div className="mx-auto max-w-3xl text-center">
                            {/* Kicker */}
                            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#FFC93C]">
                                Plan your visit
                            </span>
                            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#FFC93C]" />

                            <p className="mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl">
                                {data.intro}
                            </p>

                            <div className="mt-8">
                                <RideTimingsModal
                                    label={data.statusLinkLabel}
                                    rideTimings={data.rideTimings}
                                />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
                            <ScheduleCard schedule={data.schedule} />
                            <DirectionsMap map={data.map} parkName={`Aqua Imagicaa ${city}`} />
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}