// 153. Find Minimum in Rotated Sorted Array

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function findMin(nums: number[]): number {
  // Binary Search

  // [0, 1, 2, 3, 4, 5, 6] -> Discard right
  // [4, 5, 6, 7, 0, 1, 2] -> Discard left
  // [6, 0, 1, 2, 3, 4, 5] -> Discard right

  // Min will form a valley with its neighbors
  // If valley exists, look for min in valley and discard the other part.
  // If no valley exist, all numbers are in ascending order. Discard right part.

  const n = nums.length
  let left = 0
  let right = n - 1

  // Loop until `left == right`
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    const midNum = nums[mid]!
    const rightNum = nums[right]!

    if (midNum > rightNum) {
      // Valley is in [(mid + 1)...right]
      // Discard mid and left
      left = mid + 1
    } else {
      // Possible valley is in [left...mid]
      // Discard right
      right = mid
    }
  }

  return nums[left]!
};

/**
 * Binary Search (template III)
 * T: O(log n); S: O(1);
 */
function findMin2(nums: number[]): number {
  // Edge Case: No elements
  if (nums.length === 0) {
    return -1
  }

  // Edge Case: Not rotated
  if (nums[0]! <= nums[nums.length - 1]!) {
    return nums[0]!
  }

  let left = 0
  let right = nums.length - 1

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2)
    const midNum = nums[mid]!
    const rightNum = nums[right]!

    if (midNum > rightNum) {
      // This means 'mid' is in the larger, left-hand portion of the rotation.
      // The minimum MUST be to the RIGHT of 'mid'.
      // Set 'left' to 'mid' to discard the sorted left part up to mid.
      left = mid
    } else {
      // This means the segment from 'mid' to 'right' is sorted (or contains the minimum).
      // The minimum might be 'mid' or to the LEFT of 'mid'.
      // Set 'right' to 'mid' to keep 'mid' as a potential candidate.
      right = mid
    }
  }

  // Post-processing
  // End condition: `left + 1 === right`
  // `nums[right]` will be the min, because we move `left` away from the min
  return Math.min(nums[left]!, nums[right]!)
}


const nums = [0, 1, 2, 3, 4, 5, 6]
// const nums = [4, 5, 6, 7, 0, 1, 2] 
// const nums = [6, 0, 1, 2, 3, 4, 5]

const expected = 0

const output = findMin(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)