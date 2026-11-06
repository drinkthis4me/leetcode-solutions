// 209. Minimum Size Subarray Sum

// Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
//
// Example 1:
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
//
// Example 2:
// Input: target = 4, nums = [1,4,4]
// Output: 1
//
// Example 3:
// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

/**
 * Sliding Window
 * T: O(n); S: O(1);
 */
function minSubArrayLen(target: number, nums: number[]): number {
  // Sliding window
  // Advance the right pointer if current sum < target
  // Advance the left pointer if current sum >= target

  const n = nums.length

  let minLen = Infinity
  let sum = 0
  let l = 0

  for (let r = 0; r < n; r++) {
    sum += nums[r]

    while (sum >= target) {
      minLen = Math.min(minLen, r - l + 1)
      sum -= nums[l]
      l++
    }
  }

  return minLen === Infinity ? 0 : minLen
};

/**
 * Prefix Sum & Binary Search
 * T: O(n log n); S: O(n);
 */
function minSubArrayLen2(target: number, nums: number[]): number {
  // Calculate the prefix sum array
  // Binary search the target

  const n = nums.length

  // sums[i]: The sum of the first i elements of nums (from 0 to i-1)
  const sums: number[] = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + nums[i]
  }

  let minLen = Infinity

  for (let i = 0; i < n; i++) {
    const targetSum = target + sums[i]

    let l = i + 1
    let r = n
    let foundIdx = -1

    while (l <= r) {
      const m = l + Math.floor((r - l) / 2)

      if (sums[m] >= targetSum) {
        foundIdx = m
        r = m - 1
      } else {
        l = m + 1
      }
    }

    if (foundIdx !== -1) {
      minLen = Math.min(minLen, foundIdx - i)
    }
  }

  return minLen === Infinity ? 0 : minLen
};

type SolutionFunction = (target: number, nums: number[]) => number

interface TestCase {
  target: number
  nums: number[]
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    { target: 7, nums: [2, 3, 1, 2, 4, 3], expected: 2 }, // Subarray [4, 3]
    { target: 4, nums: [1, 4, 4], expected: 1 },         // Subarray [4]
    { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1], expected: 0 }, // No such subarray
    { target: 15, nums: [1, 2, 3, 4, 5], expected: 5 },   // Entire array [1, 2, 3, 4, 5]
    { target: 7, nums: [5, 1, 3, 5, 10, 7, 4, 9, 2, 8], expected: 1 }, // Single element [10] or [7]
    { target: 3, nums: [1, 1], expected: 0 }              // Sum max is 2 < 3
  ]

  let passedCount = 0

  console.log('==========================================')
  console.log('  Running Tests for LeetCode 209')
  console.log('==========================================\n')

  testCases.forEach((test, index) => {
    const { target, nums, expected } = test

    const startTime = performance.now()
    const result = solution(target, nums)
    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(3)

    const passed = result === expected
    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED (${duration} ms)`)
    } else {
      console.log(`❌ Test Case ${index + 1}: FAILED (${duration} ms)`)
      console.log(`   Target:   ${target}`)
      console.log(`   Nums:     [${nums.join(', ')}]`)
      console.log(`   Expected: ${expected}`)
      console.log(`   Received: ${result}`)
      console.log('------------------------------------------')
    }
  })

  console.log('\n==========================================')
  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
  console.log('==========================================')
}

runTests(minSubArrayLen2)
