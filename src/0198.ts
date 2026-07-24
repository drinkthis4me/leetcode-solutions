// 198. House Robber

/**
 * Recursion
 * T: O(2^n); S: O(n);
 */
function rob(nums: number[]): number {
  const dfs = (i: number): number => {
    if (i >= nums.length) return 0

    return Math.max(
      nums[i] + dfs(i + 2), // Rob (and skip next)
      dfs(i + 1)            // Skip
    )
  }

  return dfs(0)
};

/**
 * DP (Top-down)
 * T: O(n); S: O(n);
 */
function rob2(nums: number[]): number {
  const n = nums.length
  const memo = new Array(n + 1).fill(-1)

  const dfs = (i: number): number => {
    if (i >= n) return 0

    if (memo[i] !== -1) {
      return memo[i]
    }

    memo[i] = Math.max(nums[i] + dfs(i + 2), dfs(i + 1))

    return memo[i]
  }

  return dfs(0)
};

/**
 * DP (Bottom-up)
 * T: O(n); S: O(n);
 */
function rob3(nums: number[]): number {
  const n = nums.length

  if (n === 0) return 0
  if (n === 1) return nums[0]

  const dp = new Array(n).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2])
  }

  return dp[n - 1]
};

/**
 * DP (Bottom-up. Optimized)
 * T: O(n); S: O(1);
 */
function rob4(nums: number[]): number {
  const n = nums.length

  if (n === 0) return 0
  if (n === 1) return nums[0]

  let prev1 = 0
  let prev2 = 0

  for (const num of nums) {
    const temp = prev1
    prev1 = Math.max(prev1, num + prev2)
    prev2 = temp
  }

  return prev1
};

/**
 * Test runner for LeetCode 198: House Robber
 * @param solution - The function to be tested
 */
function runTests(solution: (nums: number[]) => number): void {
  const testCases = [
    { nums: [1, 2, 3, 1], expected: 4 },
    { nums: [2, 7, 9, 3, 1], expected: 12 },
    { nums: [0], expected: 0 },
    { nums: [2, 1, 1, 2], expected: 4 },
    { nums: [1, 2], expected: 2 },
    { nums: [1, 2, 3], expected: 4 },
    { nums: [1, 3, 1, 3, 100], expected: 103 }
  ]

  console.log('Running tests for House Robber...\n')

  testCases.forEach((test, index) => {
    const result = solution(test.nums)
    const passed = result === test.expected

    console.log(`Test Case ${index + 1}:`)
    console.log(`  Input:    [${test.nums.join(', ')}]`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Actual:   ${result}`)
    console.log(`  Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('----------------------------')
  })
}

// Example usage:
runTests(rob4)
