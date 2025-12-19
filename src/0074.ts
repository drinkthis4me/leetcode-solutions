// 74. Search a 2D Matrix

/**
 * Staircase Search
 * T: O(m + n); S: O(1);
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  // Start at top-right cell
  // - Move left if current > target
  // - Move down if current < target

  const m = matrix.length
  const n = matrix[0]!.length
  // Pointers
  let r = 0
  let c = n - 1

  while (r < m && c >= 0) {
    const curr = matrix[r]![c]!

    if (curr === target) {
      return true
    } else if (curr > target) {
      c--
    } else {
      r++
    }
  }

  return false
};

/**
 * Binary Search
 * T: O(log(m * n)); S: O(1);
 */
function searchMatrix2(matrix: number[][], target: number): boolean {
  // Given the matrix properties,
  // we can see the 2-D `m x n` array as 1-D array with length `m * n`.

  const m = matrix.length
  const n = matrix[0]!.length
  // Pointers 
  let l = 0
  let r = m * n - 1

  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2)

    // Map 1-D index to 2-D index
    const midNum = matrix[Math.floor(mid / n)]![mid % n]!

    if (midNum < target) {
      l = mid + 1
    } else if (midNum > target) {
      r = mid - 1
    } else {
      return true
    }
  }

  return false
};

// const matrix = [
//   [1, 3, 5, 7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 60]
// ], target = 3
// const expected = true

// const matrix = [
//   [1, 3, 5, 7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 60]
// ], target = 13
// const expected = false

const matrix = [
  [1, 2, 4, 8],
  [10, 11, 12, 13],
  [14, 20, 30, 40]
],
  target = 10
const expected = true

const ans = searchMatrix2(matrix, target)

console.log('Input: ', matrix, target)
console.log('expected: ', expected)
console.log('answer: ', ans)
