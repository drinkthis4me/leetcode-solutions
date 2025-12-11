// 42. Trapping Rain Water

/**
 * Precompute Arrays
 * T: O(n); S: O(n);
 */
function trap(height: number[]): number {
  // Intuition:
  // (Water volume of a bar at index i) = min(leftMax[i], rightMax[i]) - height[i]
  // leftMax[i] = (Tallest bar from start to i)
  // rightMax[i] = (Tallest bar from i to end)
  // Precomputing max left heights and max right heights removes the repeating work.

  // Example 1: [2, 1, 3]
  // (Water at index 1) = min(2, 3) - 1 = 1
  // Example 2: [2, 2, 2]
  // (Water at index 1) = min(2, 2) - 2 = 0
  // Example 3: [2, 3, 2]
  // (Water at index 1) = min(3, 3) - 3 = 0

  const n = height.length

  // Edge Case: cannot trap water
  if (n <= 2) return 0

  let res = 0

  const leftMax = new Array(n).fill(0)
  const rightMax = new Array(n).fill(0)

  // [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
  // leftMax:
  // [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3]
  // rightMax:
  // [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1]

  // Calculate left max for each index
  leftMax[0] = height[0]
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]!)
  }

  // Calculate right max for each index
  rightMax[n - 1] = height[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]!)
  }

  // Calculate trapped water
  for (let i = 0; i < n; i++) {
    res += Math.min(leftMax[i], rightMax[i]) - height[i]!
  }

  return res
};

/**
 * Monotonic Decreasing Stack
 * T: O(n); S: O(n);
 */
function trap2(height: number[]): number {
  const n = height.length

  // Edge Case: cannot trap water
  if (n <= 2) return 0

  // Stack that stores indices of height
  const stack: number[] = []
  let res = 0
  // Pointer to current bar's index
  let i = 0

  while (i < n) {
    // Check top of the stack:
    // If the current bar is higher than the top, we've found a valley.
    // Current bar is the right wall.
    // Top of the stack is the floor.
    // New top will be the left wall.
    while (
      stack.length > 0 &&
      height[i]! > height[stack.at(-1)!]!
    ) {
      const floorIndex: number = stack.pop()!

      // Break if no left wall
      if (stack.length === 0) break

      const leftIndex: number = stack.at(-1)!
      const rightIndex = i

      const h = Math.min(height[leftIndex]!, height[rightIndex]!) - height[floorIndex]!
      const w = rightIndex - leftIndex - 1
      const volume = h * w

      res += volume
    }

    // Push the current bar's index to stack
    // Maintain the monotonic decreasing property
    stack.push(i)
    // Move to next bar
    i++
  }

  return res
};

/**
 * Two Pointers
 * T: O(n); S: O(1);
 */
function trap3(height: number[]): number {
  const n = height.length

  // Edge Case: cannot trap water
  if (n <= 2) return 0

  let res = 0
  // Pointers
  let left = 0
  let right = n - 1
  // Initialize max heights
  let maxLeft = height[left]!
  let maxRight = height[right]!

  while (left < right) {
    if (maxLeft < maxRight) {
      // Move to the next bar
      left++
      // Water level at `left + 1` is guaranteed to be limit by only `maxLeft`.
      maxLeft = Math.max(maxLeft, height[left]!)
      // Calculate: (Water level i) = (Max wall) - height[i]
      // The trapped water is always >= 0 because the water level is capped by `maxLeft`
      res += maxLeft - height[left]!
    } else {
      right--
      maxRight = Math.max(maxRight, height[right]!)
      res += maxRight - height[right]!
    }
  }

  return res
};

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
const expected = 6
// const height = [4, 2, 0, 3, 2, 5]
// const expected = 9
// const height = [0, 2, 0, 3, 1, 0, 1, 3, 2, 1]
// const expected = 9


const ans = trap3(height)

console.log('Input: ', height)
console.log('expected: ', expected)
console.log('answer: ', ans)
