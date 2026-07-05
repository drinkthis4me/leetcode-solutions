// 37. Sudoku Solver

/**
 * Backtrack
 * T: O(9^m); S: O(1);
 * m for number of empty cells
 */
function solveSudoku(board: string[][]): void {
  const N = board.length
  const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  // Conditions
  const rows = Array.from({ length: N }, () => new Set<string>())
  const cols = Array.from({ length: N }, () => new Set<string>())
  const boxes = Array.from({ length: N }, () => new Set<string>())

  // Helper fn to calculate box index
  const getBoxIndex = (r: number, c: number): number => {
    return Math.floor(r / 3) * 3 + Math.floor(c / 3)
  }

  // Helper fn to check if a new value is valid
  const isValid = (value: string, r: number, c: number): boolean => {
    const boxIdx = getBoxIndex(r, c)

    return !(
      rows[r].has(value) ||
      cols[c].has(value) ||
      boxes[boxIdx].has(value)
    )

  }

  // Helper fn to add value to board and conditions
  const addValue = (value: string, r: number, c: number) => {
    board[r][c] = value

    const boxIdx = getBoxIndex(r, c)

    rows[r].add(value)
    cols[c].add(value)
    boxes[boxIdx].add(value)
  }

  // Helper fn to remove value from board and conditions
  const removeValue = (value: string, r: number, c: number) => {
    board[r][c] = '.'

    const boxIdx = getBoxIndex(r, c)

    rows[r].delete(value)
    cols[c].delete(value)
    boxes[boxIdx].delete(value)
  }

  // Main backtrack fn
  const solve = (r: number, c: number): boolean => {
    // Base case
    // All cells filled when last row reached
    if (r === N) return true
    // Move to next row
    if (c === N) {
      return solve(r + 1, 0)
    }
    // Skip not empty cell
    if (board[r][c] !== '.') {
      return solve(r, c + 1)
    }

    // Try current cell with 1 to 9
    for (let i = 0; i < DIGITS.length; i++) {
      const newVal = DIGITS[i]

      if (isValid(newVal, r, c)) {
        addValue(newVal, r, c)

        if (solve(r, c + 1)) {
          return true
        }

        removeValue(newVal, r, c)
      }
    }

    // No valid solution
    return false
  }

  // Fill the board state
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const char = board[r][c]

      if (char === '.') continue

      addValue(char, r, c)
    }
  }

  solve(0, 0)
};

/**
 * Backtrack (Optimized)
 * T: O(9^m); S: O(1);
 * m for number of empty cells
 */
function solveSudoku2(board: string[][]): void {
  // Bit mask to reduce space.
  // MRV (Minimum Remaining Values) heuristic chooses the most constrained cell first,
  // the one with the fewest possible options, reducing unnecessary branching.

  // Bit masks
  const rowMasks = new Uint16Array(9)
  const colMasks = new Uint16Array(9)
  const boxMasks = new Uint16Array(9)

  // Helper fn to calculate box index
  const getBoxIndex = (r: number, c: number): number => {
    return Math.floor(r / 3) * 3 + Math.floor(c / 3)
  }

  // Main backtrack fn
  const solve = (): boolean => {
    let minPossibilities = 10
    let bestCell = [-1, -1]
    let bestMask = 0

    // MRV
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          // Valid check: !( (rowMasks[r] | colMasks[c] | boxMasks[boxIdx]) & (1 << (num - 1)) )
          const combinedMask = rowMasks[r] | colMasks[c] | boxMasks[getBoxIndex(r, c)]

          // Count bits that are 0
          let options = 0
          let currMask = 0
          for (let i = 0; i < 9; i++) {
            const mask = 1 << i
            if (!(combinedMask & mask)) {
              options++
              currMask |= mask
            }
          }

          if (options === 0) return false // Dead end
          if (options < minPossibilities) {
            minPossibilities = options
            bestCell = [r, c]
            bestMask = currMask
          }
        }
      }
    }

    // Base case: board full
    if (bestCell[0] === -1) return true

    const [r, c] = bestCell
    const boxIdx = getBoxIndex(r, c)

    // Try all possibilities
    for (let i = 0; i < 9; i++) {
      const mask = 1 << i
      if (bestMask & mask) {
        const val = i + 1

        board[r][c] = val.toString()
        rowMasks[r] |= mask
        colMasks[c] |= mask
        boxMasks[boxIdx] |= mask

        if (solve()) return true

        // Backtrack
        board[r][c] = '.'
        rowMasks[r] &= ~mask
        colMasks[c] &= ~mask
        boxMasks[boxIdx] &= ~mask
      }
    }

    // No valid solution
    return false
  }

  // Initialize masks with the board state
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== '.') {
        const val = parseInt(board[r][c])
        const mask = 1 << (val - 1)
        const boxIdx = getBoxIndex(r, c)

        rowMasks[r] |= mask
        colMasks[c] |= mask
        boxMasks[boxIdx] |= mask
      }
    }
  }

  solve()
};

/**
 * Tester for LeetCode 37: Sudoku Solver
 * 
 * @param solveSudoku - The function to be tested. 
 * It should modify the board in-place and return void.
 */
function runTests(solveSudoku: (board: string[][]) => void): void {
  const testCases = [
    {
      name: "Standard Sudoku Puzzle",
      input: [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
      ],
      expected: [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"]
      ]
    }
  ];

  testCases.forEach((test, index) => {
    console.log(`--- Running Test ${index + 1}: ${test.name} ---`);

    // Create a deep copy to keep the original for comparison
    const boardToSolve = test.input.map(row => [...row]);

    const startTime = Date.now();
    solveSudoku(boardToSolve);
    const endTime = Date.now();

    const isPassed = JSON.stringify(boardToSolve) === JSON.stringify(test.expected);

    if (isPassed) {
      console.log(`Result: PASSED (Time: ${endTime - startTime}ms)`);
    } else {
      console.error(`Result: FAILED`);
      console.error("Expected:");
      console.error(JSON.stringify(test.expected))
      console.error("Received:");
      console.error(JSON.stringify(boardToSolve))
    }
    console.log("------------------------------------------\n");
  });
}

runTests(solveSudoku2);
