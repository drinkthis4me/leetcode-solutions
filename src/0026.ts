// 26. Remove Duplicates from Sorted Array

// Example 1:
// nums = [1, 1, 2]
// 2, nums = [1, 2, _]
//
// Example 2:
// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0, 1, 2, 3, 4, _, _, _, _, _]

/**
 * Two Pointers
 * T: O(n); S: O(1);
 */
function removeDuplicates(nums: number[]): number {
  const n = nums.length

  if (n <= 1) return n

  // Two Pointer:
  // - i: Pointer to the last unique element
  // - j: Scanner pointer to find the next unique element

  let i = 1 // Start at 1 because nums[0] is always unique

  for (let j = 1; j < n; j++) {
    if (nums[j] !== nums[j - 1]) {
      nums[i] = nums[j]
      i++
    }
  }

  return i
};

type SolutionFunction = (nums: number[]) => number

interface TestCase {
  input: number[]
  expectedK: number
  expectedNums: number[]
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    {
      input: [1, 1, 2],
      expectedK: 2,
      expectedNums: [1, 2]
    },
    {
      input: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
      expectedK: 5,
      expectedNums: [0, 1, 2, 3, 4]
    },
    {
      input: [1],
      expectedK: 1,
      expectedNums: [1]
    },
    {
      input: [1, 2, 3, 4, 5],
      expectedK: 5,
      expectedNums: [1, 2, 3, 4, 5]
    },
    {
      input: [1, 1, 1, 1, 1],
      expectedK: 1,
      expectedNums: [1]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Clone input array to prevent mutation issues across test runs
    const nums = [...test.input]
    const k = solution(nums)

    const isLengthCorrect = k === test.expectedK
    const modifiedSlice = nums.slice(0, k)
    const isElementsCorrect =
      isLengthCorrect &&
      modifiedSlice.every((val, i) => val === test.expectedNums[i])

    if (isLengthCorrect && isElementsCorrect) {
      console.log(`Test Case ${index + 1}: PASSED`)
      passedCount++
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log(`  Input:         [${test.input.join(', ')}]`)
      console.log(`  Expected Length (k): ${test.expectedK}, Got: ${k}`)
      console.log(`  Expected Array: [${test.expectedNums.join(', ')}]`)
      console.log(`  Got Array Slice: [${modifiedSlice.join(', ')}]`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(removeDuplicates)
