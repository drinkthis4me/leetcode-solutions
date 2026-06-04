// 242. Valid Anagram

/**
 * Hash Set (Works for Unicode characters)
 * T: O(n); S: O(n);
 */
function isAnagram(s: string, t: string): boolean {
  // Normalize the strings
  const sNormalized = s.normalize()
  const tNormalized = t.normalize()

  // Array.from() or spreading to get the true length
  const charsS = [...sNormalized];
  const charsT = [...tNormalized];

  // Edge Case: Different length
  if (charsS.length !== charsT.length) return false

  // Frequency map for [character, frequency]
  const counts = new Map<string, number>()

  // Count the first string, s
  for (const charS of charsS) {
    counts.set(charS, (counts.get(charS) || 0) + 1)
  }

  // Count the second string, t
  for (const charT of charsT) {
    // Exit false if find a unique character
    if (!counts.has(charT)) return false

    const currentCount = counts.get(charT)!

    if (currentCount === 1) {
      // Remove entry
      counts.delete(charT)
    } else {
      // Decrement by one
      counts.set(charT, currentCount - 1)
    }
  }

  // Check frequency map. Should be zero.
  return counts.size === 0
}

/**
 * Frequency Array
 * T: O(n + m); S: O(1);
 */
function isAnagram2(s: string, t: string): boolean {
  // Edge case: Different length
  if (s.length !== t.length) return false

  // Create a frequency array of size 26
  const count = new Array(26).fill(0)

  for (let i = 0; i < s.length; i++) {
    // Increment frequency for s
    // Decrement frequency for t
    count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++
    count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--
  }

  // Check frequency for each character. Should be zero.
  return count.every(c => c === 0)
};

const s = "anagram", t = "nagaram"
const expected = true

// const s = "rat", t = "car"
// const expected = false

const ans = isAnagram(s, t)

console.log('Input: ', s)
console.log('Input: ', t)
console.log('expected: ', expected)
console.log('answer: ', ans)
