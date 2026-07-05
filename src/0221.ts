// 221. Maximal Square

/**
 * DP (Top-down)
 * T: O(m * n); S: (m * n);
 */
function maximalSquare(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0]?.length || 0

  if (m === 0 || n === 0) return 0

  // A memoization table with -1 as unvisited
  const dp = Array.from({ length: m }, () => Array(n).fill(-1))

  const dfs = (i: number, j: number): number => {
    if (i >= m || j >= n) return 0

    if (dp[i]![j] !== -1) return dp[i]![j]!

    const down = dfs(i + 1, j)
    const right = dfs(i, j + 1)
    const diagonal = dfs(i + 1, j + 1)

    dp[i]![j]! = 0

    if (matrix[i]![j]! === '1') {
      dp[i]![j]! = Math.min(down, right, diagonal) + 1
    }

    return dp[i]![j]!
  }

  dfs(0, 0)

  let maxSquare = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      maxSquare = Math.max(maxSquare, dp[i]![j]!)
    }
  }

  return maxSquare * maxSquare
};

/**
 * DP (Bottom-up)
 * T: O(m * n); S: (m * n);
 */
function maximalSquare2(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0]?.length || 0

  if (m === 0 || n === 0) return 0

  const dp = Array.from({ length: m }, () => Array(n).fill(0))

  let maxSquare = 0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i]![j]! === '0') continue

      let left = 0
      let down = 0
      let diag = 0

      if (i > 0) left = dp[i - 1]![j]!
      if (j > 0) down = dp[i]![j - 1]!
      if (i > 0 && j > 0) diag = dp[i - 1]![j - 1]!

      dp[i]![j]! = Math.min(left, down, diag) + 1
      maxSquare = Math.max(maxSquare, dp[i]![j]!)
    }
  }

  return maxSquare * maxSquare
};

/**
 * DP (Bottom-up w/ padded row and column)
 * T: O(m * n); S: (m * n);
 */
function maximalSquare3(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0]?.length || 0

  if (m === 0 || n === 0) return 0

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  let maxSquare = 0

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (matrix[i]![j]! === '0') continue

      dp[i]![j]! = Math.min(
        dp[i + 1]![j]!, // down
        dp[i]![j + 1]!, // right
        dp[i + 1]![j + 1]!, // diagonal
      ) + 1
      maxSquare = Math.max(maxSquare, dp[i]![j]!)
    }
  }

  return maxSquare * maxSquare
};

/**
 * DP (Bottom-up w/ Space Optimized)
 * T: O(m * n); S: (n);
 */
function maximalSquare4(matrix: string[][]): number {
  const m = matrix.length
  const n = matrix[0]?.length || 0

  if (m === 0 || n === 0) return 0

  // DP array for the last processed row
  const dp: number[] = Array(n + 1).fill(0)
  let prevDiag = 0
  let maxSquare = 0


  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const temp = dp[j]!

      if (matrix[i]![j]! === '1') {
        dp[j] = Math.min(dp[j]!, dp[j + 1]!, prevDiag) + 1
        maxSquare = Math.max(maxSquare, dp[j]!)
      } else {
        dp[j] = 0
      }

      prevDiag = temp
    }
  }

  return maxSquare * maxSquare
};

// --- Tester ---
function runTests(maximalSquareFn: (matrix: string[][]) => number) {
  const testCases = [
    {
      input: [['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']],
      expected: 4
    },
    {
      input: [['0', '1'], ['1', '0']],
      expected: 1
    },
    {
      input: [['0']],
      expected: 0
    },
    {
      input: [['1', '1'], ['1', '1']],
      expected: 4
    },
  ]
  testCases.forEach((test, index) => {
    const result = maximalSquareFn(test.input)
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'PASSED' : 'FAILED'}`)
    if (result !== test.expected) {
      console.log(`   Expected ${test.expected}, but got ${result}`)
    }
  })
};

runTests(maximalSquare3)
