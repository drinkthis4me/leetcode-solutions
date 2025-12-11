// 162. Find Peak Element

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function findPeakElement(nums: number[]): number {
  const n = nums.length

  let left = 0
  let right = n - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    if (nums[mid]! > nums[mid + 1]!) {
      // Mid is greater than mid + 1
      // Possible peak found.
      // Discard right and find larger elements in the left part
      right = mid
    } else {
      left = mid + 1
    }
  }

  // left === right
  return left
};

const nums = [1, 2, 1, 3, 5, 6, 4]

const expected = 5 // 1 or 5

const output = findPeakElement(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)