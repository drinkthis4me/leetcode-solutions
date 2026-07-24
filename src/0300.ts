// 300. Longest Increasing Subsequence

// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4

/**
 * Brute Force
 * T: O(2^n); S: O(n);
 */
function lengthOfLIS(nums: number[]): number {
  /**
   * @param i Current index
   * @param j Last included index
   * @returns Current length of LTS
   */
  const dfs = (i: number, j: number): number => {
    if (i >= nums.length) return 0

    const excludeCurr = dfs(i + 1, j)

    // Only include if current is the first number
    // or current is greater than last included number
    const includeCurr = (j === -1 || nums[j] < nums[i]) ?
      1 + dfs(i + 1, i) :
      0

    return Math.max(excludeCurr, includeCurr)
  }

  return dfs(0, -1)
};

/**
 * DP (Top-down)
 * T: O(n^2); S: O(n^2);
 */
function lengthOfLIS2(nums: number[]): number {
  const n = nums.length

  // Memorization 2-D array.
  // i -> 0 to n-1; j -> -1 to n-1
  const memo = Array.from({ length: n }, () => new Array(n + 1).fill(-1))

  const dfs = (i: number, j: number): number => {
    if (i >= nums.length) return 0

    if (memo[i][j + 1] !== -1) {
      return memo[i][j + 1]
    }

    const excludeCurr = dfs(i + 1, j)

    const includeCurr = (j === -1 || nums[j] < nums[i]) ?
      1 + dfs(i + 1, i) :
      0

    memo[i][j + 1] = Math.max(excludeCurr, includeCurr)
    return memo[i][j + 1]
  }

  return dfs(0, -1)
};

/**
 * DP (Top-down II)
 * T: O(n^2); S: O(n);
 */
function lengthOfLIS3(nums: number[]): number {
  // Instead of include/exclude current,
  // we can always include current number and find the next greater one to include

  const n = nums.length
  const memo = new Array(n).fill(-1)

  const dfs = (i: number): number => {
    if (memo[i] !== -1) {
      return memo[i]
    }

    let len = 1 // Always include at i

    for (let j = i + 1; j < n; j++) {
      if (nums[j] > nums[i]) {
        len = Math.max(len, 1 + dfs(j))
      }
    }

    memo[i] = len
    return len
  }

  let res = 1
  for (let i = 0; i < n; i++) {
    res = Math.max(res, dfs(i))
  }

  return res
};

/**
 * DP (Bottom-up)
 * T: O(n^2); S: O(n);
 */
function lengthOfLIS4(nums: number[]): number {
  const n = nums.length
  const dp = new Array(n + 1).fill(1)

  // dp[n] = 1

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (nums[j] > nums[i]) {
        dp[i] = Math.max(dp[i], 1 + dp[j])
      }
    }
  }

  // Each index could be the LIS
  return Math.max(...dp)
};

/**
 * DP & Binary Search
 * T: O(n log n); S: O(n);
 */
function lengthOfLIS5(nums: number[]): number {
  // The question only asks the length, not the sub-sequence.
  // We can maintain a sorted list by:
  //  - Insert if current number is greater than last.
  //  - Binary search and replace the smallest number >= current when current number is less than the last.
  //    (This stores the possible longer sub-sequence start)
  // Ex: [1,7,8,4,5,6,-1,9]
  // i = 0,1,2 -> [1,7,8]
  // i = 3 -> [1,4,8] (4 is replacing number at index 1)
  // i = 4 -> [1,4,5]
  // i = 5 -> [1,4,5,6]
  // i = 6 -> [-1,4,5,6]
  // i = 7 -> [-1,4,5,6,9]

  const res: number[] = [] // Overwrite nums in-place can result in O(1)

  const binarySearch = (arr: number[], target: number) => {
    let l = 0
    let r = arr.length - 1

    while (l <= r) {
      const m = l + Math.floor((r - l) / 2)
      const mid = arr[m]
      if (mid === target) {
        return m
      } else if (mid > target) {
        r = m - 1
      } else {
        l = m + 1
      }
    }

    return l
  }

  for (const n of nums) {
    if (res.length === 0 || res[res.length - 1] < n) {
      res.push(n)
    } else {
      const i = binarySearch(res, n)
      res[i] = n
    }
  }

  return res.length
};

interface TestCase {
  input: number[]
  expected: number
}

function runTests(solution: (nums: number[]) => number): void {
  const testCases: TestCase[] = [
    {
      input: [10, 9, 2, 5, 3, 7, 101, 18],
      expected: 4
    },
    {
      input: [0, 1, 0, 3, 2, 3],
      expected: 4
    },
    {
      input: [7, 7, 7, 7, 7, 7, 7],
      expected: 1
    },
    {
      input: [1],
      expected: 1
    },
    {
      input: [4, 10, 4, 3, 8, 9],
      expected: 3
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 300 Tests ===')

  testCases.forEach((test, index) => {
    const result = solution(test.input)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${index + 1}`)
    } else {
      console.log(`[FAIL] Test Case ${index + 1}`)
      console.log(`  Input:    [${test.input.join(', ')}]`)
      console.log(`  Expected: ${test.expected}`)
      console.log(`  Received: ${result}`)
    }
  })

  console.log('==================================')
  console.log(`Result: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(lengthOfLIS5)
