// 560. Subarray Sum Equals K

// Example 1:
// Input: nums = [1,1,1], k = 2
// Output: 2
//
// Example 2:
// Input: nums = [1,2,3], k = 3
// Output: 2

/**
 * Brute force
 * T: O(n^2); S: O(1);
 */
function subarraySum(nums: number[], k: number): number {
  const n = nums.length
  let res = 0

  for (let i = 0; i < n; i++) {
    let curr = nums[i]
    if (curr === k) {
      res++
    }

    for (let j = i + 1; j < n; j++) {
      curr += nums[j]
      if (curr === k) {
        res++
      }
    }
  }

  return res
};

/**
 * Prefix Sum w/ Map
 * T: O(n); S: O(n);
 */
function subarraySum2(nums: number[], k: number): number {
  // (subarray_sum) = (prefix_sum[j]) - (prefix_sum[i])
  // [1, -1, 1, 1, 1, 1], k = 3
  //      i        j
  // At [0, j] subarray, we have sum of 3.
  // Check how many subarray that ends at index j are valid.
  // We can remove a prefix with sum of 0 (3 - k) and the subarray is still summed to k.
  // There are two subarray that sum to 0:
  //  - Empty subarray
  //  - [0, i]

  const n = nums.length

  // Map of [prefix_sum, frequency_count]
  const prefixSums = new Map<number, number>()
  // Base case: prefix sum of 0 occurred once
  prefixSums.set(0, 1)

  let sum = 0
  let res = 0

  for (let i = 0; i < n; i++) {
    sum += nums[i]

    // (current_sum) - (previous_sum) = k
    // target = (previous_sum) = (previous_sum) - k
    const target = sum - k
    if (prefixSums.has(target)) {
      res += prefixSums.get(target)!
    }

    prefixSums.set(sum, (prefixSums.get(sum) || 0) + 1)
  }

  return res
};

interface TestCase {
  nums: number[]
  k: number
  expected: number
}

type SubarraySumSolution = (nums: number[], k: number) => number

/**
 * Runs a set of test cases against the provided LeetCode 560 solution function.
 * @param solution The solution function taking (nums: number[], k: number) and returning number.
 */
function runTests(solution: SubarraySumSolution): void {
  const testCases: TestCase[] = [
    { nums: [1, 1, 1], k: 2, expected: 2 },
    { nums: [1, 2, 3], k: 3, expected: 2 },
    { nums: [1, -1, 1], k: 0, expected: 2 },
    { nums: [3, 4, 7, 2, -3, 1, 4, 2], k: 7, expected: 4 },
    { nums: [1], k: 0, expected: 0 },
    { nums: [1], k: 1, expected: 1 },
    { nums: [-1, -1, 1], k: 0, expected: 1 },
    { nums: [0, 0, 0, 0], k: 0, expected: 10 }
  ]

  let passedCount = 0

  console.log('Running tests for LeetCode 560: Subarray Sum Equals K...\n')

  testCases.forEach((test, index) => {
    const { nums, k, expected } = test
    try {
      const result = solution(nums, k)
      const passed = result === expected

      if (passed) {
        passedCount++
        console.log(`✅ Test Case ${index + 1}: PASSED`)
      } else {
        console.error(`❌ Test Case ${index + 1}: FAILED`)
        console.error(`   Input:    nums = [${nums.join(', ')}], k = ${k}`)
        console.error(`   Expected: ${expected}`)
        console.error(`   Received: ${result}`)
      }
    } catch (error) {
      console.error(`❌ Test Case ${index + 1}: ERROR (Threw an exception)`)
      console.error(`   Input:    nums = [${nums.join(', ')}], k = ${k}`)
      console.error(`   Error:    ${error}`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(subarraySum2)
