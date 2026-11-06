// 438. Find All Anagrams in a String

// Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
//
// Example 1:
// Input: s = "cbaebabacd", p = "abc"
// Output: [0,6]
// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".
//
// Example 2:
// Input: s = "abab", p = "ab"
// Output: [0,1,2]
// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".

/**
 * Sliding Window
 * T: O(n); S:O(26);
 */
function findAnagrams(s: string, p: string): number[] {
  const ALPHABET_SIZE = 26
  const A_CODE = 'a'.charCodeAt(0)

  const counts: number[] = new Array(ALPHABET_SIZE).fill(0)

  for (let i = 0; i < p.length; i++) {
    const idx = p.charCodeAt(i) - A_CODE
    counts[idx]++
  }

  // Count of unique characters
  // Reaches zero when the current window is valid anagram
  let diff = 0
  for (let i = 0; i < ALPHABET_SIZE; i++) {
    if (counts[i] > 0) {
      diff++
    }
  }

  const res: number[] = []

  // Sliding window with l and r pointer
  let l = 0
  for (let r = 0; r < s.length; r++) {
    // Add s[r] to the current window
    const rCharIdx = s.charCodeAt(r) - A_CODE
    counts[rCharIdx]--

    if (counts[rCharIdx] === 0) {
      diff--
    }

    // Check window once window size is valid
    if (r - l + 1 === p.length) {
      if (diff === 0) {
        res.push(l)
      }

      // Remove leaving window char: s[l]
      const lCharIdx = s.charCodeAt(l) - A_CODE
      if (counts[lCharIdx] === 0) {
        diff++
      }
      counts[lCharIdx]++
      l++
    }
  }

  return res
}

type SolutionFn = (s: string, p: string) => number[]

interface TestCase {
  s: string
  p: string
  expected: number[]
}

function runTests(solution: SolutionFn): void {
  const testCases: TestCase[] = [
    {
      s: 'cbaebabacd',
      p: 'abc',
      expected: [0, 6]
    },
    {
      s: 'abab',
      p: 'ab',
      expected: [0, 1, 2]
    },
    {
      s: 'a',
      p: 'ab',
      expected: []
    },
    {
      s: 'baa',
      p: 'aa',
      expected: [1]
    },
    {
      s: 'abacbabc',
      p: 'abc',
      expected: [1, 2, 3, 5]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    const { s, p, expected } = test
    const actual = solution(s, p)

    const isEqual =
      actual.length === expected.length &&
      actual.every((val, i) => val === expected[i])

    if (isEqual) {
      console.log(`✅ Test Case ${index + 1}: PASSED`)
      passedCount++
    } else {
      console.error(
        `❌ Test Case ${index + 1}: FAILED\n` +
        `   Input:    s = "${s}", p = "${p}"\n` +
        `   Expected: ${JSON.stringify(expected)}\n` +
        `   Got:      ${JSON.stringify(actual)}`
      )
    }
  })

  console.log(`\nSummary: ${passedCount} / ${testCases.length} tests passed.`)
}

runTests(findAnagrams)
