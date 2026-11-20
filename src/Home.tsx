import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { coursework, projects, site, timeline } from "./data";
import { ButtonLink, Clothesline, hard, wrap } from "./components/ui";
import Constellation from "./components/Constellation";
import ProjectDialog from "./components/ProjectDialog";
import SocialLinks from "./components/SocialLinks";

const rings = [["#0e1a5b", 98], ["#e5107a", 80], ["#0a8f5b", 62], ["#fff6d8", 44]] as const;
const types = ["Web app", "AI or automation", "Internship or job", "Design", "Something else"];
const field = "mt-1 w-full border-2 border-ink bg-white/70 px-4 py-3";

export default function Home() {
  const [type, setType] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.get("name"), email: f.get("email"), topic: type, message: f.get("message"), website: f.get("website") }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We couldn't send your message. Please try again shortly.");
      form.reset(); setType(""); setFeedback("Your message has been sent."); setState("success");
    } catch (error) { setFeedback(error instanceof Error ? error.message : "We couldn't send your message. Please try again shortly."); setState("error"); }
  }
  return (
    <>
      <section className={`${wrap} grid items-center gap-14 pb-24 pt-12 md:grid-cols-[1.15fr_1fr] md:pt-16`}>
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full bg-ink px-4 py-1 text-[15px] font-bold text-ground">{site.status}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-6 font-display text-[2.6rem] leading-[1.05] md:text-[4.2rem]">
            I build full-stack apps from database to interface.
          </motion.h1>
          <p className="mt-6 max-w-[46ch] text-xl">I'm {site.name}, based in {site.location}. I make AI, automation and secure web platforms that handle real workflows like M-Pesa spending, rentals and campus life.</p>
          <p className="mt-3 max-w-[46ch] text-[17px] font-medium">B.Sc. Computer Science at Zetech University (2028). IT support intern, Jan to Apr 2026.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="#work" tone="pink">See my work</ButtonLink>
            <ButtonLink href={site.cv} tone="paper">Download CV</ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] py-6">
          <svg viewBox="0 0 200 200" aria-hidden className="absolute left-1/2 top-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2">
            {rings.map(([c, r], i) => (
              <motion.circle key={r} cx="100" cy="100" r={r} fill={c} initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 90, damping: 12 }} />
            ))}
          </svg>
          <motion.div initial={{ opacity: 0, rotate: 4, y: 30 }} animate={{ opacity: 1, rotate: -2, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 12 }}
            className="pindo relative border-2 border-ink p-4 shadow-[12px_12px_0_var(--color-ink)]">
            <img src="/me.jpg" alt={`Portrait of ${site.name}`} className="aspect-[4/5] w-full border-2 border-ink bg-paper object-cover" />
            <p className="absolute -bottom-5 -left-4 rotate-3 border-2 border-ink bg-pink px-4 py-2 font-display text-lg text-white">{site.name}</p>
          </motion.div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 border-y-2 border-ink bg-paper py-14">
        <div className={wrap}>
          <h2 className="font-display text-4xl md:text-5xl">Selected work</h2>
          <p className="mt-2 max-w-[56ch] text-xl">{projects.length} projects, each printed as a cloth on the line. Drag sideways and open any piece for the case study.</p>
        </div>
        <Clothesline items={projects} />
      </section>

      <section id="path" className={`${wrap} mt-24 scroll-mt-24`}>
        <h2 className="font-display text-4xl md:text-5xl">Experience and education</h2>
        <ol className="relative mt-10 grid gap-6 md:grid-cols-3">
          <div aria-hidden className="absolute inset-x-0 top-4 hidden border-t-4 border-dashed border-ink md:block" />
          {timeline.map((t) => (
            <li key={t.what} className="relative pl-10 md:pl-0 md:pt-10">
              <span className="absolute left-0 top-5 size-8 rounded-full border-4 border-ink bg-pink md:left-5 md:top-0" />
              <div className={`h-full border-2 border-ink bg-paper p-5 ${hard}`}>
                <p className="font-bold">{t.when}</p>
                <p className="mt-1 font-display text-xl leading-snug">{t.what}</p>
                <p>{t.where}</p>
                {t.bullets && <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[16px]">{t.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-[70ch] text-[17px]"><span className="font-bold">Coursework:</span> {coursework.join(", ")}.</p>
      </section>

      <section id="skills" className="mt-24 scroll-mt-20 bg-ink py-12 text-paper">
        <div className={wrap}>
          <h2 className="font-display text-4xl text-paper md:text-5xl">What I work with</h2>
          <p className="mb-8 mt-2 max-w-[60ch] text-lg text-paper/85">Touch a tile to light up what I've used it alongside, and the projects that prove it.</p>
          <Constellation />
        </div>
      </section>

      <section id="contact" className={`${wrap} mt-24 scroll-mt-24`}>
        <h2 className="font-display text-5xl md:text-7xl">Karibu.</h2>
        <p className="mt-3 text-2xl font-bold">{site.status}. Tell me what you're building.</p>
        <div className="mt-10 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <form onSubmit={submit} className={`space-y-6 border-2 border-ink bg-paper p-5 sm:p-6 md:p-8 ${hard}`}>
            <label className="block font-bold">Your name<input name="name" required maxLength={100} autoComplete="name" className={field} /></label>
            <label className="block font-bold">Your email<input name="email" type="email" required maxLength={254} autoComplete="email" className={field} /></label>
            <div>
              <span id="t" className="font-bold">What is it about?</span>
              <Select.Root value={type} onValueChange={setType}>
                <Select.Trigger aria-labelledby="t" className={`${field} flex items-center justify-between text-left`}><Select.Value placeholder="Choose one" /><Select.Icon>▾</Select.Icon></Select.Trigger>
                <Select.Portal>
                  <Select.Content position="popper" sideOffset={4} className="z-50 w-(--radix-select-trigger-width) border-2 border-ink bg-paper p-1 shadow-[6px_6px_0_var(--color-ink)]">
                    <Select.Viewport>{types.map((t) => <Select.Item key={t} value={t} className="cursor-pointer px-3 py-2 outline-none data-[highlighted]:bg-pink data-[highlighted]:text-white"><Select.ItemText>{t}</Select.ItemText></Select.Item>)}</Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <label className="block font-bold">Message<textarea name="message" required minLength={10} maxLength={5000} rows={5} className={field} /></label>
            <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <button type="submit" disabled={state === "sending"} className={`rounded-full border-2 border-ink bg-pink px-7 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 ${hard}`}>{state === "sending" ? "Sending…" : "Send inquiry"}</button>
            <p role="status" aria-live="polite" className="font-bold">{state === "success" ? `Thanks for reaching out. ${feedback}` : state === "error" ? feedback : ""}</p>
          </form>
          <div className="space-y-8 text-xl">
            <div><p className="font-bold">Email</p><a className="break-all underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></div>
            <div><p className="font-bold">Phone</p><a className="underline underline-offset-4" href={`tel:${site.phone}`}>{site.phone}</a></div>
            <div><p className="font-bold">Based in</p><p>{site.location}</p></div>
            <div><p className="mb-2 font-bold">Elsewhere</p><SocialLinks /></div>
            <ButtonLink href={site.cv} tone="pink">Download CV</ButtonLink>
          </div>
        </div>
      </section>
      <ProjectDialog />
    </>
  );
}
