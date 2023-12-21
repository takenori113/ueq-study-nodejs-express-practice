import { ChildProcessWithoutNullStreams, spawn } from "child_process";

export async function startServer(args: readonly string[]) {
  return new Promise<ChildProcessWithoutNullStreams>((resolve, reject) => {
    const serverProcess = spawn("node", args);
    serverProcess.stdout.on("data", () => resolve(serverProcess));
    serverProcess.stderr.on("data", (data) => reject(data.toString()));
  });
}
