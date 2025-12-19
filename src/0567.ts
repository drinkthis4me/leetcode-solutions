// 567. Permutation in String

/**
 * Hash Map
 * T: O(m * n); S: O(1); 
 */
function checkInclusion(s1: string, s2: string): any {
  // Frequency map for `s1`
  const countS1 = new Map<string, number>()
  for (const c of s1) {
    countS1.set(c, (countS1.get(c) ?? 0) + 1)
  }

  // Iterate left pointer through `s2`
  // SLOW: Restart counting for each position
  for (let i = 0; i < s2.length; i++) {
    const countS2 = new Map<string, number>()
    let count = 0

    // Start right pointer at `i`
    // Advance right pointer until `countS2` is invalid or satisfies `countS1`
    for (let j = i; j < s2.length; j++) {
      const char = s2[j]!

      // Increment current char count
      const charCount = (countS2.get(char) ?? 0) + 1
      countS2.set(char, charCount)

      // Compare two maps
      if ((countS1.get(char) ?? 0) < charCount) {
        // Current substring in `s2` is invalid
        // Number of characters does not support the current substring
        break
      }
      if ((countS1.get(char) ?? 0) === charCount) {
        count++
      }

      // Check if all chars are satisfied in both map
      if (count === countS1.size) {
        return true
      }
    }
  }

  return false
};

/**
 * Sliding Window & Hash Map
 * T: O(n); S: O(1);
 */
function checkInclusion2(s1: string, s2: string): any {
  // Fixed size sliding window with length of `s1.length`

  // Edge Case
  if (s1.length > s2.length) return false

  // Arrays of 26 ('a' - 'z') to store character frequencies
  const s1Count = new Array(26).fill(0)
  const s2Count = new Array(26).fill(0)
  const CHAR_CODE_A = 'a'.charCodeAt(0)

  // Initialize map for two strings
  // Map for `s1` will be fixed;
  // Map for `s2` will change as the window slides
  for (let i = 0; i < s1.length; i++) {
    // Count the char frequencies for both windows
    // Index by difference of char code 'a'
    s1Count[s1.charCodeAt(i) - CHAR_CODE_A]++
    s2Count[s2.charCodeAt(i) - CHAR_CODE_A]++
  }

  // Helper fn to check window validity (two maps are matched)
  // T: O(26)
  const checkMatch = (): boolean => {
    for (let i = 0; i < 26; i++) {
      if (s1Count[i] !== s2Count[i]) {
        return false
      }
    }
    return true
  }

  // Slide the window over `s2`
  // Checking matches costs O(26). Can be improved.
  for (let i = 0; i < s2.length - s1.length; i++) {
    // Check if the window is valid
    if (checkMatch()) return true

    // Update window map:
    // Remove left-most char
    s2Count[s2.charCodeAt(i) - CHAR_CODE_A]--
    // Add the new char
    s2Count[s2.charCodeAt(i + s1.length) - CHAR_CODE_A]++
  }

  // Check one final time
  return checkMatch()
}

/**
 * Sliding Window & Hash Map (Improved)
 * T: O(n); S: O(1);
 */
function checkInclusion3(s1: string, s2: string): any {
  // Fixed size sliding window with length of `s1.length`

  // Edge Case
  if (s1.length > s2.length) return false

  // Arrays of 26 ('a' - 'z') to store character frequencies
  // Space: O(2 * 26). Can be improved with a single diff array.
  const s1Count = new Array(26).fill(0)
  const s2Count = new Array(26).fill(0)
  const CHAR_CODE_A = 'a'.charCodeAt(0)

  // Initialize map for two strings
  // Map for `s1` will be fixed;
  // Map for `s2` will change as the window slides
  for (let i = 0; i < s1.length; i++) {
    // Count the char frequencies for both windows
    // Index by difference of char code 'a'
    s1Count[s1.charCodeAt(i) - CHAR_CODE_A]++
    s2Count[s2.charCodeAt(i) - CHAR_CODE_A]++
  }


  // A counter to keep track of matches between `s1Count` and `s2Count`
  let matches = 0
  for (let i = 0; i < 26; i++) {
    if (s1Count[i] !== s2Count[i]) {
      matches++
    }
  }

  // Slide the window over `s2`
  let l = 0
  for (let r = s1.length; r < s2.length; r++) {
    if (matches === 26) return true

    // Increment count for right char
    const rightCharIdx = s2.charCodeAt(r) - CHAR_CODE_A
    s2Count[rightCharIdx]++
    // Adjust `matches` count
    if (s1Count[rightCharIdx] === s2Count[rightCharIdx]) {
      matches++
    } else if (s1Count[rightCharIdx] + 1 === s2Count[rightCharIdx]) {
      // `s2Count` was already equal to `s1Count` before the increment
      // Now we have a mismatch
      matches--
    }

    // Decrement count for left char (char leaving window)
    const leftCharIdx = s2.charCodeAt(l) - CHAR_CODE_A
    s2Count[leftCharIdx]--
    // Adjust `matches` count
    if (s1Count[leftCharIdx] === s2Count[leftCharIdx]) {
      matches++
    } else if (s1Count[leftCharIdx] + 1 === s2Count[leftCharIdx]) {
      matches--
    }

    // Advance left pointer with right pointer to maintain a fixed window length
    l++
  }

  return matches === 26
}

/**
 * Sliding Window & Hash Map (Optimized)
 * T: O(n); S: O(1);
 */
function checkInclusion4(s1: string, s2: string): any {
  // Edge Case
  if (s1.length > s2.length) return false

  // The 'diff' array tracks: (Count in `s1`) - (Count in current window of `s2`)
  const diff = new Array(26).fill(0)
  const CHAR_CODE_A = 'a'.charCodeAt(0)

  // Initialize the diff array for the first window
  for (let i = 0; i < s1.length; i++) {
    diff[s1.charCodeAt(i) - CHAR_CODE_A]++
    diff[s2.charCodeAt(i) - CHAR_CODE_A]--
  }

  // Count how many characters are matched
  let matches = 0
  for (let i = 0; i < 26; i++) {
    if (diff[i] === 0) matches++
  }

  // Check first window's matches
  if (matches === 26) return true

  // Slide the window
  for (let i = 0; i < s2.length - s1.length; i++) {
    const leftCharIdx = s2.charCodeAt(i) - CHAR_CODE_A
    const rightCharIdx = s2.charCodeAt(i + s1.length) - CHAR_CODE_A

    // Process left char leaving the window:
    // If it was already a match, we are about to break it
    if (diff[leftCharIdx] === 0) matches--
    // Perform the update
    diff[leftCharIdx]++
    // If it is now a match, increment
    if (diff[leftCharIdx] === 0) matches++

    // Process right char entering the window:
    if (diff[rightCharIdx] === 0) matches--
    diff[rightCharIdx]--
    if (diff[rightCharIdx] === 0) matches++

    // Check matches
    if (matches === 26) return true
  }

  return false
}


const s1 = "ab", s2 = "eidbaooo"
const expected = true
// const s1 = "ab", s2 = "eidboaoo"
// const expected = false
// const s1 = "abc", s2 = "lecabee"
// const expected = true
// const s1 = "abc", s2 = "lecaabee"
// const expected = false

const ans = checkInclusion4(s1, s2)

console.log('Input: ', s1, s2)
console.log('expected: ', expected)
console.log('answer: ', ans)
