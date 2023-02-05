import glob from "fast-glob";
import { rm } from "fs/promises";
import { normalizePath } from "vite";

export async function removeRedundantDts() {
  const files = await glob("*.d.ts", {
    cwd: "dist",
    ignore: ["!index.d.ts"],
  });
  files.forEach((file) => rm(normalizePath(`dist/${file}`)));
}
