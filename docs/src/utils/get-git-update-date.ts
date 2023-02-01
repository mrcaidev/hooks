import { spawn } from "cross-spawn";

export async function getGitUpdateDate(file: string) {
  return new Promise<Date>((resolve, reject) => {
    const child = spawn("git", ["log", "-1", "--format=%ci", file]);
    let stdout = "";

    child.stdout.on("data", (data) => {
      stdout += data;
    });

    child.on("close", () => {
      resolve(stdout ? new Date(stdout) : new Date());
    });

    child.on("error", reject);
  });
}
