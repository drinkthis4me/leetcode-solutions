// 189. Rotate Array

// Example 2:
// nums = [1, 2, 3, 4, 5, 6, 7], k = 3
// Output: [5, 6, 7, 1, 2, 3, 4]
//
// Example 2:
// nums = [-1, -100, 3, 99], k = 2
// Output: [3, 99, -1, -100]

/**
 * Brute Force (Recursion)
 * T: O(n^2); S: O(n)
 */
function rotate(nums: number[], k: number): void {
  if (k <= 0) return

  const n = nums.length

  // Optimization: Skip full rotation
  k %= n

  let prev = nums[n - 1]

  for (let i = 0; i < n; i++) {
    const temp = nums[i]
    nums[i] = prev
    prev = temp
  }

  rotate(nums, k - 1)
};

/**
 * Brute Force (Iteration)
 * T: O(n^2); S: O(1)
 */
function rotate2(nums: number[], k: number): void {
  const n = nums.length

  // Optimization: Skip full rotation
  k %= n

  while (k > 0) {
    let prev = nums[n - 1]

    for (let i = 0; i < n; i++) {
      const temp = nums[i]
      nums[i] = prev
      prev = temp
    }

    k--
  }
};

/**
 * Extra space
 * T: O(n); S: O(n);
 */
function rotate3(nums: number[], k: number): void {
  const n = nums.length

  // Optimization: Skip full rotation
  k %= n

  const copy: number[] = [...nums]

  // Calculate the final index and store it directly
  for (let i = 0; i < n; i++) {
    const targetIdx = (i + k) % n
    nums[targetIdx] = copy[i]
  }
};

/**
 * Cycle Traversal
 * T: O(n); S: O(1);
 */
function rotate4(nums: number[], k: number): void {
  const n = nums.length

  k %= n

  if (k === 0) return

  // Move nums[i] to (i + k) % n
  // Then move nums[(i + k) n] to the next correct position.
  // So on.

  let movedCount = 0

  for (let i = 0; movedCount < n; i++) {
    let currIdx = i
    let prev = nums[currIdx]

    do {
      const nextIdx = (currIdx + k) % n
      const temp = nums[nextIdx]

      nums[nextIdx] = prev
      prev = temp
      currIdx = nextIdx
      movedCount++
    } while (currIdx !== i)
  }
};

/**
 * Reverse array
 * T: O(n); S: O(1);
 */
function rotate5(nums: number[], k: number): void {
  const n = nums.length

  k %= n
  if (k === 0) return

  // Reverse the whole array.
  // Reverse [0..k-1]
  // Reverse [k..n-1]
  //
  // ex:
  // [0, 1, 2, 3, 4], k = 2
  // Reverse all:
  // [4, 3, 2, 1, 0]
  // Reverse 0 to k-1:
  // [3, 4, 2, 1, 0]
  // Reverse k to n-1:
  // [3, 4, 0, 1, 2]

  function reverse(arr: number[], i: number, j: number): void {
    while (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }

  reverse(nums, 0, n - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, n - 1)
};

type RotateFunction = (nums: number[], k: number) => void

interface TestCase {
  nums: number[]
  k: number
  expected: number[]
}

function runTests(rotateFn: RotateFunction): void {
  const testCases: TestCase[] = [
    {
      nums: [1, 2, 3, 4, 5, 6, 7],
      k: 3,
      expected: [5, 6, 7, 1, 2, 3, 4]
    },
    {
      nums: [-1, -100, 3, 99],
      k: 2,
      expected: [3, 99, -1, -100]
    },
    {
      nums: [1, 2],
      k: 3,
      expected: [2, 1] // k is greater than array length
    },
    {
      nums: [1],
      k: 0,
      expected: [1] // k is 0
    },
    {
      nums: [1, 2, 3],
      k: 4,
      expected: [3, 1, 2]
    }
  ]

  function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Create a copy since the function mutates the array in-place
    const inputNums = [...test.nums]

    try {
      rotateFn(inputNums, test.k)

      const passed = arraysEqual(inputNums, test.expected)
      if (passed) {
        console.log(`Test Case ${index + 1}: PASSED`)
        passedCount++
      } else {
        console.log(`Test Case ${index + 1}: FAILED`)
        console.log(`  Initial:  [${test.nums.join(', ')}] (k = ${test.k})`)
        console.log(`  Expected: [${test.expected.join(', ')}]`)
        console.log(`  Received: [${inputNums.join(', ')}]`)
      }
    } catch (error) {
      console.log(`Test Case ${index + 1}: ERROR`)
      console.log('  Exception thrown:', error)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(rotate5)
