// 658. Find K Closest Elements

import { PriorityQueue } from '@datastructures-js/priority-queue'

// Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.
//
// An integer a is closer to x than an integer b if:
//
//     |a - x| < |b - x|, or
//     |a - x| == |b - x| and a < b
//
// Example 1:
// Input: arr = [1,2,3,4,5], k = 4, x = 3
// Output: [1,2,3,4]
//
// Example 2:
// Input: arr = [1,1,2,3,4,5], k = 4, x = -1
// Output: [1,1,2,3]

/**
 * Max Heap
 * T: O(n log k)); S: O(k);
 */
function findClosestElements(arr: number[], k: number, x: number): number[] {
  // Max heap of [diff, val]
  const maxHeap = new PriorityQueue<[number, number]>((a, b) => {
    if (a[0] !== b[0]) {
      return b[0] - a[0]
    } else {
      return b[1] - a[1]
    }
  })

  // Push elements to heap and limit heap size under k
  for (const num of arr) {
    const diff = Math.abs(num - x)
    maxHeap.push([diff, num])

    if (maxHeap.size() > k) {
      maxHeap.pop()
    }
  }

  const res: number[] = []
  for (let i = 0; i < k; i++) {
    const el = maxHeap.pop()!
    res.push(el[1])
  }

  res.sort((a, b) => a - b)

  return res
};

/**
 * Two Pointer
 * T: O(n - k); S: O(k);
 */
function findClosestElements2(arr: number[], k: number, x: number): number[] {
  let l = 0
  let r = arr.length - 1

  while (r - l >= k) {
    const lDiff = Math.abs(arr[l] - x)
    const rDiff = Math.abs(arr[r] - x)

    if (lDiff <= rDiff) {
      r--
    } else {
      l++
    }
  }

  return arr.slice(l, r + 1)
};

/**
 * Binary Search
 * T: O(k + log (n - k))); S: O(k);
 */
function findClosestElements3(arr: number[], k: number, x: number): number[] {
  let l = 0
  let r = arr.length - 1

  // Find the optimal starting position for window
  while (l < r) {
    // Left bound of the window
    const m = l + Math.floor((r - l) / 2)

    // Current window: [mid..(mid+k-1)].
    // Compare the distance of the leftmost element inside our window (arr[m])
    // against the element just outside the right of our window (arr[m + k]).
    if (x - arr[m]! > arr[m + k]! - x) {
      // Left element is farther -> Move window right.
      l = m + 1
    } else {
      // Left element is closer or tie
      // -> Chuck off the right portion and continue searching the left portion.
      r = m
    }

    // if (Math.abs(arr[m] - x) > Math.abs(arr[m + k] - x)) {
    //   l = m + 1
    // } else {
    //   r = m
    // }
  }

  // Return the k elements starting form the final left
  return arr.slice(l, l + k)
};

type SolutionFunction = (arr: number[], k: number, x: number) => number[]

interface TestCase {
  arr: number[]
  k: number
  x: number
  expected: number[]
}

function runTests(solution: SolutionFunction): void {
  function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  const testCases: TestCase[] = [
    {
      arr: [1, 2, 3, 4, 5],
      k: 4,
      x: 3,
      expected: [1, 2, 3, 4]
    },
    {
      arr: [1, 1, 2, 3, 4, 5],
      k: 4,
      x: -1,
      expected: [1, 1, 2, 3]
    },
    {
      arr: [1, 2, 3, 4, 5],
      k: 4,
      x: 4,
      expected: [2, 3, 4, 5]
    },
    {
      arr: [0, 0, 1, 2, 3, 3, 4, 7, 7, 8],
      k: 3,
      x: 5,
      expected: [3, 3, 4]
    },
    {
      arr: [1, 1, 2, 2, 2, 2, 2, 3, 3],
      k: 3,
      x: 3,
      expected: [2, 3, 3]
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 658 Tests ===')

  testCases.forEach((test, index) => {
    const { arr, k, x, expected } = test
    try {
      const result = solution(arr, k, x)
      const isPass = arraysEqual(result, expected)

      if (isPass) {
        passedCount++
        console.log(`Test Case ${index + 1}: PASSED`)
      } else {
        console.log(`Test Case ${index + 1}: FAILED`)
        console.log(`  Input:    arr = [${arr.join(', ')}], k = ${k}, x = ${x}`)
        console.log(`  Expected: [${expected.join(', ')}]`)
        console.log(`  Got:      [${result.join(', ')}]`)
      }
    } catch (error) {
      console.log(`Test Case ${index + 1}: ERROR`)
      console.log('  Threw error:', error)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(findClosestElements3)
