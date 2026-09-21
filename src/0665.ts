// 665. Non-decreasing Array

// Input: nums = [4,2,3]
// Output: true
// Input: nums = [4,2,1]
// Output: false

/**
 * Greedy
 * T: O(n): S: O(1);
 */
function checkPossibility(nums: number[]): boolean {
  const n = nums.length

  if (n === 1) return true

  let modified = false
  let prev: number | null = null
  let curr = nums[0]

  for (let i = 1; i < n; i++) {
    let next = nums[i]

    if (next < curr) {
      if (modified) return false

      if (prev === null) {
        curr = next
      } else {
        if (next < prev) {
          // Option 1: must modify next -> curr
          next = curr
        } else {
          // Option 2: modify curr -> prev
          curr = prev
        }
      }
      modified = true
    }

    prev = curr
    curr = next
  }

  return true
};

/**
 * Tester for LeetCode 665: Non-decreasing Array
 *
 * @param solutionFn - The function implementing the checkPossibility logic.
 */
function runTests(solutionFn: (nums: number[]) => boolean): void {
  // Define test cases: [input array, expected output]
  const testCases: { input: number[], expected: boolean }[] = [
    {
      input: [4, 2, 3],
      expected: true
    },
    {
      input: [4, 2, 1],
      expected: false
    },
    {
      input: [3, 4, 2, 3],
      expected: false
    },
    {
      input: [5, 7, 1, 8],
      expected: true
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: true
    },
    {
      input: [5, 4, 3, 2, 1],
      expected: false
    },
    {
      input: [-1, 4, 2, 3],
      expected: true
    },
    {
      input: [2, 3, 3, 2, 4],
      expected: true
    },
    {
      input: [1],
      expected: true
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 665 Tests ===')

  testCases.forEach((test, index) => {
    // Create a copy of the input array to prevent mutation issues
    const inputCopy = [...test.input]
    const actual = solutionFn(inputCopy)
    const passed = actual === test.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test ${index + 1}: nums = [${test.input.join(', ')}] => Expected: ${test.expected}, Got: ${actual}`)
    } else {
      console.error(`[FAIL] Test ${index + 1}: nums = [${test.input.join(', ')}] => Expected: ${test.expected}, Got: ${actual}`)
    }
  })

  console.log('==================================')
  console.log(`Results: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(checkPossibility)
