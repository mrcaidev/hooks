import { existsSync, readdirSync, rmSync } from "fs";

removeRedundantDts();

function removeRedundantDts() {
  const outDir = "dist";

  if (!existsSync(outDir)) {
    console.warn("Output directory not found, skipping script.");
    return;
  }

  readdirSync(outDir)
    .filter((file) => file.endsWith(".d.ts") && !file.startsWith("index"))
    .forEach((file) => rmSync(`${outDir}/${file}`));
}
