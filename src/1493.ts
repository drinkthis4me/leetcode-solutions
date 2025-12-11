// 1493. Longest Subarray of 1's After Deleting One Element

/**
 * Sliding Window
 * T: O(n); S: O(1);
 */
function longestSubarray(nums: number[]): number {
  // nums = [0,1,1,1,0,1,1,0,1]
  //           L
  //                       R

  // R = 0
  // zeroCount = 1
  // maxLength = R - L + 1 - zeroCount 
  // = 0 - 0 + 1 - 1 = 0
  // R = 1
  // maxLength = 1
  // R = 2
  // maxLength = 2
  // R = 3
  // maxLength = 3
  // R = 4
  // zeroCount = 2 (invalid window)
  // L = 1
  // zeroCunt = 1 (valid window again)
  // maxLength = 4 - 1 + 1 - 1 = 3
  // R = 5
  // maxLength = 4
  // R = 6
  // maxLength = 5
  // R = 7
  // zeroCount = 2 (invalid window)
  // L = 2
  // L = 3
  // L = 4
  // zeroCount = 1 (valid window again)
  // currentLength = 7 - 4 = 3 (Less than maxLength. Do not update max length.)
  // R = 8
  // currentLength = 8 - 4 = 4
  // Return `maxLength` which is 5.

  let left = 0
  let zeroCount = 0
  let maxLength = 0

  for (let right = 0; right < nums.length; right++) {
    // Expand window
    const rightNum = nums[right]!
    if (rightNum === 0) {
      zeroCount++
    }

    // Shrink window if invalid
    while (zeroCount > 1) {
      const leftNum = nums[left]!
      if (leftNum === 0) {
        zeroCount--
      }
      left++
    }

    // Check current valid window length
    // (Current length) = (Right index) - (Left index) + 1 - (Number of removed zero, 1)
    const currentLength = right - left
    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
};

const nums = [0, 1, 1, 1, 0, 1, 1, 0, 1]

const expected = 5

const output = longestSubarray(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)