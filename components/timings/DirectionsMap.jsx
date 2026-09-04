export default function DirectionsMap({ map, parkName = "Aqua Imagicaa" }) {
    if (!map?.embedUrl) return null;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
            {/* Matching yellow accent bar */}
            <div className="h-1.5 w-full bg-[#FFC93C]" />

            <div className="p-6 pb-4 sm:px-8 sm:pt-8">
                <h2 className="text-center text-2xl font-bold text-[#14418B] sm:text-[1.65rem]">
                    Find us
                </h2>
                {map.address ? (
                    <p className="mt-2 text-center text-sm text-slate-600 sm:text-base">
                        {map.address}
                    </p>
                ) : null}
            </div>

            <div className="mx-6 mb-6 overflow-hidden rounded-xl ring-1 ring-slate-200 sm:mx-8">
                <iframe
                    src={map.embedUrl}
                    title={`Map to ${parkName}`}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[280px] w-full border-0 sm:h-[340px] lg:h-[380px]"
                />
            </div>

            {map.directionsUrl ? (
                <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-4 text-center sm:px-8">
                    <a
                        href={map.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#14418B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0f3269] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C]"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M10 2C6.686 2 4 4.686 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6Z"
                                strokeLinejoin="round"
                            />
                            <circle cx="10" cy="8" r="2" />
                        </svg>
                        Get directions
                        <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-0.5"
                        >
                            →
                        </span>
                    </a>
                </div>
            ) : null}
        </div>
    );
}