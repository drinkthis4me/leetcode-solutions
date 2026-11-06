// 219. Contains Duplicate II

// Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
//
// Example 1:
// Input: nums = [1,2,3,1], k = 3
// Output: true
//
// Example 2:
// Input: nums = [1,0,1,1], k = 1
// Output: true
//
// Example 3:
// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false

/**
 * Sliding Window w/ Hash Set
 * T: O(n); S: O(k);
 */
function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const n = nums.length

  if (n <= 0 || k === 0) return false

  const set = new Set<number>()

  let l = 0
  let r = 0

  while (r < n) {
    // If the window size > k, shrink from the left
    if (r - l > k) {
      set.delete(nums[l])
      l++
    }

    // Check current right element for duplicate
    if (set.has(nums[r])) return true

    // Add the right element and advance the right pointer
    set.add(nums[r])
    r++
  }

  return false
};

/**
 * Sliding Window w/ Hash Set
 * T: O(n); S: O(k);
 */
function containsNearbyDuplicate2(nums: number[], k: number): boolean {
  const n = nums.length

  if (n <= 0 || k === 0) return false

  const set = new Set<number>()

  let l = 0

  for (let r = 0; r < n; r++) {
    // If the window size > k, shrink from the left
    if (r - l > k) {
      set.delete(nums[l])
      l++
    }

    // Check current element for duplicate
    if (set.has(nums[r])) return true

    // Add current element to set and continue to next element
    set.add(nums[r])
  }

  return false
};

type SolutionFunction = (nums: number[], k: number) => boolean

interface TestCase {
  nums: number[]
  k: number
  expected: boolean
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    { nums: [1, 2, 3, 1], k: 3, expected: true },
    { nums: [1, 0, 1, 1], k: 1, expected: true },
    { nums: [1, 2, 3, 1, 2, 3], k: 2, expected: false },
    { nums: [1], k: 1, expected: false },
    { nums: [9, 9], k: 1, expected: true },
    { nums: [1, 2, 3, 1], k: 0, expected: false },
    { nums: [4, 1, 2, 3, 1, 5], k: 3, expected: true }
  ]

  let passedCount = 0

  console.log('Running Test Cases for LeetCode 219...\n')

  testCases.forEach((test, index) => {
    const result = solution(test.nums, test.k)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`❌ Test Case ${index + 1}: FAILED`)
      console.log(`   Input    : nums = [${test.nums.join(', ')}], k = ${test.k}`)
      console.log(`   Expected : ${test.expected}`)
      console.log(`   Received : ${result}`)
      console.log('-----------------------------------')
    }
  })

  console.log('\n===================================')
  console.log(`Summary: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('===================================')
}

runTests(containsNearbyDuplicate2)
