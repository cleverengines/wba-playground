export interface Module {
  n: number;
  id: string;
  title: string;
  section: number;
  slug: string;
  desc: string;
  duration: string;
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
  { n: 1,  id: "S-m6vc_Xf0Q", title: "The Power Of Your Brand",              section: 1, slug: "module-1",  duration: "9:36",  desc: "Why brand thinking is the most underutilised lever in business — and what changes when you finally get it right." },
  { n: 2,  id: "8Osa1zf4DBE", title: "What is a Brand",                       section: 1, slug: "module-2",  duration: "16:14", desc: "The real definition of brand, beyond logo and colour. Understand what actually makes a brand work — and why most get it wrong." },
  { n: 3,  id: "ogwRCYRWeDw", title: "Why Brands Matter More Than Ever",       section: 1, slug: "module-3",  duration: "6:52",  desc: "How the market has shifted and why brand is now the last sustainable competitive advantage in a world of commoditised products." },
  { n: 4,  id: "040HTwT3Ga0", title: "Whole Brain Thinking",                   section: 1, slug: "module-4",  duration: "13:43", desc: "An introduction to the Herrmann Brain Dominance Instrument (HBDI) — how the brain processes information, and why it matters for brand strategy." },
  { n: 5,  id: "8hFcxTWyKig", title: "Whole Brand Thinking",                   section: 1, slug: "module-5",  duration: "11:54", desc: "Applying whole brain thinking to brand. How the four thinking quadrants map to brand elements and why this changes everything." },
  { n: 6,  id: "ffQD0h8qvIc", title: "Rational & Emotional Engagement",        section: 1, slug: "module-6",  duration: "9:15",  desc: "How great brands activate rational and emotional responses simultaneously — and why most brands only ever hit one side of the brain." },
  { n: 7,  id: "GlW16hvqzv8", title: "Higher Purpose",                         section: 2, slug: "module-7",  duration: "12:29", desc: "Why brands need a reason for being that goes beyond the product. How to find and articulate a purpose that genuinely drives decisions." },
  { n: 8,  id: "55Gi-DNVg0E", title: "Brand Promise",                          section: 2, slug: "module-8",  duration: "11:24", desc: "What a genuine brand promise is and is not. How to articulate the commitment your brand makes — and actually keep it." },
  { n: 9,  id: "PQoJw4TlHXs", title: "Brand on a Page",                        section: 2, slug: "module-9",  duration: "9:10",  desc: "Distilling your entire brand strategy into one clear, usable document. The framework that keeps every decision aligned." },
  { n: 10, id: "8dkwsDIZcdc", title: "Brand Symmetry",                         section: 2, slug: "module-10", duration: "9:00",  desc: "How all brand elements work together — or quietly undermine each other. The concept of consistency across every rational and emotional touchpoint." },
  { n: 11, id: "94nCnQRdxLA", title: "Brand Touchpoints",                      section: 2, slug: "module-11", duration: "7:50",  desc: "Every place your brand shows up. How to audit your touchpoints and close the gaps between what you promise and what people experience." },
  { n: 12, id: "LaMwlHwtFj8", title: "Workshop Overview",                      section: 3, slug: "module-12", duration: "10:35", desc: "Introduction to the seven WBA workshop tools and how to use them — whether you are working on your own brand or facilitating for a client." },
  { n: 13, id: "BSIhfm9_vkg", title: "Workshop Tool: Brand Belief",            section: 3, slug: "module-13", duration: "7:00",  desc: "Define the core belief that sits at the heart of your brand. The foundation every other brand decision gets built on." },
  { n: 14, id: "paH8eWKPmxs", title: "Workshop Tool: Brand Star",              section: 3, slug: "module-14", duration: "16:37", desc: "Map your brand across five key dimensions. Find where it is strong, where it is weak, and where the biggest opportunity lies." },
  { n: 15, id: "36WBkp9nsNA", title: "Workshop Tool: Brand Trajectory",        section: 3, slug: "module-15", duration: "6:17",  desc: "Where is your brand headed? Define your future-state brand and build a strategy that closes the gap between now and where you need to be." },
  { n: 16, id: "sJWQrX3Piwg", title: "Workshop Tool: Brand Archetypes",        section: 3, slug: "module-16", duration: "12:38", desc: "Use archetypes to define your brand personality with precision. Select the right archetype and apply it consistently across every channel." },
  { n: 17, id: "EBJEYo9JFcw", title: "Workshop Tool: Claim, Value, Proof",     section: 3, slug: "module-17", duration: "11:21", desc: "Structure your core brand proposition so it lands. The three-part framework that makes big claims credible and conversion-ready." },
  { n: 18, id: "dasFYV8WA3w", title: "Workshop Tool: The 5 Whys",              section: 3, slug: "module-18", duration: "10:32", desc: "Root cause analysis applied to brand. Get beneath the surface and find the real reason your brand exists — and why it matters." },
  { n: 19, id: "dhgaS6zpcEA", title: "Whole Brain Branding Review",            section: 3, slug: "module-19", duration: "12:59", desc: "Bring it all together. See how every module connects into a unified brand system and lock in the thinking before you apply it." },
  { n: 20, id: "wO2I-EULLFA", title: "Whole Brand Exercises",                  section: 3, slug: "module-20", duration: "14:21", desc: "Practical exercises to apply the full WBA framework to your own brand. Do the work. This is where theory becomes strategy." },
];

export const sectionLabels: Record<number, string> = {
  1: "Foundations",
  2: "Brand Building Blocks",
  3: "Workshop Tools",
};
