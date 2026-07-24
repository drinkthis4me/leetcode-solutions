// 70. Climbing Stairs

/**
 * Backtrack
 * T: O(2^n); S: O(n);
 */
function climbStairs(n: number): number {
  let res = 0

  if (n <= 0) return res

  const backtrack = (curr: number): void => {
    if (curr === n) {
      res++
      return
    }
    if (curr > n) return

    for (let i = 1; i <= 2; i++) {
      curr += i
      backtrack(curr)
      curr -= i
    }
  }

  backtrack(0)

  return res
};

/**
 * Recursion
 * T: O(2^n); S: O(n);
 */
function climbStairs2(n: number): number {
  const dfs = (i: number): number => {
    if (i >= n) {
      return i === n ? 1 : 0
    }

    return dfs(i + 1) + dfs(i + 2)
  }

  return dfs(0)
};

/**
 * DP (Top-down)
 * T: O(n); S: O(n);
 */
function climbStairs3(n: number): number {
  const cache = new Int32Array(n).fill(-1)

  const dfs = (i: number): number => {
    if (i >= n) {
      return i === n ? 1 : 0
    }

    // Use previous cached value to prevent repeat work
    if (cache[i] !== -1) return cache[i]

    cache[i] = dfs(i + 1) + dfs(i + 2)

    return cache[i]
  }

  return dfs(0)
};

/**
 * DP (Bottom-up)
 * T: O(n); S: O(n);
 */
function climbStairs4(n: number): number {
  if (n <= 2) return n

  // DP array that stores sub problem results
  const dp = new Int32Array(n + 1).fill(-1)

  // Last step and second to last step always have 1 way
  dp[0] = 1
  dp[1] = 1

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
};

/**
 * DP (Bottom-up, Space Optimized)
 * T: O(n); S: O(1);
 */
function climbStairs5(n: number): number {
  // Instead of storing all values in DP array,
  // keep/reuse two variables.

  let prev = 1
  let curr = 1

  for (let i = 0; i < n - 1; i++) {
    const temp = curr
    curr = prev + curr
    prev = temp
  }

  return curr
};

/**
 * Tester for LeetCode 70: Climbing Stairs
 * * @param solution - The function to test, expected to take a number (n)
 * and return a number (ways to climb).
 */
function runTests(solution: (n: number) => number): void {
  const testCases = [
    { n: 1, expected: 1 },
    { n: 2, expected: 2 },
    { n: 3, expected: 3 },
    { n: 4, expected: 5 },
    { n: 5, expected: 8 },
    { n: 10, expected: 89 },
    { n: 45, expected: 1836311903 }
  ]

  console.log('--- Running Tests for LeetCode 70 ---')

  testCases.forEach(({ n, expected }, index) => {
    const start = performance.now()
    const result = solution(n)
    const end = performance.now()

    const passed = result === expected
    const status = passed ? '✅ PASS' : '❌ FAIL'

    console.log(
      `${status} | Case ${index + 1}: n=${n} ` +
      `| Expected: ${expected}, Got: ${result} ` +
      `| Time: ${(end - start).toFixed(4)}ms`
    )
  })

  console.log('--- Testing Complete ---')
}

runTests(climbStairs4)
