'use client';

import { useState } from 'react';
import { CategoryNav } from './CategoryNav';
import { FeaturedRideSpotlight } from './FeaturedRideSpotlight';
import { RideSection } from './RideSection';
import { PlanSafety } from './PlanSafety';

export function RidesContent({ locationSlug, sections, featured, categories, planSafety, featuredSection }) {
    const [activeCat, setActiveCat] = useState('all');

    const filteredSections =
        activeCat === 'all'
            ? sections
            : sections.filter((s) => s.key === activeCat);

    return (
        <>
            <CategoryNav
                categories={categories}
                active={activeCat}
                onSelect={setActiveCat}
            />

            {/* {activeCat === 'all' && (
                <FeaturedRideSpotlight locationSlug={locationSlug} ride={featured} section={featuredSection} />
            )} */}

            <main>
                {filteredSections.length > 0 ? (
                    filteredSections.map((section) => (
                        <RideSection
                            key={section.key}
                            section={section}
                            locationSlug={locationSlug}
                        />
                    ))
                ) : (
                    <section className="section-shell">
                        <div className="container-x">
                            <div className="bg-white rounded-rx p-12 shadow-s2 text-center">
                                <div className="text-[48px] mb-4">🏊</div>
                                <h3 className="h3 mb-2">No rides in this category</h3>
                                <p className="body-lg">Try selecting a different category above.</p>
                                <button
                                    type="button"
                                    className="btn btn-outline mt-6"
                                    onClick={() => setActiveCat('all')}
                                >
                                    Show all rides →
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                <PlanSafety locationSlug={locationSlug} data={planSafety} />
            </main>
        </>
    );
}