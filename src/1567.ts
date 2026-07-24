// 1567. Maximum Length of Subarray With Positive Product

// Input: nums = [0,1,-2,-3,-4]
// Output: 3

/**
 * Iteration
 * T: O(n); S: O(1);
 */
function getMaxLen(nums: number[]): number {
  // Maintain two counts:
  // - Positive length, posLen = 0
  // - Negative length, negLen = 0

  // Iterate through numbers
  // Case1: num[i] > 0
  //  -> posLen++
  //     negLen++ (Only if another negative existed before)
  // Case2: num[i] < 0
  //  -> (posLen becomes negLen; negLen becomes posLen)
  //     posLen = 1 + negLen
  //     negLen = 1 + posLen
  // Case#: num[i] = 0
  //  -> Reset. posLen = negLen = 0

  let maxLen = 0
  let posLen = 0
  let negLen = 0

  for (const num of nums) {
    if (num > 0) {
      posLen++
      negLen = negLen > 0 ? (negLen + 1) : 0
    } else if (num < 0) {
      const prevPosLen = posLen
      const prevNegLen = negLen

      posLen = (prevNegLen > 0) ? (prevNegLen + 1) : 0
      negLen = prevPosLen + 1
    } else {
      // num === 0
      posLen = negLen = 0
    }

    maxLen = Math.max(maxLen, posLen)
  }

  return maxLen
};

/**
 * Tester for LeetCode 1567: Maximum Length of Subarray With Positive Product
 *
 * @param solutionFn - The function to test, matching the signature: (nums: number[]) => number
 */
function runTests(solutionFn: (nums: number[]) => number): void {
  const testCases = [
    {
      name: 'Example 1',
      input: [1, -2, -3, 4],
      expected: 4
    },
    {
      name: 'Example 2',
      input: [0, 1, -2, -3, -4],
      expected: 3
    },
    {
      name: 'Example 3',
      input: [-1, -2, -3, 0, 1],
      expected: 2
    },
    {
      name: 'Single positive number',
      input: [5],
      expected: 1
    },
    {
      name: 'Single negative number',
      input: [-5],
      expected: 0
    },
    {
      name: 'All negatives (even count)',
      input: [-1, -2, -3, -4],
      expected: 4
    },
    {
      name: 'All negatives (odd count)',
      input: [-1, -2, -3],
      expected: 2
    },
    {
      name: 'Zeros splitting the array',
      input: [1, 2, 0, -1, -2],
      expected: 2
    }
  ]

  console.log('Running tests for LeetCode 1567...\n')

  let passed = 0

  testCases.forEach((tc, index) => {
    const start = performance.now()
    const result = solutionFn(tc.input)
    const end = performance.now()
    const duration = (end - start).toFixed(4)

    const isPassed = result === tc.expected
    if (isPassed) passed++

    console.log(`[${isPassed ? 'PASS' : 'FAIL'}] ${tc.name}`)
    if (!isPassed) {
      console.log(`   Input:    ${JSON.stringify(tc.input)}`)
      console.log(`   Expected: ${tc.expected}`)
      console.log(`   Got:      ${result}`)
    }
    console.log(`   Time:     ${duration}ms\n`)
  })

  console.log('------------------------------------')
  console.log(`Results: ${passed}/${testCases.length} passed.`)
}

runTests(getMaxLen)
