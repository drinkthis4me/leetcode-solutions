# LeetCode Solutions & Algorithm Practice

This repository houses solutions to various algorithm and data structure problems, sourced from LeetCode, organized for clarity, consistency, and efficient review.

## Naming Convention

All problem files must be 4-digit ID:

Example: `0001.ts`

The 4-digit ID ensures correct numerical sorting of files within the topic folders.

## TypeScript Environment Setup

This project uses `tsx` to run TypeScript files directly without a manual compilation step, and includes the `datastructures-js` library for convenient use of custom data structures.

### Prerequisites

Install the project dependencies:

```bash
pnpm install
```

### Solution Files
All solution files are located in `/src/` folder.

### Running a Solution

Use the `start` script to execute any TypeScript file. You need to provide the file slug (ID) as the environment variable.

To run `0001.ts`:

```bash
FILE=0001 pnpm start
```

To watch file change on `0001.ts`:
```bash
FILE=0001 pnpm watch
```
