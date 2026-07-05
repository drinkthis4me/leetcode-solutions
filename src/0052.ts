// 52. N-Queens II

/**
 * Backtrack
 * T: O(n * n!); S: O(n ^ 2);
 */
function totalNQueens(n: number): number {
  // Build a board state with n by n array.
  // Place a queen at current position.
  // Check cell safety.
  // Backtrack and place a new queen.
  // Increment count if reaches the last cell

  let res = 0
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'))

  // Check if cell is free
  const checkCellSafety = (r: number, c: number): boolean => {
    // Rows check
    for (let i = 0; i < n; i++) {
      if (board[i][c] === 'Q') return false
    }
    // Positive diagonal check
    for (
      let i = r, j = c;
      i >= 0 && j >= 0;
      i--, j--
    ) {
      if (board[i][j] === 'Q') return false
    }
    // Negative diagonal check
    for (
      let i = r, j = c;
      i >= 0 && j < n;
      i--, j++
    ) {
      if (board[i][j] === 'Q') return false
    }


    return true
  }

  const backtrack = (r: number) => {
    if (r === n) {
      res++
      return
    }

    for (let c = 0; c < n; c++) {
      if (checkCellSafety(r, c)) {
        board[r][c] = 'Q'
        backtrack(r + 1)
        board[r][c] = '.'
      }
    }
  }

  backtrack(0)

  return res
};

/**
 * Backtrack w/ Hash Set
 * T: O(n!); S: O(n);
 */
function totalNQueens2(n: number): number {
  // Use hash set to record the details of unsafe cells

  let res = 0
  // Set of col index 
  const cols = new Set<number>()
  // Set of index i + j
  const posDiag = new Set<number>()
  // Set of index i - j
  const negDiag = new Set<number>()

  const backtrack = (r: number) => {
    if (r === n) {
      res++
      return
    }

    for (let c = 0; c < n; c++) {
      const posDiagIdx = r + c
      const negDiagIdx = r - c

      if (cols.has(c) || posDiag.has(posDiagIdx) || negDiag.has(negDiagIdx)) {
        continue
      }

      cols.add(c)
      posDiag.add(posDiagIdx)
      negDiag.add(negDiagIdx)
      backtrack(r + 1)

      cols.delete(c)
      posDiag.delete(posDiagIdx)
      negDiag.delete(negDiagIdx)
    }
  }

  backtrack(0)

  return res
};

/**
 * Backtrack w/ Boolean Array
 * T: O(n!); S: O(n);
 */
function totalNQueens3(n: number): number {
  // Use boolean array to record the details of unsafe cells
  // This is similar to hash set approach but without set overhead.

  let res = 0

  const cols = new Array(n).fill(false)
  // A n x n board has 2n-1 positive diagonal and 2n-1 negative diagonal
  const posDiag = new Array(2 * n - 1).fill(false)
  const negDiag = new Array(2 * n - 1).fill(false)

  const backtrack = (r: number) => {
    if (r === n) {
      res++
      return
    }

    for (let c = 0; c < n; c++) {
      const posDiagIdx = r + c
      const negDiagIdx = r - c + (n - 1) // Shift all by (n - 1) to keep index positive

      if (cols[c] || posDiag[posDiagIdx] || negDiag[negDiagIdx]) {
        continue
      }

      cols[c] = true
      posDiag[posDiagIdx] = true
      negDiag[negDiagIdx] = true
      backtrack(r + 1)

      cols[c] = false
      posDiag[posDiagIdx] = false
      negDiag[negDiagIdx] = false
    }
  }

  backtrack(0)

  return res
};

/**
 * Backtrack w/ Bit Mask
 * T: O(n!); S: O(n);
 */
function totalNQueens4(n: number): number {
  // Use bit mask to further improve space usage.

  let res = 0

  // Columns has 1 << n bits
  let cols = 0
  // Diagonal has 1 << (2n - 1) bits
  let posDiag = 0
  let negDiag = 0

  const backtrack = (r: number) => {
    if (r === n) {
      res++
      return
    }

    for (let c = 0; c < n; c++) {
      const colMask = 1 << c
      const posDiagMask = 1 << (r + c)
      const negDiagMask = 1 << (r - c + n - 1)

      if (
        (cols & colMask) > 0 ||
        (posDiag & posDiagMask) > 0 ||
        (negDiag & negDiagMask) > 0
      ) {
        continue
      }

      // Toggle with XOR
      cols ^= colMask
      posDiag ^= posDiagMask
      negDiag ^= negDiagMask

      backtrack(r + 1)

      cols ^= colMask
      posDiag ^= posDiagMask
      negDiag ^= negDiagMask
    }
  }

  backtrack(0)

  return res
};

/**
 * Test runner for LeetCode 52: N-Queens II
 * @param solutionFn - The function to test
 */
function testNQueensII(solutionFn: (n: number) => number): void {
  const testCases = [
    { n: 1, expected: 1 },
    { n: 2, expected: 0 },
    { n: 3, expected: 0 },
    { n: 4, expected: 2 },
    { n: 5, expected: 10 },
    { n: 8, expected: 92 },
  ];

  console.log(`Running tests for: ${solutionFn.name || 'Anonymous Function'}\n`);
  console.log("--------------------------------------------------");
  console.log("| Input (n) | Expected | Actual | Result         |");
  console.log("--------------------------------------------------");

  let passed = 0;

  for (const { n, expected } of testCases) {
    const start = performance.now();
    const actual = solutionFn(n);
    const end = performance.now();

    const isCorrect = actual === expected;
    if (isCorrect) passed++;

    const status = isCorrect ? "✅ PASS" : "❌ FAIL";

    console.log(
      `| ${n.toString().padEnd(9)} | ` +
      `${expected.toString().padEnd(8)} | ` +
      `${actual.toString().padEnd(6)} | ` +
      `${status.padEnd(14)} |`
    );
  }

  console.log("--------------------------------------------------");
  console.log(`\nSummary: ${passed}/${testCases.length} tests passed.`);
}

// Example usage:
testNQueensII(totalNQueens4);

