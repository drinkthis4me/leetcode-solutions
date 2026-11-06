// 41. First Missing Positive

/**
 * Sorting
 * T: O(n log n); S: O(1)
 */
function firstMissingPositive(nums: number[]): number {
  // Edge case
  if (!nums || nums.length === 0) return 1

  nums.sort((a, b) => a - b)

  let res = 1

  for (const n of nums) {
    if (n > 0 && res === n) {
      res++
    }
  }

  return res
};

/**
 * Array (as hash set)
 * T: O(n); S: O(n)
 */
function firstMissingPositive2(nums: number[]): number {
  // Edge case
  if (!nums || nums.length === 0) return 1

  // Track all positive numbers

  const n = nums.length
  const seen = new Array(n).fill(false)

  for (const num of nums) {
    if (num > 0 && num <= n) {
      seen[num - 1] = true
    }
  }

  // Find the first not seen number
  for (let i = 0; i < n; i++) {
    if (!seen[i]) {
      return i + 1
    }
  }

  // From 1 to n, all seen
  return n + 1
};

/**
 * Cycle Sort
 * T: O(n); S: O(1)
 */
function firstMissingPositive3(nums: number[]): number {
  // Edge case
  if (!nums || nums.length === 0) return 1

  // Sort positive numbers by their correct indices:
  // nums[3] = 5 -> 5 belongs to index (5-1)
  //  -> Swap nums[3] with nums[4]
  // nums[4] = 1 -> 1 belongs to index (1-1)
  //  -> Swap nums[4] with nums[0]

  const n = nums.length

  for (let i = 0; i < n; i++) {
    while (
      nums[i] > 0 &&
      nums[i] <= n &&
      nums[i] !== nums[nums[i] - 1]
    ) {
      const targetIdx = nums[i] - 1;
      [nums[i], nums[targetIdx]] = [nums[targetIdx], nums[i]]
    }
  }

  // find the incorrect number in sorted array
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }

  // All 1 to n are present and sorted
  return n + 1
};

/**
 * Negative marking
 * T: O(n); S: O(1)
 */
function firstMissingPositive4(nums: number[]): number {
  // Edge case
  if (!nums || nums.length === 0) return 1

  // Use array itself as hash set to mark as visited
  // [3, 4, -1, 1]

  const n = nums.length

  // Possible result is within [1, n+1]
  // Mark invalid number with (n+1)
  // [3, 4, -1, 1] -> [3, 4, 5, 1]
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0 || nums[i] > n) {
      nums[i] = n + 1
    }
  }

  // Hash number to index, then mark number at the index with negative sign.
  // [3, 4, 5, 1]
  // i = 0, num = 3 -> index = 2 -> [3, 4, -5, 1]
  // i = 1, num = 4 -> index = 5 -> [3, 4, -5, -1]
  // i = 2, num = 5 -> Out of bound. Skip.
  // i = 3, num = 1 -> index = 0 -> [-3, 4, -5, -1]
  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i])

    if (num <= n) {
      nums[num - 1] = -Math.abs(nums[num - 1])
      // Make sure that already negative number stayed negative
    }
  }

  // The first not-marked index is the missing number (index 1)
  // Get the missing number from hashed index: index 1 -> number 2
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1
    }
  }

  // All numbers are marked. Return (n+1).
  return n + 1
};

interface TestCase {
  input: number[]
  expected: number
}

function runTests(solution: (nums: number[]) => number): void {
  const testCases: TestCase[] = [
    { input: [1, 2, 0], expected: 3 },
    { input: [3, 4, -1, 1], expected: 2 },
    { input: [7, 8, 9, 11, 12], expected: 1 },
    { input: [1], expected: 2 },
    { input: [-5, -1, 0], expected: 1 },
    { input: [1, 2, 3, 4, 5], expected: 6 },
    { input: [2, 2, 1, 1], expected: 3 },
    { input: [], expected: 1 }
  ]

  let passedCount = 0

  console.log('=========================================')
  console.log(' Running Tests for LeetCode 41')
  console.log('=========================================\n')

  testCases.forEach((test, index) => {
    // Clone the input array in case the solution mutates it in place
    const inputCopy = [...test.input]

    const startTime = performance.now()
    const result = solution(inputCopy)
    const endTime = performance.now()

    const passed = result === test.expected
    if (passed) {
      passedCount++
    }

    console.log(`Test Case ${index + 1}: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`  Input:    [${test.input.join(', ')}]`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Received: ${result}`)
    console.log(`  Time:     ${(endTime - startTime).toFixed(4)} ms`)
    console.log('-----------------------------------------')
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(firstMissingPositive4)
