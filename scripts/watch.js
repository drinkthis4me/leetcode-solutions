import { spawn } from "child_process";

const target = process.argv[2];

if (!target || !/^\d{4}$/.test(target)) {
  console.error("Please provide a file name (e.g., 0001)");
  process.exit(1);
}

// spawn keeps the process alive and streams output
const child = spawn("pnpm", ["tsx", "watch", `src/${target}.ts`], {
  stdio: 'inherit',
  shell: process.platform === 'win32' // Allows command-line syntax handling
});

// Optional: Handle the child process exiting
child.on('close', (code) => {
  process.exit(code);
});