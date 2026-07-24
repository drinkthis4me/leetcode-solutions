// 746. Min Cost Climbing Stairs

/**
 * Recursion (TLE)
 * T: O(2^n); S: O(n);
 */
function minCostClimbingStairs(cost: number[]): number {
  const dfs = (i: number): number => {
    if (i >= cost.length) {
      return 0
    }

    const curr = cost[i]
    const next = Math.min(dfs(i + 1), dfs(i + 2))

    return curr + next
  }

  // Either starts at 0 or 1, whichever smaller
  return Math.min(dfs(0), dfs(1))
};

/**
 * DP (Top-down) (TLE)
 * T: O(n); S: O(n);
 */
function minCostClimbingStairs2(cost: number[]): number {
  const n = cost.length
  const memo = new Int16Array(n).fill(-1)

  const dfs = (i: number): number => {
    if (i >= n) return 0

    if (memo[i] !== -1) {
      return memo[i]
    }

    return cost[i] + Math.min(dfs(i + 1), dfs(i + 2))
  }

  return Math.min(dfs(0), dfs(1))
};

/**
 * DP (Bottom-up)
 * T: O(n); S: O(n);
 */
function minCostClimbingStairs3(cost: number[]): number {
  const n = cost.length
  const dp = new Array(n + 1).fill(0)

  // Last two steps always costs 0

  for (let i = 2; i <= n; i++) {
    const oneStepCost = dp[i - 1] + cost[i - 1]
    const twoStepCost = dp[i - 2] + cost[i - 2]
    dp[i] = Math.min(oneStepCost, twoStepCost)
  }

  return dp[n]
};

/**
 * DP (Bottom-up Optimized)
 * T: O(n); S: O(1);
 */
function minCostClimbingStairs4(cost: number[]): number {
  // Reuse two variables

  let prev2 = 0 // dp[i - 2]
  let prev1 = 0 // dp[i - 1]

  for (let i = 2; i <= cost.length; i++) {
    const curr = Math.min(
      prev1 + cost[i - 1],
      prev2 + cost[i - 2]
    )
    prev2 = prev1
    prev1 = curr
  }

  return prev1
};

/**
 * Test runner for LeetCode 746: Min Cost Climbing Stairs
 * @param solution - The function to be tested
 */
function runTests(solution: (cost: number[]) => number): void {
  const testCases = [
    {
      input: [10, 15, 20],
      expected: 15,
      description: 'Standard case 1'
    },
    {
      input: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1],
      expected: 6,
      description: 'Standard case 2'
    },
    {
      input: [0, 0, 0, 1],
      expected: 0,
      description: 'Short array with zero start'
    },
    {
      input: [10, 15],
      expected: 10,
      description: 'Minimum length array'
    },
    {
      input: [1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100, 1, 100],
      expected: 50,
      description: 'Long length array'
    }
  ]

  console.log('Starting tests for Min Cost Climbing Stairs...')
  console.log('--------------------------------------------')

  let passedCount = 0

  testCases.forEach((test, index) => {
    const result = solution([...test.input])
    const passed = result === test.expected

    if (passed) {
      passedCount++
    }

    console.log(`Test #${index + 1}: ${test.description}`)
    console.log(`  Input:    [${test.input.join(', ')}]`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Result:   ${result}`)
    console.log(`  Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('--------------------------------------------')
  })

  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(minCostClimbingStairs4)
