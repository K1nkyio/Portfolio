import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const node = process.execPath;
const viteArgs = [resolve(root, "node_modules/vite/bin/vite.js"), ...process.argv.slice(2)];
const children = [
  spawn(node, [resolve(root, "server/index.js")], { cwd: root, stdio: "inherit" }),
  spawn(node, viteArgs, { cwd: root, stdio: "inherit" }),
];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) if (!child.killed) child.kill();
  process.exitCode = code;
}

for (const child of children) {
  child.on("error", (error) => { console.error("Could not start development service:", error.message); stop(1); });
  child.on("exit", (code) => { if (!stopping && code !== 0) stop(code || 1); });
}
process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
