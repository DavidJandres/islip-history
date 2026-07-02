// Affiliated and funding institutions shown in the footer. Names double as the
// image alt text, so they're informative (not decorative). Dimensions are the
// assets' intrinsic sizes, used by next/image to reserve space.
export interface Partner {
  name: string;
  logo: string;
  width: number;
  height: number;
}

export const partners: Partner[] = [
  // The Town of Islip seal (the circular emblem only, without the "Town of
  // Islip" wordmark) leads the band: this is the Town's own project, run by
  // the Office of the Town Historian.
  { name: "Town of Islip", logo: "/logos/town-of-islip-seal.png", width: 320, height: 320 },
  { name: "Robert D. L. Gardiner Foundation", logo: "/logos/gardiner-foundation.png", width: 252, height: 289 },
  { name: "Stony Brook University", logo: "/logos/stony-brook-university.svg", width: 250, height: 250 },
  { name: "SUNY Geneseo", logo: "/logos/suny-geneseo.svg", width: 249, height: 250 },
];
