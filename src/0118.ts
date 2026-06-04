// 118. Pascal's Triangle

/**
 * Iteration: Combinatorial Formula
 * T: O(n ^ 2): S: O(n ^ 2);
 */
function generate(numRows: number): number[][] {
  const res: number[][] = [[1]]

  for (let i = 1; i < numRows; i++) {
    const prev = res[i - 1]!

    const curr = [1]

    // Add the mid numbers
    // Number of elements to insert besides starting one and ending one: i - 1
    for (let j = 1; j < prev.length; j++) {
      curr.push(prev[j]! + prev[j - 1]!)
    }

    // Append the final one
    curr.push(1)

    // Add the generated current row to result
    res.push(curr)
  }

  return res
};

/**
 * Recursion
 * T: O(n ^ 2): S: O(n ^ 2);
 * 
 * (Possible stack overflow with large rows)
 */
function generate2(numRows: number): number[][] {
  // Edge case
  if (numRows === 0) return []

  // Base case: 1 row
  if (numRows === 1) return [[1]]

  // Recursion
  const rows = generate2(numRows - 1)
  // Get the last row
  const lastRow = rows[rows.length - 1]!
  const currRow = new Array(numRows).fill(1)

  // Calculate current row with last row
  for (let i = 1; i < lastRow.length; i++) {
    currRow[i] = lastRow[i]! + lastRow[i - 1]!
  }

  // Push current row to all rows
  rows.push(currRow)

  return rows
};

const numRows = 5
const expected = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1]
]

const ans = generate2(numRows)

console.log('Input: ', numRows)
console.log('expected: ', expected)
console.log('answer: ', ans)
