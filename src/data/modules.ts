export interface Module {
  n: number;
  id: string;
  title: string;
  section: number;
  slug: string;
}

export interface Section {
  n: number;
  title: string;
}

export const sections: Section[] = [
  { n: 1, title: "Foundations" },
  { n: 2, title: "Brand Building Blocks" },
  { n: 3, title: "Workshop Tools" },
];

export const modules: Module[] = [
  { n: 1,  id: "S-m6vc_Xf0Q", title: "The Power Of Your Brand",              section: 1, slug: "module-1"  },
  { n: 2,  id: "8Osa1zf4DBE", title: "What is a Brand",                       section: 1, slug: "module-2"  },
  { n: 3,  id: "ogwRCYRWeDw", title: "Why Brands Matter More Than Ever",       section: 1, slug: "module-3"  },
  { n: 4,  id: "040HTwT3Ga0", title: "Whole Brain Thinking",                   section: 1, slug: "module-4"  },
  { n: 5,  id: "8hFcxTWyKig", title: "Whole Brand Thinking",                   section: 1, slug: "module-5"  },
  { n: 6,  id: "ffQD0h8qvIc", title: "Rational & Emotional Engagement",        section: 1, slug: "module-6"  },
  { n: 7,  id: "GlW16hvqzv8", title: "Higher Purpose",                         section: 2, slug: "module-7"  },
  { n: 8,  id: "55Gi-DNVg0E", title: "Brand Promise",                          section: 2, slug: "module-8"  },
  { n: 9,  id: "PQoJw4TlHXs", title: "Brand on a Page",                        section: 2, slug: "module-9"  },
  { n: 10, id: "8dkwsDIZcdc", title: "Brand Symmetry",                         section: 2, slug: "module-10" },
  { n: 11, id: "94nCnQRdxLA", title: "Brand Touchpoints",                      section: 2, slug: "module-11" },
  { n: 12, id: "LaMwlHwtFj8", title: "Workshop Overview",                      section: 3, slug: "module-12" },
  { n: 13, id: "BSIhfm9_vkg", title: "Workshop Tool: Brand Belief",            section: 3, slug: "module-13" },
  { n: 14, id: "paH8eWKPmxs", title: "Workshop Tool: Brand Star",              section: 3, slug: "module-14" },
  { n: 15, id: "36WBkp9nsNA", title: "Workshop Tool: Brand Trajectory",        section: 3, slug: "module-15" },
  { n: 16, id: "sJWQrX3Piwg", title: "Workshop Tool: Brand Archetypes",        section: 3, slug: "module-16" },
  { n: 17, id: "EBJEYo9JFcw", title: "Workshop Tool: Claim, Value, Proof",     section: 3, slug: "module-17" },
  { n: 18, id: "dasFYV8WA3w", title: "Workshop Tool: The 5 Whys",              section: 3, slug: "module-18" },
  { n: 19, id: "dhgaS6zpcEA", title: "Whole Brain Branding Review",            section: 3, slug: "module-19" },
  { n: 20, id: "wO2I-EULLFA", title: "Whole Brand Exercises",                  section: 3, slug: "module-20" },
];

export const sectionLabels: Record<number, string> = {
  1: "Foundations",
  2: "Brand Building Blocks",
  3: "Workshop Tools",
};
