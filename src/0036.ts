// 36. Valid Sudoku

/**
 * Arrays of Sets
 * T: O(1); S: O(1); 
 */
function isValidSudoku(board: string[][]): boolean {
  // Three conditions to check: rows, columns, and boxes
  const rows = Array.from({ length: 9 }, () => new Set<string>())
  const cols = Array.from({ length: 9 }, () => new Set<string>())
  const boxes = Array.from({ length: 9 }, () => new Set<string>())

  // Iterate through each cell and check the conditions
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const char = board[i]![j]!

      // Ignore not-number cell
      if (char === '.') continue

      // Calculate the current box index
      // boxIndex = |i / 3| * 3 + |j / 3|
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)

      // Check if the current number is already in the set
      if (
        rows[i]!.has(char) ||
        cols[j]!.has(char) ||
        boxes[boxIndex]!.has(char)
      ) {
        return false
      }

      // Add the current unique string for next cell checking
      rows[i]!.add(char)
      cols[j]!.add(char)
      boxes[boxIndex]!.add(char)
    }
  }

  return true
};

/**
 * Bitmask
 * T: O(1); S: O(1); 
 */
function isValidSudoku2(board: string[][]): boolean {
  // 1. Convert string to number to bit.
  // 2. Three arrays of 9 integers to store the check result.
  // 3. Perform bitwise AND operation to check duplicates.
  // 4. Marking as seen with bitwise OR operation.

  // Three conditions to check: rows, columns, and boxes
  const rows = new Array(9).fill(0)
  const cols = new Array(9).fill(0)
  const boxes = new Array(9).fill(0)

  // Iterate through each cell and check the conditions
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const char = board[i]![j]!

      // Ignore not-number cell
      if (char === '.') continue

      // Convert character digit to number
      const digit = +char

      // Calculate the bitmask
      // 1 is 2^1 ; 2 is 2^2 ; 9 is 2^9
      const mask = 1 << digit

      // Calculate the current box index
      // boxIndex = |i / 3| * 3 + |j / 3|
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)

      // Check if the current number is already in the set
      if (
        (rows[i] & mask) !== 0 ||
        (cols[j] & mask) !== 0 ||
        (boxes[boxIndex] & mask) !== 0
      ) {
        return false
      }

      // Mark as seen
      // Set the bit for the current digit
      rows[i] |= mask
      cols[j] |= mask
      boxes[boxIndex] |= mask
    }
  }

  return true
};

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]
const expected = true

// const board = [
//   ["8", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]
// const expected = false

const output = isValidSudoku(board)

console.log('Input: ', board)
console.log('expected: ', expected)
console.log('output: ', output)