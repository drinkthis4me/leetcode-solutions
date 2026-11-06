// 2239. Find Closest Number to Zero

// Given an integer array nums of size n, return the number with the value closest to 0 in nums. If there are multiple answers, return the number with the largest value.
//
// Example 1:
// Input: nums = [-4,-2,1,4,8]
// Output: 1
// Explanation:
// The distance from -4 to 0 is |-4| = 4.
// The distance from -2 to 0 is |-2| = 2.
// The distance from 1 to 0 is |1| = 1.
// The distance from 4 to 0 is |4| = 4.
// The distance from 8 to 0 is |8| = 8.
// Thus, the closest number to 0 in the array is 1.
//
// Example 2:
// Input: nums = [2,-1,1]
// Output: 1
// Explanation: 1 and -1 are both the closest numbers to 0, so 1 being larger is returned.

/**
 * Array Iteration
 * T: O(n); S: O(1);
 */
function findClosestNumber(nums: number[]): number {
  let res: number = nums[0]

  for (const num of nums) {
    const prevDist = Math.abs(res)
    const currDist = Math.abs(num)

    if (currDist < prevDist || num === prevDist) {
      res = num
    }
  }

  return res
};

type SolutionFunction = (nums: number[]) => number

interface TestCase {
  input: number[]
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    {
      input: [-4, -2, 1, 4, 8],
      expected: 1
    },
    {
      input: [2, -1, 1],
      expected: 1 // Tie-breaker: return the larger value (1)
    },
    {
      input: [0, -10, 10],
      expected: 0 // Zero distance takes precedence
    },
    {
      input: [-100000, -100000],
      expected: -100000
    },
    {
      input: [100, 200, 300, -100],
      expected: 100 // Tie-breaker between 100 and -100
    },
    {
      input: [5],
      expected: 5
    }
  ]

  let passedCount = 0

  console.log('Running tests for LeetCode 2239...\n')

  testCases.forEach((test, index) => {
    try {
      const actual = solution(test.input)
      const passed = actual === test.expected

      if (passed) {
        passedCount++
        console.log(`✅ [PASS] Test ${index + 1}: input = [${test.input.join(', ')}] -> expected: ${test.expected}, got: ${actual}`)
      } else {
        console.error(`❌ [FAIL] Test ${index + 1}: input = [${test.input.join(', ')}] -> expected: ${test.expected}, got: ${actual}`)
      }
    } catch (error) {
      console.error(`💥 [ERROR] Test ${index + 1}: Threw an exception:`, error)
    }
  })

  console.log(`\nResult: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(findClosestNumber)
