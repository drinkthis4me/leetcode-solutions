// 84. Largest Rectangle in Histogram

/**
 * Monotonic Increasing Stack - Two Passes
 * T: O(n); S: O(n);
 */
function largestRectangleArea(heights: number[]): number {
  // (Area) = (Height) * (Width)
  //        = (Height) * ((Right boundary) - (Left boundary) - 1)
  //        = heights[i] * (rightBoundary[i] - leftBoundary[i] - 1)

  // heights       = [2, 1, 5, 6, 2, 3]
  // leftBoundary  = [-1, -1, 1, 2, 1, 4]
  // rightBoundary = [1, 6, 4, 4, 6, 6]
  // area          = [2, 6, 10, 6, 8, 3]

  const n = heights.length

  // Edge Case
  if (n === 0) return 0

  // Boundary arrays
  const leftBoundaries: number[] = new Array(n).fill(-1)
  const rightBoundaries: number[] = new Array(n).fill(n)
  // Stack to find boundaries
  let stack: number[] = []

  // Find left boundaries: First bar to the left short than the current one
  for (let i = 0; i < n; i++) {
    // Pop all bar heights >= current bar height
    while (
      stack.length > 0 &&
      heights[stack[stack.length - 1]!]! >= heights[i]!
    ) {
      stack.pop()
    }

    // Set left boundary to index of the bar first shorter than the current bar.
    // If no left bar shorter than the current bar (out of bound), set boundary to -1.
    leftBoundaries[i] = stack.length === 0
      ? -1
      : stack[stack.length - 1]!

    stack.push(i)
  }

  // Clear stack before finding right boundaries
  stack = []

  // Find right boundaries
  for (let i = n - 1; i >= 0; i--) {
    while (
      stack.length > 0 &&
      heights[stack[stack.length - 1]!]! >= heights[i]!
    ) {
      stack.pop()
    }

    rightBoundaries[i] = stack.length === 0
      ? n
      : stack[stack.length - 1]!

    stack.push(i)
  }


  // Calculate max area
  let maxArea = 0

  for (let i = 0; i < n; i++) {
    const height = heights[i]!
    const width = rightBoundaries[i]! - leftBoundaries[i]! - 1
    const area = height * width

    maxArea = Math.max(maxArea, area)
  }

  return maxArea
};

/**
 * Monotonic Increasing Stack - One Pass
 * T: O(n); S: O(n);
 */
function largestRectangleArea2(heights: number[]): number {
  const n = heights.length

  if (n === 0) return 0

  // Stack to store index
  const stack: number[] = []
  let maxArea = 0

  // Iterate up to `n` (inclusive) to handle the remaining elements
  for (let i = 0; i <= n; i++) {
    // Calculate area when:
    // 1. We reached the end (i === n).
    // 2. The current bar is shorter than then top.
    while (
      stack.length > 0 &&
      (i === n || heights[stack[stack.length - 1]!]! >= heights[i]!)
    ) {
      const top = stack.pop()!
      const height = heights[top]!
      // Width boundary if stack is empty: [-1, i]
      // Width boundary if stack is not empty: [i, top]
      const width = stack.length === 0
        ? i
        : i - stack[stack.length - 1]! - 1

      maxArea = Math.max(maxArea, height * width)
    }

    // Push current bar index
    stack.push(i)
  }

  return maxArea
}


const heights = [2, 1, 5, 6, 2, 3]
const expected = 10
// const heights = [2, 4]
// const expected = 4

const ans = largestRectangleArea2(heights)

console.log('Input: ', heights)
console.log('expected: ', expected)
console.log('answer: ', ans)
