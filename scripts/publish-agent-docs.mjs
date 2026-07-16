import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsRoot = fileURLToPath(new URL("..", import.meta.url));
const buildRoot = resolve(docsRoot, ".vitepress", "dist");
const sourceyRoot = resolve(buildRoot, "swift-api");

const guideIndex = `## Integration guides

- [Installation and setup](https://github.com/wild-edge/wildedge-swift#getting-started)
- [Registering and tracking models](https://github.com/wild-edge/wildedge-swift#4-track-model-load-and-inferences)
- [Event and output metadata](https://github.com/wild-edge/wildedge-swift#output-metadata)
- [Queueing and transmission behavior](https://github.com/wild-edge/wildedge-swift#configuration)
- [Runnable examples](https://github.com/wild-edge/wildedge-swift#examples)
`;

for (const filename of ["llms.txt", "llms-full.txt"]) {
  const sourcePath = resolve(sourceyRoot, filename);
  let content = await readFile(sourcePath, "utf8");
  content = content.replaceAll("](/", "](https://docs.wildedge.dev/");
  if (filename === "llms.txt") {
    content = content.replace("## Swift API", `${guideIndex}\n## Swift API`);
  }
  await writeFile(sourcePath, content, "utf8");
  await writeFile(resolve(buildRoot, filename), content, "utf8");
}

console.log("Published Sourcey llms.txt files at the documentation root.");
