// 416. Partition Equal Subset Sum

// Input: nums = [1,5,11,5]
// Output: true
// Explanation: The array can be partitioned as [1, 5, 5] and [11].
// Input: nums = [1,2,3,5]
// Output: false

/**
 * Brute Force
 * T:O(2^n); S: O(n);
 */
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)

  // Edge case: `nums` with odd sum cannot be partitioned
  if (sum % 2 !== 0) return false

  const target = Math.floor(sum / 2)
  const n = nums.length

  const dfs = (i: number, remaining: number): boolean => {
    if (i === n) {
      return remaining === 0
    }
    if (remaining < 0) return false

    return (
      dfs(i + 1, remaining - nums[i]) ||
      dfs(i + 1, remaining)
    )
  }

  return dfs(0, target)
};

/**
 * DP (Top-down)
 * T:O(n * t); S: O(n * t);
 */
function canPartition2(nums: number[]): boolean {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)

  // Edge case: `nums` with odd sum cannot be partitioned
  if (sum % 2 !== 0) return false

  const target = Math.floor(sum / 2)
  const n = nums.length
  const memo = Array.from({ length: n }, () => new Array(target + 1).fill(null))

  const dfs = (i: number, remaining: number): boolean => {
    if (i === n) {
      return remaining === 0
    }
    if (remaining < 0) return false

    if (memo[i][remaining] !== null) {
      return memo[i][remaining]
    }

    memo[i][remaining] = (
      dfs(i + 1, remaining - nums[i]) ||
      dfs(i + 1, remaining)
    )
    return memo[i][remaining]
  }

  return dfs(0, target)
};

/**
 * DP (Bottom-up. 2-D Array.)
 * T:O(n * t); S: O(n * t);
 */
function canPartition3(nums: number[]): boolean {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)
  if (sum % 2 !== 0) return false
  const target = Math.floor(sum / 2)
  const n = nums.length

  // DP boolean array of size (n+1) x (target+1)
  // dp[i][j] = sum j can be formed using any first i numbers
  const dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false))

  // Sum of 0 can always be formed by picking an empty subset
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      // Check if current number fits within the current target
      if (nums[i - 1] <= j) {
        dp[i][j] = (
          dp[i - 1][j] ||             // Exclude current
          dp[i - 1][j - nums[i - 1]]  // Include current
        )
      } else {
        // Too large.
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[n][target]
};

/**
 * DP (Bottom-up. 1-D Array)
 * T:O(n); S: O(t);
 */
function canPartition4(nums: number[]): boolean {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)
  if (sum % 2 !== 0) return false
  const target = Math.floor(sum / 2)

  // DP array where dp[j] indicates if sum j can be formed
  const dp = new Array(target + 1).fill(false)

  // Base case: target 0 can always be formed with an empty subset
  dp[0] = true

  for (const num of nums) {
    // Iterate backwards to prevent using the same element multiple times (0/1 Knapsack property)
    for (let i = target; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num]
    }
  }

  return dp[target]
};

function runTests(solution: (nums: number[]) => boolean): void {
  const testCases: { nums: number[], expected: boolean, description: string }[] = [
    {
      nums: [1, 5, 11, 5],
      expected: true,
      description: 'Example 1: Can be partitioned into equal subsets [1, 5, 5] and [11]'
    },
    {
      nums: [1, 2, 3, 5],
      expected: false,
      description: 'Example 2: Cannot be partitioned into equal subsets'
    },
    {
      nums: [1, 1],
      expected: true,
      description: 'Minimal valid case with two equal elements'
    },
    {
      nums: [1, 2, 5],
      expected: false,
      description: 'Minimal invalid case'
    },
    {
      nums: [3, 3, 3, 4, 5],
      expected: true,
      description: 'Larger array with a valid partition (sum = 18, target = 9)'
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 416 Tests ===')

  testCases.forEach((test, index) => {
    const start = performance.now()
    const result = solution([...test.nums]) // Pass a copy to avoid mutation
    const end = performance.now()
    const duration = (end - start).toFixed(3)

    const passed = result === test.expected
    if (passed) {
      passedCount++
    }

    console.log(`\nTest Case ${index + 1}: ${test.description}`)
    console.log(`  Input:    [${test.nums.join(', ')}]`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Received: ${result}`)
    console.log(`  Status:   ${passed ? '✅ PASSED' : '❌ FAILED'} (${duration} ms)`)
  })

  console.log('\n==================================')
  console.log(`Summary: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('==================================')
}

runTests(canPartition4)
