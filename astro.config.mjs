// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/data/site.ts";
import { checklists } from "./src/data/checklists.ts";

export default defineConfig({
  site: site.url,
  adapter: vercel({ imageService: false }),
  compressHTML: true,
  trailingSlash: "never",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      customPages: checklists.map((item) => new URL(item.pdf, site.url).href),
    }),
  ],
});
