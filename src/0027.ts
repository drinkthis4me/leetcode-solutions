// 27. Remove Element

// Input: nums = [3,2,2,3], val = 3
// Output: 2, nums = [2, 2, _, _]
// Input: nums = [0,1,2,2,3,0,4,2], val = 2
// Output: 5, nums = [0,1,4,0,3,_,_,_]

/**
 * Two Pointers I
 * T: O(n); S: O(1);
 */
function removeElement(nums: number[], val: number): number {
  let k = 0 // Index where next valid num should be at

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k++] = nums[i]
    }
  }

  return k
};

/**
 * Two Pointers II
 * T: O(n); S: O(1);
 */
function removeElement2(nums: number[], val: number): number {
  let i = 0 // Current number to be check
  let j = nums.length - 1 // Last number to be swapped

  while (i <= j) {
    if (nums[i] === val) {
      // Swap the current with the last
      // Shrink the window from the right
      nums[i] = nums[j--]
    } else {
      // Move to next if current is valid
      i++
    }
  }

  return i
};

// Define the type for the solution function signature
type RemoveElementSolution = (nums: number[], val: number) => number

interface TestCase {
  nums: number[]
  val: number
  expectedK: number
  expectedElements: number[]
}

function runTests(solution: RemoveElementSolution): void {
  const testCases: TestCase[] = [
    {
      nums: [3, 2, 2, 3],
      val: 3,
      expectedK: 2,
      expectedElements: [2, 2]
    },
    {
      nums: [0, 1, 2, 2, 3, 0, 4, 2],
      val: 2,
      expectedK: 5,
      expectedElements: [0, 1, 3, 0, 4]
    },
    {
      nums: [1],
      val: 1,
      expectedK: 0,
      expectedElements: []
    },
    {
      nums: [4, 5],
      val: 4,
      expectedK: 1,
      expectedElements: [5]
    }
  ]

  let passedCount = 0

  testCases.forEach((tc, index) => {
    // Create a shallow copy to prevent mutation side effects across test runs
    const numsCopy = [...tc.nums]

    // Execute the solution function
    const k = solution(numsCopy, tc.val)

    // LeetCode allows elements beyond index k to be anything.
    // We evaluate the first k elements, sorted, to check accuracy.
    const resultElements = numsCopy.slice(0, k).sort((a, b) => a - b)
    const sortedExpected = [...tc.expectedElements].sort((a, b) => a - b)

    const isLengthValid = k === tc.expectedK
    const areElementsValid =
      resultElements.length === sortedExpected.length &&
      resultElements.every((val, idx) => val === sortedExpected[idx])

    const passed = isLengthValid && areElementsValid

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`❌ Test Case ${index + 1}: FAILED`)
      console.log(`   Input:    nums = [${tc.nums}], val = ${tc.val}`)
      console.log(`   Expected: k = ${tc.expectedK}, elements = [${sortedExpected}]`)
      console.log(`   Received: k = ${k}, elements = [${resultElements}]`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(removeElement2)
