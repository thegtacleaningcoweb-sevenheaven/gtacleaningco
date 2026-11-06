// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/data/site.ts";
import { checklists } from "./src/data/checklists.ts";
import { policiesPdf } from "./src/data/policies.ts";

export default defineConfig({
  site: site.url,
  adapter: vercel({
    imageService: false,
  }),
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  compressHTML: true,
  trailingSlash: "never",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      customPages: [...checklists.map((item) => new URL(item.pdf, site.url).href), new URL(policiesPdf.href, site.url).href],
    }),
  ],
});
