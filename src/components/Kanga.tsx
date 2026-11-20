import type { Project } from "../data";
import { look, type Motif } from "../look";

function Mark({ m, c }: { m: Motif; c: [string, string, string] }) {
  const [a, b, d] = c, f = [b, d, a, b, d];
  if (m === "rings") return <g>{[78, 62, 46, 30, 14].map((r, i) => <circle key={r} cx={200} cy={108} r={r} fill={f[i]} />)}</g>;
  if (m === "diamonds") return <g>{[70, 54, 38, 22, 8].map((r, i) => <rect key={r} x={200 - r} y={108 - r} width={r * 2} height={r * 2} transform="rotate(45 200 108)" fill={f[i]} />)}</g>;
  if (m === "dots") return <g>{Array.from({ length: 35 }, (_, i) => { const x = i % 7, y = Math.floor(i / 7); return <circle key={i} cx={128 + x * 24} cy={58 + y * 25} r={9} fill={(x + y) % 2 ? d : b} />; })}</g>;
  return <g fill="none" strokeWidth={8} strokeLinecap="round">{[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M120 ${60 + i * 22} q20 -22 40 0 t40 0 t40 0 t40 0`} stroke={[b, d][i % 2]} />)}</g>;
}

export default function Kanga({ p, className = "" }: { p: Project; className?: string }) {
  const k = look[p.slug], [a, b, d] = k.c, id = `pindo-${p.slug}`;
  return (
    <svg viewBox="0 0 400 280" role="img" aria-label={p.name} className={className}>
      <defs><pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill={a} /><path d="M0 20 L10 4 L20 20Z" fill={b} /><circle cx="10" cy="2" r="2.4" fill={d} /></pattern></defs>
      <rect width="400" height="280" fill={`url(#${id})`} />
      <rect x="22" y="22" width="356" height="236" fill={a} />
      <Mark m={k.motif} c={k.c} />
      <rect x="22" y="190" width="356" height="68" fill="#0e1a5b" />
      <text x="200" y="234" textAnchor="middle" fontFamily="Dela Gothic One" fontSize={p.name.length > 14 ? 19 : 28} fill="#ffc20e">{p.name}</text>
    </svg>
  );
}
