import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsRoot = fileURLToPath(new URL("..", import.meta.url));
const outputRoot = resolve(docsRoot, "sourcey-pages");

const sdkRepo = "wild-edge/wildedge-swift";
const sdkCommit = "bf96ab894d83b72884dc8d44a065a36d1c5f0376";
const sourceFiles = [
  "AttachmentConsumer.swift",
  "AttachmentQueue.swift",
  "AttachmentTransmitter.swift",
  "BlobStore+Dictionary.swift",
  "BlobStore.swift",
  "Config.swift",
  "Consumer.swift",
  "CoreTypes.swift",
  "DeviceInfo.swift",
  "EventQueue.swift",
  "Events.swift",
  "ExecuTorchLLMInterceptor.swift",
  "HardwareDetection.swift",
  "HardwareSampler.swift",
  "IntegrationUtils.swift",
  "MLKitDetectorInterceptor.swift",
  "MLKitModelManagerInterceptor.swift",
  "ModelHandle.swift",
  "ModelRegistry.swift",
  "NoopWildEdgeClient.swift",
  "ORTInterceptor.swift",
  "SpanContext.swift",
  "TFLInterceptor.swift",
  "Transmitter.swift",
  "WildEdge.swift",
  "WildEdgeAutoLoader.swift",
];

const declarationPattern = /^\s*public\s+(?:(?:class|convenience|final|indirect|mutating|nonisolated|override|required|static)\s+)*(actor|class|enum|func|init|let|protocol|struct|subscript|typealias|var)\b/;

function count(text, character) {
  return [...text].filter((candidate) => candidate === character).length;
}

function declarationName(kind, signature) {
  if (kind === "init" || kind === "subscript") return kind;

  const match = signature.match(
    new RegExp(`\\b${kind}\\s+([A-Za-z_][A-Za-z0-9_]*)`),
  );
  return match?.[1] ?? kind;
}

function precedingDocumentation(lines, declarationLine) {
  const documentation = [];

  for (let index = declarationLine - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (!line.startsWith("///")) break;
    documentation.unshift(line.replace(/^\/\/\/\s?/, ""));
  }

  return documentation.join(" ").trim();
}

function extractPublicDeclarations(source) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const declarations = [];

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(declarationPattern);
    if (!match) continue;

    const kind = match[1];
    const signatureLines = [lines[index].trim()];
    let parentheses = count(lines[index], "(") - count(lines[index], ")");

    for (let offset = 1; parentheses > 0 && offset < 30; offset += 1) {
      const continuation = lines[index + offset];
      if (continuation === undefined) break;
      signatureLines.push(continuation.trim());
      parentheses += count(continuation, "(") - count(continuation, ")");
    }

    const signature = signatureLines.join("\n");
    declarations.push({
      documentation: precedingDocumentation(lines, index),
      kind,
      line: index + 1,
      name: declarationName(kind, signature),
      signature,
    });
  }

  return declarations;
}

function slugFor(filename) {
  return basename(filename, ".swift")
    .replaceAll("+", "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function markdownFor(filename, declarations) {
  const sourcePath = `Sources/WildEdge/${filename}`;
  const sourceUrl = `https://github.com/${sdkRepo}/blob/${sdkCommit}/${sourcePath}`;
  const sections = declarations.map((declaration) => {
    const documentation = declaration.documentation ||
      "No public documentation comment is present at this declaration.";
    const lineUrl = `${sourceUrl}#L${declaration.line}`;

    return `## ${declaration.name}

${documentation}

**Kind:** ${declaration.kind}  
**Source:** [${sourcePath}:${declaration.line}](${lineUrl})

\`\`\`swift
${declaration.signature}
\`\`\`
`;
  });

  return `# ${basename(filename, ".swift")}

Generated from [${sourcePath}](${sourceUrl}) at pinned SDK commit
\`${sdkCommit}\`. This page documents ${declarations.length} public declarations.

${sections.join("\n")}`;
}

function git(...arguments_) {
  return execFileSync("git", arguments_, { encoding: "utf8", stdio: "pipe" }).trim();
}

function isPinnedCheckout(directory) {
  if (!existsSync(directory)) return false;
  try {
    return git("-C", directory, "rev-parse", "HEAD") === sdkCommit;
  } catch {
    return false;
  }
}

async function resolveSdkRoot() {
  const requestedRoot = process.env.WILDEDGE_SWIFT_SOURCE;
  if (requestedRoot) {
    const resolvedRoot = resolve(requestedRoot);
    if (!isPinnedCheckout(resolvedRoot)) {
      throw new Error(
        `WILDEDGE_SWIFT_SOURCE must be checked out at ${sdkCommit}: ${resolvedRoot}`,
      );
    }
    return resolvedRoot;
  }

  const siblingRoot = resolve(docsRoot, "..", "wildedge-swift");
  if (isPinnedCheckout(siblingRoot)) return siblingRoot;

  const checkoutRoot = resolve(docsRoot, ".sourcey-sdk");
  if (!isPinnedCheckout(checkoutRoot)) {
    await rm(checkoutRoot, { force: true, recursive: true });
    await mkdir(checkoutRoot, { recursive: true });
    git("-C", checkoutRoot, "init", "--quiet");
    git(
      "-C",
      checkoutRoot,
      "remote",
      "add",
      "origin",
      `https://github.com/${sdkRepo}.git`,
    );
    git("-C", checkoutRoot, "fetch", "--depth", "1", "origin", sdkCommit);
    git("-C", checkoutRoot, "checkout", "--quiet", "--detach", "FETCH_HEAD");
  }
  return checkoutRoot;
}

await rm(outputRoot, { force: true, recursive: true });
await mkdir(outputRoot, { recursive: true });
const sdkRoot = await resolveSdkRoot();

const pages = [];
let declarationCount = 0;

for (const filename of sourceFiles) {
  const sourcePath = `Sources/WildEdge/${filename}`;
  const declarations = extractPublicDeclarations(
    await readFile(resolve(sdkRoot, sourcePath), "utf8"),
  );
  if (declarations.length === 0) continue;

  const slug = slugFor(filename);
  await writeFile(
    resolve(outputRoot, `${slug}.md`),
    markdownFor(filename, declarations),
    "utf8",
  );
  pages.push({ declarations: declarations.length, filename, slug });
  declarationCount += declarations.length;
}

const index = `# Swift API source index

This inventory was generated from \`${sdkRepo}\` at commit \`${sdkCommit}\`.
It contains ${declarationCount} public declarations across ${pages.length} source files.

${pages.map((page) => `- [${page.filename}](./${page.slug}) — ${page.declarations} declarations`).join("\n")}
`;

await writeFile(resolve(outputRoot, "index.md"), index, "utf8");
await writeFile(
  resolve(outputRoot, "manifest.json"),
  `${JSON.stringify({ declarationCount, pages, sdkCommit, sdkRepo }, null, 2)}\n`,
  "utf8",
);

console.log(
  `Generated ${declarationCount} public declarations across ${pages.length} Sourcey pages from ${sdkCommit}.`,
);
