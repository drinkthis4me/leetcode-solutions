// 154. Find Minimum in Rotated Sorted Array II

/**
 * Binary Search
 * T: O(n); S: O(1);
 */
function findMin(nums: number[]): number {
  // [0, 1, 2, 2, 2, 2, 3] -> Find min in left part. Discard right.
  // [1, 2, 2, 2, 2, 3, 0] -> Find min in right part. Discard left and mid.
  // [2, 2, 2, 0, 2] -> Min could either be in left or right part.
  // [2, 0, 2, 2, 2] -> Min could either be in left or right part.

  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    const midNum = nums[mid]!
    const rightNum = nums[right]!

    if (midNum > rightNum) {
      // Discard left and mid
      left = mid + 1
    } else if (midNum < rightNum) {
      // Discard right 
      right = mid
    } else {
      // `midNum === rightNum`
      // We cannot tell if min is in left or right part.
      // Discard only `nums[right]` for next check.
      // Time complexity can degrade to O(n) in the worst case when all elements are the same.
      right--
    }
  }

  // `left === right`
  return nums[left]!
};

// const nums = [1, 3, 5]
// const expected = 1
// const nums = [2, 2, 2, 0, 1]
// const expected = 0
// const nums = [2, 2, 2, 0, 2]
// const expected = 0
const nums = [2, 0, 2, 2, 2]
const expected = 0

const output = findMin(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)