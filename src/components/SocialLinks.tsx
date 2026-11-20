import { site } from "../data";

const brand = {
  GitHub: { color: "#181717", svg: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" /> },
  LinkedIn: { color: "#0A66C2", svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.55V9h3.569zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
  Instagram: { color: "#C13584", svg: <><rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="17.7" cy="6.4" r="1.2" /></> },
};
const links = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
] as const;

export default function SocialLinks() {
  return <div className="flex items-center gap-3">
    {links.map(({ label, href }) => href && <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="rounded-full p-1 transition-transform hover:-translate-y-0.5 focus-visible:outline-2">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill={label === "Instagram" ? "currentColor" : brand[label].color} style={{ color: brand[label].color }}>{brand[label].svg}</svg>
    </a>)}
  </div>;
}
