'use client';

import { useState } from 'react';
import { Reveal } from '@/components/Reveal';

export function RideDetailsTable({ zones }) {
  const [activeZone, setActiveZone] = useState('all');

  if (!zones || !zones.length) return null;

  const filtered = activeZone === 'all'
    ? zones
    : zones.filter((z) => z.zone === activeZone);

  return (
    <section className="section-shell">
      <div className="container-x">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow mb-2 block">Ride specifications</span>
            <h2 className="h2">Know before you go.</h2>
          </div>
        </Reveal>

        {/* Zone filter */}
        <Reveal>
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              type="button"
              onClick={() => setActiveZone('all')}
              className={activeZone === 'all' ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            >
              All Zones
            </button>
            {zones.map((z) => (
              <button
                key={z.zone}
                type="button"
                onClick={() => setActiveZone(z.zone)}
                className={activeZone === z.zone ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
              >
                {z.zone}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Desktop table */}
        <Reveal>
          <div className="hidden md:block overflow-x-auto">
            <table className="ride-table">
              <thead>
                <tr>
                  <th>Zone</th>
                  <th>Ride Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Min Height</th>
                  <th>Weight</th>
                  <th>Water Depth</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((zone) =>
                  zone.rides.map((ride, i) => (
                    <tr key={`${zone.zone}-${ride.name}`} className={ride.closed ? 'opacity-50' : ''}>
                      {i === 0 && (
                        <td rowSpan={zone.rides.length} className="ride-zone-cell">
                          {zone.zone}
                        </td>
                      )}
                      <td className="font-semibold text-ink">
                        {ride.name}
                        {ride.closed && <span className="ride-closed-badge">Closed</span>}
                      </td>
                      <td>{ride.type}</td>
                      <td>{ride.capacity}</td>
                      <td>{ride.height}</td>
                      <td>{ride.weight}</td>
                      <td>{ride.waterDepth}</td>
                      <td>{ride.duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile cards */}
        <Reveal>
          <div className="md:hidden flex flex-col gap-4">
            {filtered.map((zone) => (
              <div key={zone.zone}>
                <h3 className="font-accent text-[11px] uppercase font-semibold text-brand-600 mb-3" style={{ letterSpacing: '.24em' }}>
                  {zone.zone}
                </h3>
                <div className="flex flex-col gap-3">
                  {zone.rides.map((ride) => (
                    <div
                      key={ride.name}
                      className={`location-card ${ride.closed ? 'opacity-50' : ''}`}
                      style={{ padding: '16px' }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-ink">{ride.name}</h4>
                        {ride.closed && <span className="ride-closed-badge">Closed</span>}
                      </div>
                      <div className="text-[13px] text-brand-600 mb-3">{ride.type}</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
                        <div><span className="text-ink-2">Capacity:</span> <span className="text-ink font-medium">{ride.capacity}</span></div>
                        <div><span className="text-ink-2">Height:</span> <span className="text-ink font-medium">{ride.height}</span></div>
                        <div><span className="text-ink-2">Weight:</span> <span className="text-ink font-medium">{ride.weight}</span></div>
                        <div><span className="text-ink-2">Duration:</span> <span className="text-ink font-medium">{ride.duration}</span></div>
                        {ride.waterDepth !== 'NA' && (
                          <div><span className="text-ink-2">Water depth:</span> <span className="text-ink font-medium">{ride.waterDepth}</span></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}