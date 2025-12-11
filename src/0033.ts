// 33. Search in Rotated Sorted Array
function search(nums: number[], target: number): number {
  // Binary Search

  // [4, 5, 6, 7, 0, 1, 2]
  //  L
  //           M
  //                    R

  // Middle number is not the target.
  // We need to determine which half to discard.
  // Even the array is rotated, there will always be one sorted half.
  // In this case, [L...M] is sorted and [M...R] is not.
  // (We know this by comparing `L-M` and `M-R`.)
  // If target is in [L...M], discard right part.
  // Otherwise, discard left part.

  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const midNum = nums[mid]!

    // Middle value check
    if (midNum === target) {
      return mid
    }

    const leftNum = nums[left]!
    const rightNum = nums[right]!

    // Determine which half is sorted
    if (leftNum <= midNum) {
      // [left...mid] is sorted
      if (leftNum <= target && target < midNum) {
        // `target` is in [left...mid] range
        // Discard right part
        right = mid - 1
      } else {
        // `target` is in [(mid + 1)...right] range
        // Discard left part
        left = mid + 1
      }
    } else {
      // [mid...right] is sorted
      if (midNum < target && target <= rightNum) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }

  // Cannot find target
  return -1
};


const nums = [4, 5, 6, 7, 0, 1, 2]
const target = 0
const expected = 4
// const nums = [5, 1, 3]
// const target = 3
// const expected = 2

const output = search(nums, target)

console.log('Input: ', nums, target)
console.log('expected: ', expected)
console.log('output: ', output)