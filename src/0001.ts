// 1. Two Sum

/**
 * Hash Map
 * T: O(n); S: O(n);
 */
function twoSum(nums: number[], target: number): number[] {
  // Map stores `[value, index]`
  const map = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]!
    const pair = target - num

    if (map.has(pair)) {
      return [map.get(pair)!, i]
    } else {
      map.set(num, i)
    }
  }

  // No solution found
  return [-1, -1]
}

interface TestCase {
  nums: number[]
  target: number
  expected: number[]
}

function runTests(solution: (nums: number[], target: number) => number[]): void {
  const testCases: TestCase[] = [
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { nums: [3, 3], target: 6, expected: [0, 1] },
    { nums: [1, 5, 3, 7], target: 8, expected: [1, 2] }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    const { nums, target, expected } = test
    const result = solution(nums, target)

    // Sort both arrays to handle cases where the order of indices might be swapped (e.g., [1, 0] vs [0, 1])
    const sortedResult = [...result].sort((a, b) => a - b)
    const sortedExpected = [...expected].sort((a, b) => a - b)

    const passed =
      sortedResult.length === sortedExpected.length &&
      sortedResult.every((val, i) => val === sortedExpected[i])

    if (passed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log(`  Input: nums = [${nums.join(', ')}], target = ${target}`)
      console.log(`  Expected: [${expected.join(', ')}]`)
      console.log(`  Got: [${result.join(', ')}]`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(twoSum)
