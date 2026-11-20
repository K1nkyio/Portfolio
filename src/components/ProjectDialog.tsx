import { useSearchParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { projects } from "../data";
import Kanga from "./Kanga";
import { ButtonLink, Pill, hard } from "./ui";

export default function ProjectDialog() {
  const [sp, setSp] = useSearchParams();
  const p = projects.find((x) => x.slug === sp.get("project"));
  return (
    <Dialog.Root open={!!p} onOpenChange={(o) => { if (!o) setSp({}, { preventScrollReset: true }); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/75" />
        <Dialog.Content aria-describedby={undefined} className={`fixed inset-x-3 top-[4vh] z-50 mx-auto max-h-[92vh] max-w-5xl overflow-y-auto border-2 border-ink bg-paper p-5 md:p-8 ${hard}`}>
          {p && (
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
              <div>
                {p.image ? <img src={p.image} alt={`${p.name} screenshot`} className="w-full border-2 border-ink" /> : <Kanga p={p} className="w-full border-2 border-ink" />}
                <div className="mt-5 flex flex-wrap gap-2">{p.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>
              </div>
              <div>
                <Dialog.Close className="float-right rounded-full border-2 border-ink px-4 py-1 font-bold hover:bg-ground">Close</Dialog.Close>
                <Dialog.Title className="font-display text-4xl leading-tight">{p.name}</Dialog.Title>
                <p className="mt-3 text-xl">{p.summary}</p>
                <h3 className="mt-6 font-display text-xl">The problem</h3>
                <p className="mt-1">{p.problem}</p>
                <h3 className="mt-6 font-display text-xl">What I built</h3>
                <ul className="mt-2 space-y-2">{p.highlights.map((h) => <li key={h} className="border-l-8 border-pink bg-white/50 p-2 pl-3">{h}</li>)}</ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  {p.live && <ButtonLink href={p.live} tone="pink">Open live demo</ButtonLink>}
                  {p.repo && <ButtonLink href={p.repo} tone="ink">View source</ButtonLink>}
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
