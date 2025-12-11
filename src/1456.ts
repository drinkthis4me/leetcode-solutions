// 1456. Maximum Number of Vowels in a Substring of Given Length

/**
 * Sliding Window w/ Fixed Length
 * T: O(n); S: O(1);
 */
function maxVowels(s: string, k: number): number {
  // k = 3
  // s = 'abciiidef'
  //       L
  //         R
  // R = 0
  // current = 1
  // R = 1
  // R = 2
  // max = current = 1 ('abc')
  // L = 1 
  // current = 0 ('bc')
  // R = 3 
  // max = current = 1 ('bci')
  // L = 2
  // current = 1 ('ci')
  // R = 4
  // max = current = 2 ('cii')
  // L = 3
  // current = 2 ('ii')
  // R = 5
  // max = current = 3 ('iii')
  // L = 4
  // current = 2 ('ii')
  // R = 6
  // current = 2 ('iid') < max
  // L = 5
  // current = 1 ('id')
  // R = 7
  // current = 2 ('ide') < max


  // Look up map for vowels
  const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])
  // Pointers for window 
  let left = 0
  // Max vowel count
  let maxVowels = 0
  // Current vowel count
  let currentVowels = 0

  // Move right pointer (expand window) until it reaches the end
  for (let right = 0; right < s.length; right++) {
    // Update current count
    if (VOWELS.has(s[right]!)) {
      currentVowels++
    }

    // Maintain window size
    if (right - left + 1 === k) {
      maxVowels = Math.max(maxVowels, currentVowels)

      // Stop loop if max possible count reached
      if (maxVowels === k) break

      // Shrink window and update count
      if (VOWELS.has(s[left]!)) {
        currentVowels--
      }
      left++
    }
  }

  return maxVowels
};

const s = "abciiidef", k = 3

const expected = 3

const output = maxVowels(s, k)

console.log('Input: ', s, k)
console.log('expected: ', expected)
console.log('output: ', output)