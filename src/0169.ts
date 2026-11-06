// 169. Majority Element

// Input: nums = [3,2,3]
// Output: 3

// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

/**
 * Hash Map
 * T: O(n); S: O(n)
 */
function majorityElement(nums: number[]): number {
  const counts = new Map<number, number>()

  let res = 0
  let maxCount = 0
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1)

    if (counts.get(num)! > maxCount) {
      res = num
      maxCount = counts.get(num)!
    }
  }

  return res
};

/**
 * Sorting
 * T: O(n log n); S: O(1)
 */
function majorityElement2(nums: number[]): number {
  nums.sort()

  const mid = Math.floor(nums.length / 2)

  return nums[mid]
};

/**
 * Boyer-Moore Voting Algorithm
 * T: O(n); S: O(1)
 */
function majorityElement3(nums: number[]): number {
  let res = 0
  let count = 0

  for (const num of nums) {
    if (count === 0) {
      res = num
    }

    if (num === res) {
      count++
    } else {
      count--
    }
  }

  return res
};

type SolutionFunction = (nums: number[]) => number

interface TestCase {
  nums: number[]
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    { nums: [3, 2, 3], expected: 3 },
    { nums: [2, 2, 1, 1, 1, 2, 2], expected: 2 },
    { nums: [1], expected: 1 },
    { nums: [6, 5, 5], expected: 5 },
    { nums: [-1, 1, 1, 1, 2, 1, 3], expected: 1 }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 169 Tests ===\n')

  testCases.forEach((test, index) => {
    const startTime = performance.now()
    const result = solution(test.nums)
    const duration = performance.now() - startTime

    const passed = result === test.expected
    if (passed) passedCount++

    console.log(`Test Case ${index + 1}: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`  Input:    [${test.nums.join(', ')}]`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Got:      ${result}`)
    console.log(`  Time:     ${duration.toFixed(3)}ms`)
    console.log('-----------------------------------')
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(majorityElement3)
