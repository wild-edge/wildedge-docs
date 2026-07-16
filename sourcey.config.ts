import { readdirSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, markdown } from "sourcey";

const docsRoot = fileURLToPath(new URL(".", import.meta.url));
const generatedRoot = resolve(docsRoot, "sourcey-pages");

const generatedPages = readdirSync(generatedRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => relative(docsRoot, resolve(generatedRoot, entry.name)))
  .map((page) => page.replaceAll("\\", "/").replace(/\.md$/, ""))
  .sort((left, right) => left.localeCompare(right));

export default defineConfig({
  name: "WildEdge Swift SDK",
  description:
    "Source-mapped public API documentation generated from the WildEdge Swift SDK.",
  siteUrl: "https://docs.wildedge.dev",
  baseUrl: "/swift-api",
  prettyUrls: "slash",
  repo: "https://github.com/wild-edge/wildedge-swift",
  navigation: {
    tabs: [
      {
        tab: "Swift API",
        slug: "api",
        source: markdown({
          groups: [
            {
              group: "Overview",
              pages: ["sourcey-overview"],
            },
            {
              group: "Source files",
              pages: generatedPages,
            },
          ],
        }),
      },
    ],
  },
  navbar: {
    links: [
      {
        type: "link",
        label: "Main documentation",
        href: "https://docs.wildedge.dev/",
      },
    ],
  },
});
