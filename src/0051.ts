// 51. N-Queens

/**
 * Backtrack /w Hash Set
 * T: O(n * n!); S: O(n ^ 2);
 */
function solveNQueens(n: number): string[][] {
  const res: string[][] = []
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'))

  // Conditions
  const cols = new Set<number>()
  const posDiag = new Set<number>()
  const negDiag = new Set<number>()

  const backtrack = (r: number) => {
    if (r === n) {
      res.push(board.map(row => row.join('')))
    }

    for (let c = 0; c < n; c++) {
      const posDiagIdx = c + r
      const negDiagIdx = c - r
      if (cols.has(c) || posDiag.has(posDiagIdx) || negDiag.has(negDiagIdx)) {
        continue
      }

      board[r][c] = 'Q'
      cols.add(c)
      posDiag.add(c + r)
      negDiag.add(c - r)

      backtrack(r + 1)

      board[r][c] = '.'
      cols.delete(c)
      posDiag.delete(c + r)
      negDiag.delete(c - r)
    }
  }

  backtrack(0)

  return res
};

/**
 * Backtrack /w Boolean Array
 * T: O(n * n!); S: O(n ^ 2);
 */
function solveNQueens2(n: number): string[][] {
  const res: string[][] = []
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'))

  // Conditions
  const cols = new Array(n).fill(false)
  const posDiag = new Array(2 * n - 1).fill(false)
  const negDiag = new Array(2 * n - 1).fill(false)

  const backtrack = (r: number) => {
    if (r === n) {
      res.push(board.map(row => row.join('')))
    }

    for (let c = 0; c < n; c++) {
      const posDiagIdx = r + c
      const negDiagIdx = r - c + (n - 1)
      if (cols[c] || posDiag[posDiagIdx] || negDiag[negDiagIdx]) {
        continue
      }

      board[r][c] = 'Q'
      cols[c] = true
      posDiag[posDiagIdx] = true
      negDiag[negDiagIdx] = true

      backtrack(r + 1)

      board[r][c] = '.'
      cols[c] = false
      posDiag[posDiagIdx] = false
      negDiag[negDiagIdx] = false

    }
  }

  backtrack(0)

  return res
};

/**
 * Backtrack /w Bit Mask
 * T: O(n * n!); S: O(n ^ 2);
 */
function solveNQueens3(n: number): string[][] {
  const res: string[][] = []
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'))

  // Conditions
  let cols = 0 // total: 1 << n
  let posDiag = 0 // total: 1 << (2 * n - 1)
  let negDiag = 0 // total: 1 << (2 * n - 1)

  const backtrack = (r: number) => {
    if (r === n) {
      res.push(board.map(row => row.join('')))
    }

    for (let c = 0; c < n; c++) {
      const colMask = 1 << c
      const posDiagMask = 1 << c + r
      const negDiagMask = 1 << (r - c + (n - 1))
      if (
        (cols & colMask) > 0 ||
        (posDiag & posDiagMask) > 0 ||
        (negDiag & negDiagMask) > 0
      ) {
        continue
      }

      board[r][c] = 'Q'
      cols ^= colMask
      posDiag ^= posDiagMask
      negDiag ^= negDiagMask

      backtrack(r + 1)

      board[r][c] = '.'
      cols ^= colMask
      posDiag ^= posDiagMask
      negDiag ^= negDiagMask

    }
  }

  backtrack(0)

  return res
};

type SolveNQueens = (n: number) => string[][];

function runTester(solveFn: SolveNQueens) {
  const testCases = [
    {
      n: 1,
      expected: [["Q"]]
    },
    {
      n: 4,
      expected: [
        [".Q..", "...Q", "Q...", "..Q."],
        ["..Q.", "Q...", "...Q", ".Q.."]
      ]
    }
  ];

  /**
   * Helper to normalize and compare results.
   * Since order doesn't matter, we sort the boards and the internal rows.
   */
  function areResultsEqual(result: string[][], expected: string[][]): boolean {
    if (result.length !== expected.length) return false;

    const serialize = (arr: string[][]) =>
      arr.map(board => board.join('')).sort();

    const resSorted = serialize(result);
    const expSorted = serialize(expected);

    return resSorted.every((val, idx) => val === expSorted[idx]);
  }

  console.log(`Running tests for: ${solveFn.name || 'Anonymous Function'}\n`);

  testCases.forEach(({ n, expected }, index) => {
    const start = performance.now();
    const result = solveFn(n);
    const end = performance.now();

    const passed = areResultsEqual(result, expected);

    console.log(`Test Case ${index + 1} (n=${n}):`);
    console.log(`  Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`  Time: ${(end - start).toFixed(4)}ms`);

    if (!passed) {
      console.log(`  Expected:`, JSON.stringify(expected));
      console.log(`  Received:`, JSON.stringify(result));
    }
    console.log('-----------------------------------');
  });
}

runTester(solveNQueens3);
