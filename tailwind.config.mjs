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
        "hbdi-blue": "#5B9BD5",
        "hbdi-green": "#70AD47",
        "hbdi-yellow": "#FFC000",
        "hbdi-red": "#E07060",
        "hbdi-blue-light": "#D6E8F7",
        "hbdi-green-light": "#D9EAD3",
        "hbdi-yellow-light": "#FFF2CC",
        "hbdi-red-light": "#F9DBDB",
      },
    },
  },
  plugins: [],
};
