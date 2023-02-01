import { spawn } from "cross-spawn";

export async function getGitUpdateDate(file: string) {
  return new Promise<Date>((resolve, reject) => {
    const child = spawn("git", ["log", "-1", "--format=%ci", file]);
    let stdout = "";

    child.stdout.on("data", (data) => {
      stdout += data;
    });

    child.on("close", () => {
      resolve(new Date(stdout));
    });

    child.on("error", reject);
  });
}
