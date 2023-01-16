import { defineConfig } from "astro/config";
import eslint from "vite-plugin-eslint";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import netlify from "@astrojs/netlify/edge-functions";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind(), prefetch()],
  output: "server",
  plugins: [eslint()],
  // Use node adapter for local development
  // adapter: node({
  //   mode: 'standalone'
  // }),
  adapter: netlify(),
});
