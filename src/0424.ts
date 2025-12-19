// 424. Longest Repeating Character Replacement

/**
 * Sliding Window & Hash Map
 * T: O(n); S: O(1);
 */
function characterReplacement(s: string, k: number) {
  // Within a valid window, all characters should be replaced with
  // the most frequent character.
  // Therefore a valid window satisfies:
  // (Window size) - (Count of the most frequent character) <= k

  // Map to store frequency count of each characters
  const frequencyMap = new Map<string, number>()
  // Count of most frequent character inside the window
  let maxFrequency = 0
  // Max length of substr
  let maxLength = 0
  // Pointers
  let l = 0

  for (let r = 0; r < s.length; r++) {
    const rChar = s[r]!

    // Increment frequency
    frequencyMap.set(rChar, (frequencyMap.get(rChar) ?? 0) + 1)
    // Find and update max count
    maxFrequency = Math.max(maxFrequency, frequencyMap.get(rChar)!)

    // Move left pointer if the window is invalid
    if ((r - l + 1) - maxFrequency > k) {
      const lChar = s[l]!
      frequencyMap.set(lChar, frequencyMap.get(lChar)! - 1)
      l++
      // We don't need to decrease `maxFrequency` here because we are only interested in the max `maxFrequency`.
      // If the window shrinks (left++), any new valid window will have length <= current maxLength.
    }

    // Update `maxLength`
    maxLength = Math.max(maxLength, r - l + 1)
  }

  return maxLength
};

const s = "ABAB", k = 2
const expected = 4
// const s = "AABABBA", k = 1
// const expected = 4
// const s = "AAABABB", k = 1
// const expected = 5
// const s = "AABBCB", k = 1
// const expected = 4
// const s = "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF", k = 1
// const expected = 4
// const s = "ABBCBBACACACAA", k = 1
// const expected = 5

const ans = characterReplacement(s, k)

console.log('Input: ', s, k)
console.log('expected: ', expected)
console.log('answer: ', ans)
