// 11. Container With Most Water

/**
 * Two Pointer
 * T: O(n); S: O(1); 
 */
function maxArea(height: number[]): number {
  // For two given line at index x and y
  // (water volume) = (container height) * (container width)
  // = min(height[x], height[y]) * |x - y|

  // Two pointer
  let left = 0
  let right = height.length - 1
  let res = 0

  while (left < right) {
    // Calculate current volume
    const currentHeight = Math.min(height[left]!, height[right]!)
    const currentWidth = right - left
    const volume = currentHeight * currentWidth

    // Update max area
    res = Math.max(res, volume)

    // Move pointer to find the next possible larger area
    if (height[left]! <= height[right]!) {
      // Find a higher left
      // if (Left height) == (Right height), move left as default
      left++
    } else {
      // Find a higher right
      right--
    }
  }

  return res
};

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
const expected = 49
// const height = [1, 1]
// const expected = 1
// const height = [1, 7, 2, 5, 4, 7, 3, 6]
// const expected = 36
// const height = [2, 2, 2]
// const expected = 4

const ans = maxArea(height)

console.log('Input: ', height)
console.log('expected: ', expected)
console.log('answer: ', ans)
