// 1748. Sum of Unique Elements

// You are given an integer array nums. The unique elements of an array are the elements that appear exactly once in the array.
//
// Return the sum of all the unique elements of nums.
//
// Example 1:
// Input: nums = [1,2,3,2]
// Output: 4
// Explanation: The unique elements are [1,3], and the sum is 4.
//
// Example 2:
// Input: nums = [1,1,1,1,1]
// Output: 0
// Explanation: There are no unique elements, and the sum is 0.
//
// Example 3:
// Input: nums = [1,2,3,4,5]
// Output: 15
// Explanation: The unique elements are [1,2,3,4,5], and the sum is 15.

/**
 * Hash Map
 * T: O(n); S: O(n);
 */
function sumOfUnique(nums: number[]): number {
  // Map of [element, count]
  const map = new Map<number, number>()
  let res = 0

  for (const num of nums) {
    const count = (map.get(num) || 0) + 1
    map.set(num, count)

    if (count === 1) {
      res += num
    } else if (count === 2) {
      res -= num
    }
    // The third (and onward) duplicate does not affect the sum
  }

  return res
}

interface TestCase {
  input: number[]
  expected: number
}

function runTests(solution: (nums: number[]) => number): void {
  const testCases: TestCase[] = [
    { input: [1, 2, 3, 2], expected: 4 },
    { input: [1, 1, 1, 1, 1], expected: 0 },
    { input: [1, 2, 3, 4, 5], expected: 15 },
    { input: [2, 5, 1, 1, 5], expected: 2 },
    { input: [9], expected: 9 },
    { input: [], expected: 0 }
  ]

  let passedCount = 0

  console.log('Running tests for LeetCode 1748: Sum of Unique Elements...\n')

  testCases.forEach((test, index) => {
    const result = solution(test.input)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.error(`❌ Test Case ${index + 1}: FAILED`)
      console.error(`   Input:    [${test.input.join(', ')}]`)
      console.error(`   Expected: ${test.expected}`)
      console.error(`   Received: ${result}`)
    }
  })

  console.log('\n----------------------------------------')
  console.log(`Summary: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('----------------------------------------')
}

runTests(sumOfUnique)
