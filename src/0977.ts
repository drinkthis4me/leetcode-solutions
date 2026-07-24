// 977. Squares of a Sorted Array

/**
 * Two Pointers
 * T: O(n); S: O(n);
 */
function sortedSquares(nums: number[]): number[] {
  if (!nums || nums.length === 0) return []

  const n = nums.length

  const res = new Array(n)
  // Pointers to nums
  let l = 0
  let r = n - 1

  for (let i = n - 1; i >= 0; i--) {
    const left = nums[l]
    const right = nums[r]

    if (Math.abs(left) > Math.abs(right)) {
      res[i] = left * left
      l++
    } else {
      res[i] = right * right
      r--
    }
  }

  return res
};

/**
 * Tester for LeetCode 977: Squares of a Sorted Array
 * @param solutionFn - The function to test, signature: (nums: number[]) => number[]
 */
function runTests(solutionFn: (nums: number[]) => number[]): void {
  const testCases = [
    {
      input: [-4, -1, 0, 3, 10],
      expected: [0, 1, 9, 16, 100]
    },
    {
      input: [-4, -1, 0, 3, 10],
      expected: [0, 1, 9, 16, 100]
    },
    {
      input: [-7, -3, 2, 3, 11],
      expected: [4, 9, 9, 49, 121]
    },
    {
      input: [1],
      expected: [1]
    },
    {
      input: [-5, -2, -1],
      expected: [1, 4, 25]
    }
  ]

  console.log('--- Running Tests for LeetCode 977 ---')

  testCases.forEach((tc, index) => {
    const result = solutionFn([...tc.input]) // Pass copy to avoid mutation
    const passed = JSON.stringify(result) === JSON.stringify(tc.expected)

    if (passed) {
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.error(`Test Case ${index + 1}: FAILED`)
      console.error(`  Input:    [${tc.input}]`)
      console.error(`  Expected: [${tc.expected}]`)
      console.error(`  Got:      [${result}]`)
    }
  })

  console.log('--- Testing Complete ---')
}

runTests(sortedSquares)
