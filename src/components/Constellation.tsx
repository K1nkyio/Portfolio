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

const marks: Record<string, string> = {
  JavaScript: "JS", TypeScript: "TS", Python: "Py", PHP: "PHP", C: "C", "C++": "C++", SQL: "SQL",
  React: "⚛", "TanStack Start": "TS", Vite: "V", "Tailwind CSS": "Tw", HTML5: "5", CSS3: "3",
  "Node.js": "N", Express: "Ex", FastAPI: "API", "REST APIs": "↔", "Core PHP": "PHP",
  PostgreSQL: "PG", MySQL: "My", Supabase: "Sb", "Gemini API": "✦", "Groq API": "Gq", "OpenAI API": "AI",
  Git: "Git", GitHub: "GH", "VS Code": "<> ", Render: "R", Vercel: "▲", "Android Studio": "A",
};
const categoryMarks = ["Aa", "</>", "↔", "▤", "✦", "⚙"];
const all = skills.flatMap((g) => g.items.map((name) => ({ name, group: g.group, used: usedIn(name) })));

export default function Constellation() {
  const [active, setActive] = useState(all.find((t) => t.name === "React") ?? all[0]);
  const activeIndex = skills.findIndex((g) => g.group === active.group);
  return (
    <div className="space-y-8 sm:space-y-10">
      <div aria-live="polite" className="grid gap-6 rounded-2xl border-2 border-paper/30 bg-[#17245f] p-5 shadow-[6px_6px_0_rgba(255,246,216,.22)] sm:p-7 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-ground">Selected technology · {active.group}</p>
          <motion.p key={active.name} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-2 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">{active.name}</motion.p>
          <p className="mt-3 max-w-[48ch] text-base text-white/90">
            {active.used.length
              ? `Used in ${active.used.length} of my ${projects.length} projects. Select a project to see its case study.`
              : "In my toolkit through coursework and tooling, not yet in a showcased project."}
          </p>
        </div>
        {active.used.length > 0 && <div className="flex flex-wrap gap-3 md:max-w-[300px] md:justify-end">
          {active.used.map((p) => (
            <motion.div key={p.slug} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
              <Link to={`?project=${p.slug}`} aria-label={`Open ${p.name}`} className="block rounded border-2 border-paper focus-visible:outline-4 focus-visible:outline-ground"><Kanga p={p} className="w-20 sm:w-24" /></Link>
            </motion.div>
          ))}
        </div>}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((category, categoryIndex) => (
          <section key={category.group} aria-label={`${category.group} technologies`} className="rounded-2xl border-2 border-paper/35 bg-[#17245f] p-4 shadow-[5px_5px_0_rgba(255,246,216,.16)] sm:p-5">
            <h3 className="mb-4 flex items-center gap-3 font-display text-lg text-white sm:text-xl">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-ground font-mono text-sm font-bold text-ink">{categoryMarks[categoryIndex]}</span>
              {category.group}
              <span className="ml-auto font-sans text-sm font-semibold text-white/75">{category.items.length}</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {category.items.map((name) => {
                const selected = active.name === name;
                const hasProjects = usedIn(name).length > 0;
                return <li key={name}>
                  <motion.button type="button" aria-pressed={selected} onMouseEnter={() => setActive(all.find((item) => item.name === name)!)} onFocus={() => setActive(all.find((item) => item.name === name)!)} onClick={() => setActive(all.find((item) => item.name === name)!)}
                    whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                    className={`flex min-h-[58px] w-full items-center gap-2 rounded-lg border-2 px-2.5 py-2 text-left text-sm font-bold leading-tight transition-colors focus-visible:outline-4 focus-visible:outline-ground sm:min-h-[62px] sm:gap-3 sm:px-3 ${selected ? "border-ground bg-ground text-ink shadow-[3px_3px_0_#fff6d8]" : "border-white/35 bg-white text-ink hover:border-ground hover:bg-[#fff2bf]"}`}>
                    <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-black ${selected ? "bg-ink text-ground" : "bg-[#e8edff] text-ink"}`}>{marks[name] ?? name.slice(0, 2)}</span>
                    <span className="min-w-0 flex-1">{name}</span>
                    <span aria-label={hasProjects ? "Shown in projects" : "Not shown in a project yet"} title={hasProjects ? "Shown in projects" : "Not shown in a project yet"} className={`size-2 shrink-0 rounded-full ${hasProjects ? "bg-[#087a50]" : "bg-slate-400"}`} />
                  </motion.button>
                </li>;
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="text-sm font-medium text-white/85"><span className="mr-2 inline-block size-2 rounded-full bg-[#54e6a2]" />Used in a showcased project <span className="mx-2 text-white/50">·</span><span className="mr-2 inline-block size-2 rounded-full bg-slate-300" />Coursework or tooling</p>
    </div>
  );
}
