// 410. Split Array Largest Sum

/**
 * Binary Search
 * T: O(n log(sum(nums))); S: O(1);
 */
function splitArray(nums: number[], k: number): number {
  // Max element
  let max = 0
  // Sum of all elements
  let sum = 0

  for (const n of nums) {
    max = Math.max(max, n)
    sum += n
  }

  // Edge Case
  if (k === 1) {
    return sum
  }

  // Helper fn
  // Checks if the array can be split into at most 'k' subarrays
  // such that the sum of each subarray is at most 'targetSum'.
  const canSplit = (targetSum: number): boolean => {
    let currentSum = 0
    let subarrayCount = 1

    for (const n of nums) {
      if (currentSum + n <= targetSum) {
        // Add this number to current subarray's sum
        currentSum += n
      } else {
        // Cannot include this number in current subarray
        // Start a new subarray
        subarrayCount++
        currentSum = n

        // Check if exceeded the allowed number of splits (`k`)
        if (subarrayCount > k) {
          return false
        }
      }
    }

    return true
  }

  // Binary search
  // The possible range for the largest sum is bounded: [(Max element), (Sum of all elements)]
  // Example:
  // nums = [1, 2, 3, 4, 5]
  // (Min possible largest sum) = 5 (with `k = 4`)
  // (Max possible largest sum) = 15 (with `k = 1`)
  let left = max
  let right = sum
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (canSplit(mid)) {
      // `mid` is a possible largest sum
      right = mid - 1
    } else {
      // `mid is too small to split into `k` or fewer subarrays
      left = mid + 1
    }
  }

  // Search converged: `left === right + 1`
  return left
};

const nums = [7, 2, 5, 10, 8], k = 2
const expected = 18
// const nums = [1, 2, 3, 4, 5], k = 2
// const expected = 9
// const nums = [1, 2, 3, 4, 5], k = 2
// const expected = 6

const output = splitArray(nums, k)

console.log('Input: ', nums, k)
console.log('expected: ', expected)
console.log('output: ', output)