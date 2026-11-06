// 1768. Merge Strings Alternately

// Example 1:
// Input: word1 = "abc", word2 = "pqr"
// Output: "apbqcr"
//
// Example 2:
// Input: word1 = "ab", word2 = "pqrs"
// Output: "apbqrs"
//
// Example 3:
// Input: word1 = "abcd", word2 = "pq"
// Output: "apbqcd"

/**
 * Two Pointers
 * T: O(n + m); S: O(n + m);
 */
function mergeAlternately(word1: string, word2: string): string {
  const n1 = word1.length
  const n2 = word2.length

  let p1 = 0
  let p2 = 0
  let res = ''

  while (p1 < n1 || p2 < n2) {
    if (p1 < n1) {
      res += word1[p1++]
    }
    if (p2 < n2) {
      res += word2[p2++]
    }
  }

  return res
};

/**
 * One Pointer
 * T: O(n + m); S: O(n + m);
 */
function mergeAlternately2(word1: string, word2: string): string {
  const n1 = word1.length
  const n2 = word2.length

  let p = 0
  let res = ''

  while (p < n1 || p < n2) {
    if (p < n1) {
      res += word1[p]
    }
    if (p < n2) {
      res += word2[p]
    }
    p++
  }

  return res
};

type SolutionFunction = (word1: string, word2: string) => string

interface TestCase {
  word1: string
  word2: string
  expected: string
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    { word1: 'abc', word2: 'pqr', expected: 'apbqcr' },
    { word1: 'ab', word2: 'pqrs', expected: 'apbqrs' },
    { word1: 'abcd', word2: 'pq', expected: 'apbqcd' },
    { word1: '', word2: 'xyz', expected: 'xyz' },
    { word1: 'abc', word2: '', expected: 'abc' }
  ]

  let passedCount = 0

  console.log('Running LeetCode 1768 tests...\n')

  testCases.forEach((test, index) => {
    const { word1, word2, expected } = test
    const result = solution(word1, word2)
    const passed = result === expected

    if (passed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log(`  Input:    word1 = "${word1}", word2 = "${word2}"`)
      console.log(`  Expected: "${expected}"`)
      console.log(`  Received: "${result}"`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(mergeAlternately2)
