import { execSync } from "child_process";

const target = process.argv[2];

if (!target) {
  console.error("Please provide a file name (e.g., 0001)");
  process.exit(1);
}

execSync(`tsx src/${target}.ts`, { stdio: 'inherit' });