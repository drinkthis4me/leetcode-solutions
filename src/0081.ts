// 81. Search in Rotated Sorted Array II

// There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).
//
// Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].
//
// Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.
//
// You must decrease the overall operation steps as much as possible.
//
// Example 1:
// Input: nums = [2,5,6,0,0,1,2], target = 0
// Output: true
//
// Example 2:
// Input: nums = [2,5,6,0,0,1,2], target = 3
// Output: false

/**
 * Binary Search
 * T:O(log n) or O(n); S: O(1);
 */
function search(nums: number[], target: number): boolean {
  let l = 0
  let r = nums.length - 1

  while (l <= r) {
    // If l and r are duplicate, arbitrarily move l to the next non-duplicate element.
    if (l !== r && nums[l] === nums[r]) {
      l++
      continue
    }

    const m = l + Math.floor((r - l) / 2)

    if (nums[m] === target) return true

    if (nums[l] <= nums[m]) {
      // [l..m] is sorted

      if (nums[l] <= target && target < nums[m]) {
        r = m - 1
      } else {
        l = m + 1
      }
    } else {
      // [m..r] is sorted

      if (nums[m] < target && target <= nums[r]) {
        l = m + 1
      } else {
        r = m - 1
      }
    }
  }

  return false
};

type SolutionFn = (nums: number[], target: number) => boolean

interface TestCase {
  nums: number[]
  target: number
  expected: boolean
}

function runTests(solution: SolutionFn): void {
  const testCases: TestCase[] = [
    { nums: [2, 5, 6, 0, 0, 1, 2], target: 0, expected: true },
    { nums: [2, 5, 6, 0, 0, 1, 2], target: 3, expected: false },
    { nums: [1, 0, 1, 1, 1], target: 0, expected: true },
    { nums: [1], target: 0, expected: false },
    { nums: [1], target: 1, expected: true },
    { nums: [1, 3, 5], target: 3, expected: true },
    { nums: [3, 1, 1], target: 3, expected: true },
    { nums: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1], target: 2, expected: true },
    { nums: [3, 1], target: 1, expected: true }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    try {
      const result = solution(test.nums, test.target)
      const passed = result === test.expected

      if (passed) {
        passedCount++
        console.log(`Test Case ${index + 1}: PASSED`)
      } else {
        console.error(`Test Case ${index + 1}: FAILED`)
        console.error(`  Input: nums = [${test.nums.join(', ')}], target = ${test.target}`)
        console.error(`  Expected: ${test.expected}`)
        console.error(`  Received: ${result}`)
      }
    } catch (error) {
      console.error(`Test Case ${index + 1}: ERROR (Threw exception)`)
      console.error(`  Input: nums = [${test.nums.join(', ')}], target = ${test.target}`)
      console.error('  Exception:', error)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(search)
