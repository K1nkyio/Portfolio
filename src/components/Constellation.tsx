import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects, skills, type Project } from "../data";
import Kanga from "./Kanga";

const alias: Record<string, string[]> = { JavaScript: ["JavaScript", "React", "Node.js"], PHP: ["Core PHP"], HTML5: ["HTML", "React"], CSS3: ["CSS", "Tailwind CSS"], "REST APIs": ["Express"] };
function usedIn(name: string): Project[] {
  return projects.filter((p) => {
    if (name === "GitHub") return !!p.repo;
    if (name === "Vercel") return !!p.live?.includes("vercel");
    return (alias[name] ?? [name]).some((k) => p.stack.some((s) => {
      const a = s.toLowerCase(), b = k.toLowerCase();
      return a === b || (b.length > 3 && a.includes(b)) || (a.length > 3 && b.includes(a));
    }));
  });
}

const colours = [["#e5107a", "#fff"], ["#ffc20e", "#0e1a5b"], ["#0a8f5b", "#fff"], ["#fff6d8", "#0e1a5b"], ["#4a5df0", "#fff"], ["#ff7a1a", "#0e1a5b"]];
const textures = [
  "radial-gradient(rgba(0,0,0,.18) 22%, transparent 24%) 0 0/14px 14px",
  "repeating-linear-gradient(45deg, rgba(0,0,0,.13) 0 6px, transparent 6px 12px)",
  "conic-gradient(rgba(0,0,0,.13) 25%, transparent 0 50%, rgba(0,0,0,.13) 0 75%, transparent 0) 0 0/22px 22px",
  "repeating-radial-gradient(circle, rgba(0,0,0,.14) 0 5px, transparent 5px 10px)",
  "repeating-linear-gradient(90deg, rgba(0,0,0,.13) 0 4px, transparent 4px 10px)",
  "radial-gradient(rgba(0,0,0,.18) 22%, transparent 24%) 7px 7px/14px 14px",
];
const all = skills.flatMap((g, gi) => g.items.map((name) => ({ name, group: g.group, gi, used: usedIn(name) })));

// Every skill is a tile. Touch one: the board lights up everything that shares a project with it.
export default function Constellation() {
  const [active, setActive] = useState(all.find((t) => t.name === "React") ?? all[0]);
  return (
    <div>
      <div className="grid min-h-36 gap-5 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div>
          <p className="text-sm font-bold text-paper/80">{active.group}</p>
          <motion.p key={active.name} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-4xl leading-none text-ground md:text-6xl">{active.name}</motion.p>
          <p className="mt-3 max-w-[42ch] text-[16px] text-paper">
            {active.used.length
              ? `Used in ${active.used.length} of my ${projects.length} projects. Lit tiles share a project with it.`
              : "In my toolkit through coursework and tooling, not yet in a showcased project."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {active.used.map((p) => (
            <motion.div key={p.slug} initial={{ scale: 0.7, opacity: 0, rotate: -6 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
              <Link to={`?project=${p.slug}`} aria-label={`Open ${p.name}`}><Kanga p={p} className="w-24 border-2 border-paper" /></Link>
            </motion.div>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-10">
        {all.map((t) => {
          const isActive = t.name === active.name;
          const lit = isActive || t.used.some((u) => active.used.includes(u));
          const [bg, fg] = colours[t.gi];
          return (
            <li key={t.name}>
              <motion.button type="button" onMouseEnter={() => setActive(t)} onFocus={() => setActive(t)} onClick={() => setActive(t)}
                animate={{ opacity: lit ? 1 : 0.2, scale: isActive ? 1.12 : 1, rotate: isActive ? -3 : 0 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="relative flex h-16 w-full items-end p-2 text-left font-display text-[11px] leading-tight [overflow-wrap:anywhere] sm:h-20 sm:text-[13px] lg:h-24"
                style={{ background: `${textures[t.gi]}, ${bg}`, color: fg, zIndex: isActive ? 10 : 1 }}>
                {t.name}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
