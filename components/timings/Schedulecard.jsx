// Simple inline icons keyed to the row label so we don't add a dep.
const iconFor = (label = "") => {
    const l = label.toLowerCase();
    if (l.includes("ticket") || l.includes("counter")) {
        return (
            <path
                d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z M9 6v12"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        );
    }
    if (l.includes("ride")) {
        return (
            <>
                <path
                    d="M4 17c2-3 4-4 8-4s6 1 8 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="8" cy="17" r="2" />
                <circle cx="16" cy="17" r="2" />
            </>
        );
    }
    // default: clock
    return (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" />
        </>
    );
};

export default function ScheduleCard({ schedule }) {
    if (!schedule?.rows?.length) return null;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
            {/* Yellow accent bar */}
            <div className="h-1.5 w-full bg-[#FFC93C]" />

            <div className="p-6 sm:p-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#14418B] sm:text-[1.65rem]">
                        {schedule.title}
                    </h2>
                    {schedule.openDaysLabel ? (
                        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {schedule.openDaysLabel}
                        </span>
                    ) : null}
                </div>

                <ul className="mt-6 divide-y divide-slate-100 rounded-xl ring-1 ring-slate-100">
                    {schedule.rows.map((row) => (
                        <li
                            key={row.label}
                            className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-slate-50/70"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#14418B]/8 text-[#14418B]">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    {iconFor(row.label)}
                                </svg>
                            </span>
                            <span className="flex-1 text-sm font-medium text-slate-700 sm:text-base">
                                {row.label}
                            </span>
                            <span className="rounded-md bg-slate-50 px-3 py-1.5 text-sm font-semibold tabular-nums text-slate-800 ring-1 ring-slate-200 sm:text-base">
                                {row.value}
                            </span>
                        </li>
                    ))}
                </ul>

                {schedule.note ? (
                    <p className="mt-5 text-center text-xs text-slate-500 sm:text-sm">
                        {schedule.note}
                    </p>
                ) : null}
            </div>
        </div>
    );
}