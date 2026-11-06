// 35. Search Insert Position

// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
//
// You must write an algorithm with O(log n) runtime complexity.
//
// Example 1:
// Input: nums = [1,3,5,6], target = 5
// Output: 2
//
// Example 2:
// Input: nums = [1,3,5,6], target = 2
// Output: 1
//
// Example 3:
// Input: nums = [1,3,5,6], target = 7
// Output: 4

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function searchInsert(nums: number[], target: number): number {
  let l = 0
  let r = nums.length - 1

  while (l <= r) {
    const m = l + Math.floor((r - l) / 2)
    const mid = nums[m]

    if (mid === target) {
      return m
    } else if (mid < target) {
      l = m + 1
    } else {
      r = m - 1
    }
  }

  return l
};

/**
 * Binary Search (lower bound)
 * T: O(log n); S: O(1);
 */
function searchInsert2(nums: number[], target: number): number {
  let l = 0
  let r = nums.length

  while (l < r) {
    const m = l + Math.floor((r - l) / 2)
    const mid = nums[m]

    if (mid >= target) {
      r = m
    } else {
      l = m + 1
    }
  }

  return l
};

type SolutionFunction = (nums: number[], target: number) => number

interface TestCase {
  nums: number[]
  target: number
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    { nums: [1, 3, 5, 6], target: 5, expected: 2 }, // Target found in the middle
    { nums: [1, 3, 5, 6], target: 2, expected: 1 }, // Target inserted in the middle
    { nums: [1, 3, 5, 6], target: 7, expected: 4 }, // Target inserted at the end
    { nums: [1, 3, 5, 6], target: 0, expected: 0 }, // Target inserted at the beginning
    { nums: [1], target: 0, expected: 0 },          // Single element, insert before
    { nums: [1], target: 1, expected: 0 },          // Single element, exact match
    { nums: [1], target: 2, expected: 1 }          // Single element, insert after
  ]

  let passedCount = 0

  testCases.forEach((tc, index) => {
    const actual = solution(tc.nums, tc.target)
    const passed = actual === tc.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.error(`❌ Test Case ${index + 1}: FAILED`)
      console.error(`   Input: nums = [${tc.nums.join(', ')}], target = ${tc.target}`)
      console.error(`   Expected: ${tc.expected}`)
      console.error(`   Got:      ${actual}`)
    }
  })

  console.log('\n--- Summary ---')
  console.log(`${passedCount} / ${testCases.length} test cases passed.`)
}

runTests(searchInsert2)
