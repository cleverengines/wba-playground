/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "wba-deep": "#1b263e",
        "wba-blue": "#284c6f",
        "wba-teal": "#64a5bf",
        "wba-red": "#c14955",
        "wba-canvas": "#eef0f1",
      },
    },
  },
  plugins: [],
};
