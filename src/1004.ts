// 1004. Max Consecutive Ones III

/**
 * Sliding Window
 * T: O(n); S: O(1);
 */
function longestOnes(nums: number[], k: number): number {
  // Intuition:
  // Expand window:
  // Move right pointer until window is invalid (zero count > k)
  // and right pointer reaches the end.
  // Shrink window:
  // Move left pointer until window is valid (zero count <= k).

  // --- Start Dry Run ---
  // k = 2
  // nums = [1,1,1,0,0,0,1,1,1,1,0]
  //                 L
  //                   R

  // R = 0 ~ 4
  // Window is valid. Update max length.

  // R = 5
  // Window is invalid. Move L until valid.

  // L = 1. Invalid.

  // L = 2. Invalid.

  // L = 3. 
  // `nums[L] === 0`
  // Update zero count.
  // Window is valid again.
  // Update max length.

  // Continue moving R ...
  // --- End Dry Run ---

  // Pointers for window
  let left = 0
  // Max length of window
  let maxLength = 0
  // Zero count in window (should always <= k)
  let zeroCount = 0

  for (let right = 0; right < nums.length; right++) {
    // Expand window
    const rightNum = nums[right]!

    if (rightNum === 0) {
      zeroCount++
    }

    // Shrink window if current window is invalid
    while (zeroCount > k) {
      const leftNum = nums[left]!
      if (leftNum === 0) {
        zeroCount--
      }
      // Move left pointer
      left++
    }

    // Window is valid here
    // Calculate the window length
    const currentLength = right - left + 1
    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
};

const nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]

const k = 2

const expected = 6

const output = longestOnes(nums, k)

console.log('Input: ', nums, k)
console.log('expected: ', expected)
console.log('output: ', output)