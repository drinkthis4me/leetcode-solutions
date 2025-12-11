// 240. Search a 2D Matrix II

/**
 * Staircase Search
 * T: O(m + n); S: O(1);
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  // Start at top-right cell
  // Compare with target and move to the next cell:
  // - If current is larger than `target`, move left.
  // - If current is smaller than `target`, move down.

  const m = matrix.length
  const n = matrix[0]!.length
  // Pointers
  let r = 0
  let c = n - 1

  // Loop until pointers are out of bound
  while (r < m && c >= 0) {
    const curr = matrix[r]![c]!
    if (curr === target) {
      return true
    } else if (curr > target) {
      // Move to left cell
      c--
    } else {
      // Move to down cell
      r++
    }
  }

  // Cannot find target
  return false
};

/**
 * Binary Search
 * T: O(m log n); S: O(1);
 */
function searchMatrix2(matrix: number[][], target: number): boolean {
  // Binary search on each row

  // Helper fn
  // Perform binary search on a single row
  const binarySearch = (row: number[]): boolean => {
    // Search range: index [0, n-1]
    let left = 0
    let right = row.length - 1

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)

      if (row[mid]! === target) {
        return true
      } else if (row[mid]! < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return false
  }

  const m = matrix.length
  const n = matrix[0]!.length

  // Iterate through each row
  for (let r = 0; r < m; r++) {
    const firstElement = matrix[r]![0]!
    const lastElement = matrix[r]![n - 1]!

    // Pruning (Optimization)
    if (firstElement > target) {
      // `target` won't be in any subsequent row
      return false
    }

    // If target is in the range of current row, perform binary search
    if (
      target >= firstElement &&
      target <= lastElement &&
      binarySearch(matrix[r]!)
    ) {
      return true
    }

    // target is not in the current row's range.
    // Continue to the next row
  }

  return false
};

const matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 5
const expected = true

// const matrix = [
//   [1, 4, 7, 11, 15],
//   [2, 5, 8, 12, 19],
//   [3, 6, 9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ], target = 20
// const expected = false

const output = searchMatrix2(matrix, target)

console.log('Input: ', matrix, target)
console.log('expected: ', expected)
console.log('output: ', output)