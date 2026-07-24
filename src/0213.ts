// 213. House Robber II

/**
 * DP (Top-down)
 * T: O(n); S: O(n);
 */
function rob(nums: number[]): number {
  const n = nums.length

  // Edge case
  if (n === 0) return 0
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(...nums)

  // Option1: Rob first and give up on the last. Search range: [0,n-2]
  // Option2: Rob second and give up on the first. Search range: [1,n-1]

  const helper = (start: number, end: number): number => {
    const memo = new Array(n).fill(-1)

    const dfs = (i: number): number => {
      if (i > end) return 0

      if (memo[i] !== -1) {
        return memo[i]
      }

      memo[i] = Math.max(dfs(i + 1), nums[i] + dfs(i + 2))

      return memo[i]
    }

    return dfs(start)
  }

  return Math.max(helper(0, n - 2), helper(1, n - 1))
};

/**
 * DP (Bottom-up)
 * T: O(n); S: O(n);
 */
function rob2(nums: number[]): number {
  const n = nums.length

  // Edge case
  if (n === 0) return 0
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(...nums)

  const helper = (start: number, end: number): number => {
    const len = end - start + 1
    const dp = new Array(len)

    dp[0] = nums[start]
    dp[1] = Math.max(nums[start], nums[start + 1])

    for (let i = 2; i < len; i++) {
      dp[i] = Math.max(dp[i - 1], nums[start + i] + dp[i - 2])
    }

    return dp[len - 1]
  }

  return Math.max(helper(0, n - 2), helper(1, n - 1))
}

/**
 * DP (Bottom-up. Optimized)
 * T: O(n); S: O(1);
 */
function rob3(nums: number[]): number {
  const n = nums.length

  // Edge case
  if (n === 0) return 0
  if (n === 1) return nums[0]
  if (n === 2) return Math.max(...nums)

  const helper = (start: number, end: number): number => {
    let prev1 = 0
    let prev2 = 0

    for (let i = start; i <= end; i++) {
      const temp = prev1
      prev1 = Math.max(prev1, nums[i] + prev2)
      prev2 = temp
    }

    return prev1
  }

  return Math.max(helper(0, n - 2), helper(1, n - 1))
}

/**
 * Tester for LeetCode 213: House Robber II
 * * @param solution - A function that accepts an array of numbers and returns the maximum amount robbed.
 */
function runTests(solution: (nums: number[]) => number): void {
  const testCases = [
    {
      name: 'Example 1',
      input: [2, 3, 2],
      expected: 3
    },
    {
      name: 'Example 2',
      input: [1, 2, 3, 1],
      expected: 4
    },
    {
      name: 'Example 3',
      input: [1, 2, 3],
      expected: 3
    },
    {
      name: 'Single house',
      input: [5],
      expected: 5
    },
    {
      name: 'Two houses',
      input: [1, 2],
      expected: 2
    },
    {
      name: 'Empty array',
      input: [],
      expected: 0
    },
    {
      name: 'Large values',
      input: [200, 3, 140, 20, 10],
      expected: 340
    }
  ]

  console.log('--- Starting LeetCode 213 Tests ---')
  let passedCount = 0

  testCases.forEach((test, index) => {
    const result = solution([...test.input])
    const passed = result === test.expected

    if (passed) {
      passedCount++
    }

    console.log(`Test ${index + 1}: ${test.name}`)
    console.log(`  Input:    [${test.input.join(', ')}]`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Actual:   ${result}`)
    console.log(`  Status:   ${passed ? 'PASSED ✅' : 'FAILED ❌'}`)
    console.log('-----------------------------------')
  })

  console.log(`Result: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(rob3)
