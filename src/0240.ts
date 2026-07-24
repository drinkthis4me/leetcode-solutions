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

/**
 * D&C
 * T: O(m log n); S: O(1);
 */
function searchMatrix3(matrix: number[][], target: number): boolean {
  // Divide & Conquer
  // 1. Choose mid point as pivot
  // 2. Binary search on the current column to find the real pivot
  // 3. Discard top-right and bottom-left matrix that are out of bound

  if (!matrix || matrix.length === 0) return false

  const m = matrix.length
  const n = matrix[0]!.length

  // Search within top-left cell(rMin, cMin) and bottom-right cell (rMax, cMax)
  const search = (rMin: number, cMin: number, rMax: number, cMax: number): boolean => {
    // Base case: invalid range
    if (rMin > rMax || cMin > cMax) return false

    // Pruning: target outside of sub-matrix
    if (target < matrix[rMin][cMin] || target > matrix[rMax][cMax]) return false

    const cMid = Math.floor((cMin + cMax) / 2)

    // Find the row r where matrix[r][cMid] is the first element >= target
    let r = rMin
    let max = rMax
    while (r <= max) {
      const mid = Math.floor((r + max) / 2)
      const val = matrix[mid][cMid]

      if (val === target) {
        return true
      } else if (val < target) {
        r = mid + 1
      } else {
        max = mid - 1
      }
    }

    // Pruning at pivot
    return search(rMin, cMid + 1, r - 1, cMax) ||
      search(r, cMin, rMax, cMid - 1)
  }

  return search(0, 0, m - 1, n - 1)
}

type SearchFunction = (matrix: number[][], target: number) => boolean

interface TestCase {
  name: string
  matrix: number[][]
  target: number
  expected: boolean
}

/**
 * Runs a suite of test cases against a provided search function.
 */
function runTests(solution: SearchFunction) {
  const testCases: TestCase[] = [
    {
      name: 'Found in middle',
      matrix: [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
      ],
      target: 5,
      expected: true
    },
    {
      name: 'Not found',
      matrix: [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19]
      ],
      target: 20,
      expected: false
    },
    {
      name: 'Top-right corner',
      matrix: [[1, 2], [3, 4]],
      target: 2,
      expected: true
    },
    {
      name: 'Bottom-left corner',
      matrix: [[1, 2], [3, 4]],
      target: 3,
      expected: true
    },
    {
      name: 'Empty matrix',
      matrix: [],
      target: 1,
      expected: false
    },
    {
      name: 'Single element found',
      matrix: [[5]],
      target: 5,
      expected: true
    },
    {
      name: 'Single element not found',
      matrix: [[5]],
      target: 1,
      expected: false
    }
  ]

  console.log(`--- Running tests for: ${solution.name} ---`)

  let passedCount = 0
  testCases.forEach((tc, index) => {
    const result = solution(tc.matrix, tc.target)
    const passed = result === tc.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test ${index + 1}: ${tc.name}`)
    } else {
      console.error(`[FAIL] Test ${index + 1}: ${tc.name}`)
      console.error(`   Target: ${tc.target}, Expected: ${tc.expected}, Got: ${result}`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} passed.\n`)
}

runTests(searchMatrix3)
