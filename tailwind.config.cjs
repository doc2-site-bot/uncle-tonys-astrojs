/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "*": {
              color: theme("colors.white"),
            },
            "footer *": {
              color: theme("colors.black"),
            },
          },
        },
      }),
    },
  },
};
