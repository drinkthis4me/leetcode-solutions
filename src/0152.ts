// 152. Maximum Product Subarray

// nums = [2,3,-2,4]
// Output = 6

/**
 * Brute Force
 * T: O(n^2); S: O(1);
 */
function maxProduct(nums: number[]): number {
  const n = nums.length

  if (n === 1) return nums[0]

  let max = -Infinity

  for (let i = 0; i < n; i++) {
    let curr = 1

    for (let j = i; j < n; j++) {
      if (nums[j] === 0) break

      curr *= nums[j]
      max = Math.max(max, curr)
    }
  }

  return max
};

/**
 * Kadane's Algorithm (DP)
 * T: O(n); S: O(1);
 */
function maxProduct2(nums: number[]): number {
  // All positive numbers case is easy. Just multiply them all.

  // All negative numbers case is tricky.
  // We need to maintain 'currMax' and 'currMin' in case the next negative number
  // turns 'currMin (< 0)' into max.
  // ex: (currMin, currMax) = (-2, 1). Next = -3
  //     new max = -2 * -3 = 6

  // We also need to take care 0 in nums as any 0 will make product become 0.

  if (nums.length === 1) return nums[0]

  let max = nums[0]
  let currMax = 1
  let currMin = 1

  for (const n of nums) {
    // Temp for currMin comparison
    const oldMax = currMax

    // Compare n itself in case previously a 0 appears.
    currMax = Math.max(currMax * n, currMin * n, n)
    currMin = Math.min(oldMax * n, currMin * n, n)

    max = Math.max(max, currMax, currMin)
  }

  return max
};

/**
 * Prefix and Suffix Products
 * T: O(n); S: O(1);
 */
function maxProduct3(nums: number[]): number {
  const n = nums.length

  if (nums.length === 1) return nums[0]

  let res = nums[0]
  let l = 1 // Prefix product
  let r = 1 // Suffix product

  for (let i = 0; i < n; i++) {
    // If old product is 0 (a 0 appears before this idx),
    // reset it to 1 to start a new subarray.
    l = (l === 0 ? 1 : l) * nums[i]
    r = (r === 0 ? 1 : r) * nums[n - 1 - i]
    res = Math.max(res, l, r)
  }

  return res
};

/**
 * Tester for LeetCode 152: Maximum Product Subarray
 * @param solution - A function that matches the signature: (nums: number[]) => number
 */
function runTests(solution: (nums: number[]) => number): void {
  const testCases = [
    { nums: [2, 3, -2, 4], expected: 6 },
    { nums: [-2, 0, -1], expected: 0 },
    { nums: [0, 2], expected: 2 },
    { nums: [-2, 3, -4], expected: 24 },
    { nums: [2, -5, -2, -4, 3], expected: 24 },
    { nums: [-2], expected: -2 },
    { nums: [0, 2, 0], expected: 2 },
    { nums: [-3, -1, -1], expected: 3 },
    { nums: [-3, 0, -2], expected: 0 }
  ]

  console.log('Running tests for Maximum Product Subarray...\n')

  testCases.forEach((tc, index) => {
    const result = solution(tc.nums)
    const passed = result === tc.expected

    console.log(`Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`  Input:    [${tc.nums.join(', ')}]`)
      console.log(`  Expected: ${tc.expected}`)
      console.log(`  Got:      ${result}`)
    }
  })

  console.log('\nTests complete.')
}

runTests(maxProduct3)
