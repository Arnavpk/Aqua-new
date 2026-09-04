// Inline icons keyed to restriction type — no dep on lucide.
const HeightIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M8 6l4-3 4 3M8 18l4 3 4-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const WeightIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 8h16l-1.5 12H5.5L4 8Z" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
    </svg>
);
const RidersIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M15 20c0-2.5 1.5-4.5 4-4.5" strokeLinecap="round" />
    </svg>
);

const RestrictionLine = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-2">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14418B]/8 text-[#14418B]">
                <Icon />
            </span>
            <div className="text-sm text-slate-700 sm:text-base">
                <span className="font-semibold text-slate-900">{label}: </span>
                <span>{value}</span>
            </div>
        </div>
    );
};

export default function RestrictionsTable({ columns, restrictions }) {
    if (!restrictions?.length) return null;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
            {/* Yellow accent bar */}
            <div className="h-1.5 w-full bg-[#FFC93C]" />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm sm:text-base">
                    <thead className="bg-[#14418B] text-white">
                        <tr>
                            <th scope="col" className="w-1/3 px-6 py-4 font-semibold sm:px-8">
                                {columns.name}
                            </th>
                            <th scope="col" className="px-6 py-4 font-semibold sm:px-8">
                                {columns.restrictions}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {restrictions.map((r, i) => (
                            <tr
                                key={r.name}
                                className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-5 align-top font-semibold text-slate-900 sm:px-8"
                                >
                                    {r.name}
                                </th>
                                <td className="px-6 py-5 align-top sm:px-8">
                                    <div className="space-y-2">
                                        <RestrictionLine icon={HeightIcon} label="Height" value={r.height} />
                                        <RestrictionLine icon={WeightIcon} label="Weight" value={r.weight} />
                                        <RestrictionLine icon={RidersIcon} label="Riders" value={r.riders} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}