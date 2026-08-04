import Link from 'next/link';
import { FOOTER_COLUMNS } from '@/lib/data/home';

export function Footer({ location }) {
  const base = `/${location.slug}`;

  return (
    <footer className="footer-shell">
      <div className="container-x">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 max-[1024px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-8">
          <div className="max-[1024px]:col-span-3 max-[720px]:col-span-2">
            <div className="nav-mark" aria-hidden="true" />
            <h3 className="text-[32px] font-extrabold tracking-tight mt-5 mb-3">Aqua Imagicaa</h3>
            <p className="text-white/70 max-w-[320px] leading-relaxed">
              India&apos;s premier themed water park — 14 rides, 3 pools, and the best day out on the Mumbai–Pune Expressway.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-accent text-[11px] tracking-[.24em] uppercase text-sun m-0 mb-5 font-semibold">
                {col.heading}
              </h4>
              <ul className="m-0 p-0 list-none">
                {col.links.map((link) => (
                  <li key={link.label} className="mb-3">
                    <Link href={base + link.href} className="text-white/75 text-sm hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-[72px] pt-8 border-t border-white/10 text-white/50 text-[13px] max-[720px]:flex-col max-[720px]:gap-3 max-[720px]:mt-12 max-[720px]:text-center">
          <div>© 2026 Aqua Imagicaa. All rights reserved.</div>
          <div>{location.address.line}</div>
        </div>
      </div>
    </footer>
  );
}
