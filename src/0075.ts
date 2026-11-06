// Sort Colors

// Input: nums = [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]
//
// Input: nums = [2,0,1]
// Output: [0, 1, 2]

/**
 * Counting Sort
 * T: O(n); S: O(1);
 */
function sortColors(nums: number[]): void {
  const counts: number[] = new Array(3).fill(0)
  for (const n of nums) {
    counts[n]++
  }

  let idx = 0 // Pointer for nums
  for (let i = 0; i < 3; i++) {
    while (counts[i]-- > 0) {
      nums[idx++] = i
    }
  }
};

/**
 * Dutch National Flag Algorithm
 * T: O(n); S: O(1);
 */
function sortColors2(nums: number[]): void {
  // Maintain three pointers.
  // Keep 0 before the 1st pointer.
  // Keep 1 between the 1st and 2nd pointers.
  // Keep 2 after the 3rd pointer.
  // [0, 0, 1, 1, 1, 2, 2]
  //     l  m->m'    r

  let l = 0
  let m = 0
  let r = nums.length - 1

  function swap(i: number, j: number) {
    [nums[i], nums[j]] = [nums[j], nums[i]]
  }

  while (m <= r) {
    if (nums[m] === 0) {
      // Send 0 to the front of the array.
      swap(l, m)
      l++
      m++
    } else if (nums[m] === 1) {
      // Correct position, move on to check the next number
      m++
    } else {
      // nums[m] === 2
      // Send 2 to the back of the array.
      // However, nums[r] is unknown and need to be checked.
      // So we don't advance the m pointer.
      swap(m, r)
      r--
    }
  }
};

function runTests(solutionFn: (nums: number[]) => void) {
  interface TestCase {
    input: number[]
    expected: number[]
  }
  const testCases: TestCase[] = [
    { input: [2, 0, 2, 1, 1, 0], expected: [0, 0, 1, 1, 2, 2] },
    { input: [2, 0, 1], expected: [0, 1, 2] },
    { input: [0], expected: [0] },
    { input: [1, 2, 0], expected: [0, 1, 2] }
  ]

  let passedCount = 0

  console.log(`Running ${testCases.length} test case(s)...\n`)

  testCases.forEach((test, index) => {
    // Clone input array since Sort Colors sorts in-place
    const numsCopy = [...test.input]

    const startTime = performance.now()
    try {
      solutionFn(numsCopy)
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(3)

      // Deep equality check for arrays
      const passed = JSON.stringify(numsCopy) === JSON.stringify(test.expected)

      if (passed) {
        passedCount++
        console.log(`✅ Test ${index + 1}: PASSED (${duration} ms)`)
      } else {
        console.log(`❌ Test ${index + 1}: FAILED (${duration} ms)`)
        console.log(`   Initial:  ${JSON.stringify(test.input)}`)
        console.log(`   Expected: ${JSON.stringify(test.expected)}`)
        console.log(`   Actual:   ${JSON.stringify(numsCopy)}`)
      }
    } catch (error) {
      console.log(`❌ Test ${index + 1}: ERROR`)
      console.log(`   Input:    ${JSON.stringify(test.input)}`)
      console.log(`   Error:    ${error instanceof Error ? error.message : error}`)
    }
  })

  console.log('\n----------------------------------------')
  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
  console.log('----------------------------------------')
}

runTests(sortColors2)
