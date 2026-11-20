import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Project } from "../data";
import Kanga from "./Kanga";

export const wrap = "mx-auto w-full max-w-6xl px-6";
export const hard = "shadow-[6px_6px_0_var(--color-ink)]";

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border-2 border-ink px-3 py-0.5 text-[15px] font-medium">{children}</span>;
}

export function ButtonLink({ to, href, children, tone = "ink" }: { to?: string; href?: string; children: React.ReactNode; tone?: "ink" | "pink" | "paper" }) {
  const t = { ink: "bg-ink text-ground", pink: "bg-pink text-white", paper: "bg-paper text-ink" }[tone];
  const cls = `inline-block rounded-full border-2 border-ink px-6 py-3 font-bold transition-transform hover:-translate-y-0.5 ${t} ${hard}`;
  return to ? <Link to={to} className={cls}>{children}</Link> : <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
}

// Cloths hung on a rope. Touch one and it swings; open it for the full story.
export function Clothesline({ items }: { items: Project[] }) {
  return (
    <div aria-label="Project carousel" className="overflow-x-auto overscroll-x-contain pb-10 pt-2 [scrollbar-color:var(--color-ink)_transparent]" tabIndex={0}>
      <div className="relative flex w-max min-w-full snap-x snap-mandatory gap-6 px-5 pt-10 sm:gap-10 sm:px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        <div className="absolute inset-x-0 top-[3.1rem] h-[4px] bg-ink" />
        {items.map((p, i) => (
          <motion.div key={p.slug} className="relative w-[min(82vw,360px)] shrink-0 snap-center sm:w-[min(76vw,360px)]" style={{ originX: 0.5, originY: 0 }}
            initial={{ rotate: i % 2 ? 2.2 : -2.2 }} whileHover={{ rotate: 0, y: 6 }} transition={{ type: "spring", stiffness: 110, damping: 7 }}>
            <i className="absolute -top-3 left-10 z-10 h-9 w-3.5 rounded-sm border-2 border-ink bg-pink" />
            <i className="absolute -top-3 right-10 z-10 h-9 w-3.5 rounded-sm border-2 border-ink bg-pink" />
            <Link to={`?project=${p.slug}`} className="block pt-3">
              <Kanga p={p} className={`w-full border-2 border-ink ${hard}`} />
              <p className="mt-4 max-w-[34ch] text-[17px]">{p.summary}</p>
              <p className="mt-1 text-[15px] font-bold underline underline-offset-4">Read the case study</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
