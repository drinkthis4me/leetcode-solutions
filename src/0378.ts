// 378. Kth Smallest Element in a Sorted Matrix
import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * Binary Search
 * T: O(n log r); S: O(1);
 */
function kthSmallest(matrix: number[][], k: number): number {
  // Minimize the count of x = countLessOrEqual(ans)
  // Search in range [min(matrix), max(matrix)]

  const n = matrix.length

  // Helper fn
  // Count number of elements that are less than or equal to `target`
  const countLessOrEqual = (target: number): number => {
    // Two pointers
    let c = n - 1 // Start with last column
    let count = 0

    // Iterate through each row
    for (let r = 0; r < n; r++) {
      while (c >= 0 && matrix[r]![c]! > target) {
        // Move to previous column until valid
        c--
      }
      // For current row `r`, add number of valid elements to `count`
      count += c + 1
      // We don't need to reset `c` here, 
      // because next row's possible valid range will always be in [0, (new `c`)]
    }

    return count
  }


  // Min possible value: most top-left number
  let left = matrix[0]![0]!
  // Max possible value: most bottom-right number
  let right = matrix[n - 1]![n - 1]!
  let ans = 0
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    const count = countLessOrEqual(mid)
    if (count >= k) {
      // Try a smaller number
      ans = mid
      right = mid - 1
    } else {
      // Try a larger number
      left = mid + 1
    }
  }

  return ans
};

/**
 * Min-Heap
 * T: O(k log n); S: O(n);
 * Worst case: k = n^2
 */
function kthSmallest2(matrix: number[][], k: number): number {
  const n = matrix.length

  interface MatrixElement {
    val: number
    r: number // Row index
    c: number // Column index
  }

  const minHeap = new MinPriorityQueue<MatrixElement>(
    // Priority fn compares value
    (el) => el.val
  )

  // Add the 1st element from every row
  for (let r = 0; r < n; r++) {
    minHeap.enqueue({
      val: matrix[r]![0]!,
      r: r,
      c: 0
    })
  }

  // Find k-th element by performing k extractions
  let res = -1
  let count = 0
  while (count < k) {
    const { val, r, c } = minHeap.dequeue()!

    res = val
    count++

    // If the element is not the last in its row, enqueue the next element
    if (c + 1 < n) {
      minHeap.enqueue({
        val: matrix[r]![c + 1]!,
        r: r,
        c: c + 1
      })
    }
  }

  return res
}

const matrix = [
  [1, 5, 9],
  [10, 11, 13],
  [12, 13, 15]
], k = 8
const expected = 13

// const matrix = [
//   [1, 3, 7],
//   [5, 10, 12],
//   [6, 10, 15]
// ], k = 5
// const expected = 7

// const matrix = [[-5]], k = 1
// const expected = -5

const answer = kthSmallest2(matrix, k)

console.log('Input: ', matrix, k)
console.log('expected: ', expected)
console.log('answer: ', answer)