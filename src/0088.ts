// 88. Merge Sorted Array

// Example 1:
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1, 2, 2, 3, 5, 6]
//
// Example 2:
// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
//
// Example 3:
// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]

/**
 * Pointers
 * T: O(m + n); S: O(1);
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // Since we only care [0..m-1] in nums1, the rest of numbers after m-1 is not important and can be replaced.
  // We should merge in reverse order to keep the order in nums1 intact.
  // Init three pointers:
  // - i: Pointer for nums1, starting at (m-1). Candidates from nums1.
  // - j: Pointer for nums2, starting at (n-1). Candidates from nums2.
  // - k: Pointer for nums1, starting at (m+n-1). Here we replace with the largest number.

  let i = m - 1
  let j = n - 1
  let k = m + n - 1

  // Continue until iterated through all nums2.
  // If there are still numbers before i, they already in the correctly position.
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      // Replace k with i
      nums1[k] = nums1[i]
      k--
      i--
    } else {
      // Replace k with j
      nums1[k] = nums2[j]
      k--
      j--
    }
  }
};

type MergeFunction = (nums1: number[], m: number, nums2: number[], n: number) => void

interface TestCase {
  name: string
  nums1: number[]
  m: number
  nums2: number[]
  n: number
  expected: number[]
}

function runTests(solution: MergeFunction): void {
  const testCases: TestCase[] = [
    {
      name: 'Example 1: Standard merge with mixed elements',
      nums1: [1, 2, 3, 0, 0, 0],
      m: 3,
      nums2: [2, 5, 6],
      n: 3,
      expected: [1, 2, 2, 3, 5, 6]
    },
    {
      name: 'Example 2: nums2 is empty',
      nums1: [1],
      m: 1,
      nums2: [],
      n: 0,
      expected: [1]
    },
    {
      name: 'Example 3: nums1 has only zero elements',
      nums1: [0],
      m: 0,
      nums2: [1],
      n: 1,
      expected: [1]
    },
    {
      name: 'Edge Case: nums2 elements are all smaller than nums1',
      nums1: [4, 5, 6, 0, 0, 0],
      m: 3,
      nums2: [1, 2, 3],
      n: 3,
      expected: [1, 2, 3, 4, 5, 6]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Clone nums1 since the solution function modifies it in-place
    const nums1Copy = [...test.nums1]

    try {
      solution(nums1Copy, test.m, test.nums2, test.n)

      // Verify if nums1Copy matches expected result
      const isPassed =
        nums1Copy.length === test.expected.length &&
        nums1Copy.every((val, i) => val === test.expected[i])

      if (isPassed) {
        console.log(`[PASS] Test ${index + 1}: ${test.name}`)
        passedCount++
      } else {
        console.error(`[FAIL] Test ${index + 1}: ${test.name}`)
        console.error(`  Expected: ${JSON.stringify(test.expected)}`)
        console.error(`  Received: ${JSON.stringify(nums1Copy)}`)
      }
    } catch (error) {
      console.error(`[ERROR] Test ${index + 1}: ${test.name} threw an exception:`, error)
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(merge)
