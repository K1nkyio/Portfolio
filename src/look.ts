// Each project is drawn as a printed kanga cloth: a border, a motif and a colour set.
export type Motif = "rings" | "diamonds" | "dots" | "waves";
const Y = "#ffc20e", I = "#0e1a5b", P = "#e5107a", G = "#0a8f5b", C = "#fff6d8";
export const look: Record<string, { motif: Motif; c: [string, string, string] }> = {
  "savvy-wallet": { motif: "rings", c: [Y, I, P] },
  zetechverse: { motif: "diamonds", c: [P, C, I] },
  chronixx: { motif: "waves", c: [G, C, Y] },
  kodi: { motif: "dots", c: [I, Y, P] },
  rammarts: { motif: "diamonds", c: [C, I, G] },
  "expert-giggle": { motif: "rings", c: [I, C, G] },
  "student-blog": { motif: "dots", c: [C, P, G] },
  "resume-analyzer": { motif: "waves", c: [P, Y, I] },
};
