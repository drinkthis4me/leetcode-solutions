// 304. Range Sum Query 2D - Immutable

// Input
// ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
// [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
// Output
// [null, 8, 11, 12]
//
// Explanation
// NumMatrix numMatrix = new NumMatrix(
//  [
//    [3, 0, 1, 4, 2],
//    [5, 6, 3, 2, 1],
//    [1, 2, 0, 1, 5],
//    [4, 1, 0, 1, 7],
//    [1, 0, 3, 0, 5]
//  ]
// );
// numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
// numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
// numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)

/**
 * 2-D Prefix sum
 */
class NumMatrix {
  sums: number[][]

  /**
   * T:O(n * m); S: O(n * m);
   */
  constructor(matrix: number[][]) {
    const m = matrix.length
    const n = matrix[0].length

    // Make the prefix matrix (m+1, n+1) size to simplify out-of-bound cases
    this.sums = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        // (Current prefix sum) = (x prefix sum) + (y prefix sum) + (Current cell value) - (Duplicate prefix value at top-left cell)
        this.sums[i][j] = this.sums[i - 1][j] + this.sums[i][j - 1] + matrix[i - 1][j - 1] - this.sums[i - 1][j - 1]
      }
    }
  }

  /**
   * T:O(1); S: O(n * m);
   */
  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    // Shift to the prefix sum matrix indices
    row1++
    col1++
    row2++
    col2++

    // Calculate area by prefix sum matrix
    const bottomRight = this.sums[row2][col2]
    const above = this.sums[row1 - 1][col2]
    const left = this.sums[row2][col1 - 1]
    const topLeft = this.sums[row1 - 1][col1 - 1]

    return bottomRight - above - left + topLeft
  }
}

// Define the type for the NumMatrix class structure expected by LeetCode 304
type NumMatrixConstructor = new (matrix: number[][]) => {
  sumRegion: (row1: number, col1: number, row2: number, col2: number) => number
}

interface TestCase {
  name: string
  matrix: number[][]
  queries: {
    coords: [number, number, number, number]
    expected: number
  }[]
}

/**
 * Runs test cases for LeetCode 304: Range Sum Query 2D - Immutable
 * @param NumMatrixImplementation The class implementation to test
 */
function runTests(NumMatrixImplementation: NumMatrixConstructor): void {
  const testCases: TestCase[] = [
    {
      name: 'Standard 5x5 Matrix Example',
      matrix: [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
      ],
      queries: [
        { coords: [2, 1, 4, 3], expected: 8 }, // Sub-grid sum
        { coords: [1, 1, 2, 2], expected: 11 }, // Sub-grid sum
        { coords: [1, 2, 2, 4], expected: 12 } // Sub-grid sum
      ]
    },
    {
      name: 'Single Element Matrix',
      matrix: [[5]],
      queries: [
        { coords: [0, 0, 0, 0], expected: 5 }
      ]
    },
    {
      name: 'Single Row Matrix',
      matrix: [[1, 2, 3, 4, 5]],
      queries: [
        { coords: [0, 1, 0, 3], expected: 9 }, // Sum of elements [2, 3, 4]
        { coords: [0, 0, 0, 4], expected: 15 } // Entire row
      ]
    },
    {
      name: 'Single Column Matrix',
      matrix: [[1], [2], [3], [4]],
      queries: [
        { coords: [1, 0, 3, 0], expected: 9 } // Sum of elements [2, 3, 4]
      ]
    }
  ]

  let passedCount = 0
  let failedCount = 0

  console.log('=== Starting LeetCode 304 Tests ===\n')

  testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}: ${test.name}`)
    try {
      const numMatrix = new NumMatrixImplementation(test.matrix)

      test.queries.forEach((q, qIndex) => {
        const [row1, col1, row2, col2] = q.coords
        const result = numMatrix.sumRegion(row1, col1, row2, col2)
        const passed = result === q.expected

        if (passed) {
          console.log(`  Query ${qIndex + 1} [${q.coords}] -> Passed (Got: ${result})`)
          passedCount++
        } else {
          console.error(
            `  Query ${qIndex + 1} [${q.coords}] -> Failed (Expected: ${q.expected}, Got: ${result})`
          )
          failedCount++
        }
      })
    } catch (error) {
      console.error(`  Test Case ${index + 1} threw an unexpected error:`, error)
      failedCount += test.queries.length
    }
    console.log('')
  })

  console.log('=== Test Summary ===')
  console.log(`Total Passed: ${passedCount}`)
  console.log(`Total Failed: ${failedCount}`)

  if (failedCount === 0) {
    console.log('🎉 All tests passed successfully!')
  } else {
    console.log('❌ Some tests failed. Please review the output above.')
  }
}

runTests(NumMatrix)
