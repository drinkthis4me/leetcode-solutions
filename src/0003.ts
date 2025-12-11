// 3. Longest Substring Without Repeating Characters

/**
 * Sliding Window & Set 
 * T: O(n); O(m);
 */
function lengthOfLongestSubstring(s: string): number {
  // Set to keep track unique characters
  const uniqueChar = new Set<string>()
  let maxLength = 0
  // Left pointer
  let l = 0

  for (let r = 0; r < s.length; r++) {
    const char = s[r]!

    // Find repeating char
    while (uniqueChar.has(char)) {
      // Decrease window size until valid
      uniqueChar.delete(s[l]!)
      l++
    }

    // Expand window
    uniqueChar.add(char)

    // Calculate and update `maxLength`
    const currentLength = r - l + 1
    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
};

/**
 * Sliding Window & Map - Optimized 
 * T: O(n); O(m);
 */
function lengthOfLongestSubstring2(s: string): number {
  // Instead of removing characters one by one when we see a repeat,
  // we can jump the left pointer directly to the correct position.

  // "abcabcbb"
  //     L
  //       R
  // map = { a: 3, b: 4, c: 5 }
  // When we move R to index 6, repeating "b" occurred.
  // Move L from index 3 to current "b"'s next index (4 + 1)

  // Map to keep track unique characters and its last index
  const uniqueChar = new Map<string, number>()
  let maxLength = 0
  // Left pointer
  let l = 0

  for (let r = 0; r < s.length; r++) {
    const char = s[r]!

    // Find repeating char
    if (uniqueChar.has(char)) {
      l = Math.max(l, uniqueChar.get(char)! + 1)
    }

    // Expand window
    uniqueChar.set(char, r)

    // Calculate and update `maxLength`
    const currentLength = r - l + 1
    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
};

const s = "abcabcbb"
const expected = 3
// const s = "bbbbb"
// const expected = 1
// const s = "pwwkew"
// const expected = 3
// const s = "zxyzxyz"
// const expected = 3

const ans = lengthOfLongestSubstring2(s)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('answer: ', ans)
