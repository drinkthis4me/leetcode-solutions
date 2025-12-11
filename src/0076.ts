// 76. Minimum Window Substring

/**
 * Hash Map and Slide Window
 * T: O(m + n); S: O(k);
 */
function minWindow(s: string, t: string): string {
  // Pointers for sliding window
  let left = 0
  let right = 0
  // Map for character counts
  const windowFreq = new Map<string, number>()
  const targetFreq = new Map<string, number>()

  // Length of min substring
  let minLength = Infinity
  // Starting index fo min substring
  let minStart = 0
  // Count for matching chars in window and target
  let matchedCount = 0

  // Count all char in `t`
  for (const char of t) {
    targetFreq.set(char, (targetFreq.get(char) ?? 0) + 1)
  }
  const uniqueTargetChars = targetFreq.size

  // Move right pointer until it reaches the end of `s`
  while (right < s.length) {
    const charRight = s[right]!

    // Keep track of the count of current character
    const charRightCount = (windowFreq.get(charRight) ?? 0) + 1
    windowFreq.set(charRight, charRightCount)

    // Compare character counts in two maps
    if (
      targetFreq.has(charRight) &&
      charRightCount === targetFreq.get(charRight)
    ) {
      matchedCount++
    }

    // Shrink the window when all characters are matched
    while (matchedCount === uniqueTargetChars) {
      // Update min length if the current window is less than previous one
      const currentLength = right - left + 1
      if (currentLength < minLength) {
        minLength = currentLength
        minStart = left
      }

      // Shrink the window from the left:
      // 1. Remove left character from the current window
      const charLeft = s[left]!
      windowFreq.set(charLeft, windowFreq.get(charLeft)! - 1)
      // 2. Update matched count
      if (
        targetFreq.has(charLeft) &&
        windowFreq.get(charLeft)! < targetFreq.get(charLeft)!
      ) {
        matchedCount--
      }
      // 3. Move pointer
      left++
    }

    // Expand window from the right
    right++
  }


  return minLength === Infinity ? '' : s.slice(minStart, minStart + minLength)
};

/**
 * Hash Map and Slide Window
 * T: O(m + n); S: O(k);
 */
function minWindow2(s: string, t: string): string {
  // Map to store the required frequency count for characters in `t`
  const map = new Map<string, number>()

  for (const char of t) {
    map.set(char, (map.get(char) || 0) + 1)
  }

  // Counts how many unique characters from `t` have had their
  // required count fully met (i.e., count in `map` <= 0)
  let matched = 0
  // Left pointer for window
  let left = 0
  // Length of smallest valid window
  let minLength = s.length + 1
  // Starting index of the substr
  let minStart = 0

  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right]!

    if (map.has(rightChar)) {
      // Decrease the required count for the current character
      map.set(rightChar, map.get(rightChar)! - 1)

      // Check if the required count is met.
      // - The count goes from 1 to 0: 
      //   We have exactly matched the required quantity.
      // - The Count goes from 0 to -1:
      //   We have an excess of the required quantity.
      if (map.get(rightChar) === 0) {
        // Only mark matched when exact required count is met
        matched++
      }
    }

    while (matched === map.size) {
      // Update the min length
      if (minLength > right - left + 1) {
        minLength = right - left + 1
        minStart = left
      }

      // Shrink the window from the left
      const leftChar = s[left]!
      if (map.has(leftChar)) {
        if (map.get(leftChar) === 0) {
          // Count of character will go from 0 to 1,
          // making the current window invalid.
          // Stop shrinking by decrementing `matched` (breaking `while` loop)
          matched--
        }
        // Increase the required count
        map.set(leftChar, map.get(leftChar)! + 1)
      }
      // Move left pointer
      // Continue shrinking to find a smaller window
      left++
    }
  }

  // If `minLength` hasn't been updated, no valid window was found.
  // Otherwise, return the substr with `minStart` and `minLength`.
  return minLength > s.length ? '' : s.slice(minStart, minStart + minLength)
}

const s = "ADOBECODEBANC"
const t = "ABC"

const expected = "BANC"

const output = minWindow(s, t)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('output: ', output)
