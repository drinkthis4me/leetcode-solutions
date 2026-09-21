// 953. Verifying an Alien Dictionary

// Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
// Output: true
// Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
// Output: false
// Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
// Output: false

/**
 * Map and Iteration
 * T: O(m * n); S: O(1);
 */
function isAlienSorted(words: string[], order: string): boolean {
  // Build order map
  // order = 'cba'
  // orderArr = [2, 1, 0]
  // Weights of a-z stored in index 0-25. 'c' at index 2 has weight of 0 (first char in alien dict)
  const orderArr = new Array(26).fill(0)
  for (let i = 0; i < order.length; i++) {
    orderArr[order.charCodeAt(i) - 'a'.charCodeAt(0)] = i
  }

  // Find the first different char by comparing word by word, char by char, using orderArr
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i]
    const w2 = words[i + 1]

    for (let j = 0; j < w1.length; j++) {
      // Edge case: w1 is longer than w2
      // ["apple","app"] -> false
      if (j === w2.length) return false

      if (w1[j] !== w2[j]) {
        if (orderArr[w1.charCodeAt(j) - 'a'.charCodeAt(0)] > orderArr[w2.charCodeAt(j) - 'a'.charCodeAt(0)]) {
          return false
        }
        break
      }
    }
  }

  return true
};

type AlienSolution = (words: string[], order: string) => boolean

interface TestCase {
  words: string[]
  order: string
  expected: boolean
}

function runTests(solution: AlienSolution): void {
  const testCases: TestCase[] = [
    {
      words: ['hello', 'leetcode'],
      order: 'hlabcdefgijkmnopqrstuvwxyz',
      expected: true
    },
    {
      words: ['word', 'world', 'row'],
      order: 'worldabcefghijkmnpqstuvxyz',
      expected: false
    },
    {
      words: ['apple', 'app'],
      order: 'abcdefghijklmnopqrstuvwxyz',
      expected: false
    },
    {
      words: ['fxasxpc', 'dfbjpwxct', 'pswxlqh', 'fxasxpc'],
      order: 'abcdefghijklmnopqrstuvwxyz',
      expected: false
    }
  ]

  let passedCount = 0

  console.log('=== Running Tests for LeetCode 953 ===')
  testCases.forEach((tc, index) => {
    const actual = solution(tc.words, tc.order)
    const passed = actual === tc.expected

    if (passed) {
      passedCount++
    }

    console.log(
      `Test ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'} ` +
      `| Words: ${JSON.stringify(tc.words)} ` +
      `| Order: ${tc.order} ` +
      `| Expected: ${tc.expected} ` +
      `| Actual: ${actual}`
    )
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(isAlienSorted)
