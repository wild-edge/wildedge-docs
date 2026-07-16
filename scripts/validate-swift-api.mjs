import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsRoot = fileURLToPath(new URL("..", import.meta.url));
const buildRoot = resolve(docsRoot, ".vitepress", "dist");
const generatedRoot = resolve(docsRoot, "sourcey-pages");
const manifest = JSON.parse(
  await readFile(resolve(generatedRoot, "manifest.json"), "utf8"),
);

if (manifest.declarationCount < 15) {
  throw new Error(`Expected at least 15 public declarations; found ${manifest.declarationCount}.`);
}

if (manifest.pages.length < 3) {
  throw new Error(`Expected at least 3 source pages; found ${manifest.pages.length}.`);
}

for (const filename of [
  "llms.txt",
  "llms-full.txt",
  "swift-api/index.html",
  "swift-api/llms.txt",
  "swift-api/llms-full.txt",
]) {
  await access(resolve(buildRoot, filename));
}

const llms = await readFile(resolve(buildRoot, "llms.txt"), "utf8");
if (!llms.includes("https://docs.wildedge.dev/swift-api")) {
  throw new Error("Root llms.txt does not point at the project-owned Swift API site.");
}

for (const expectedGuide of [
  "#getting-started",
  "#4-track-model-load-and-inferences",
  "#output-metadata",
  "#configuration",
  "#examples",
]) {
  if (!llms.includes(expectedGuide)) {
    throw new Error(`Root llms.txt is missing the expected guide link: ${expectedGuide}`);
  }
}

const generatedFiles = await readdir(generatedRoot);
const markdownFiles = generatedFiles.filter((filename) => filename.endsWith(".md"));
let pinnedSourceLinks = 0;

for (const filename of markdownFiles) {
  const markdown = await readFile(resolve(generatedRoot, filename), "utf8");
  pinnedSourceLinks += markdown.split(
    `https://github.com/${manifest.sdkRepo}/blob/${manifest.sdkCommit}/`,
  ).length - 1;
}

if (pinnedSourceLinks < manifest.declarationCount) {
  throw new Error(
    `Expected at least ${manifest.declarationCount} pinned source links; found ${pinnedSourceLinks}.`,
  );
}

console.log(
  `Validated ${manifest.declarationCount} declarations, ${manifest.pages.length} pages, ` +
    `${pinnedSourceLinks} pinned source links, and project-root llms.txt outputs.`,
);
