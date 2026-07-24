// 647. Palindromic Substrings

/**
 * Two Pointers
 * T: O(n^2); S: O(1);
 */
function countSubstrings(s: string): number {
  if (!s || s.length === 0) return 0

  const n = s.length
  let count = 0

  const expandAndCount = (l: number, r: number) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      count++
      l--
      r++
    }
  }

  for (let i = 0; i < n; i++) {
    expandAndCount(i, i)
    expandAndCount(i, i + 1)
  }

  return count
};

/**
 * DP
 * T: O(n^2); S: O(n^2);
 */
function countSubstrings2(s: string): number {
  if (!s || s.length === 0) return 0

  const n = s.length
  const dp = Array.from({ length: n }, () => new Array(n).fill(false))
  let count = 0

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (
        s[i] === s[j] &&
        (j - i <= 2 || dp[i + 1][j - 1])
      ) {
        dp[i][j] = true
        count++
      }
    }
  }

  return count
}

/**
 * Tester for LeetCode 647: Palindromic Substrings
 *
 * @param solutionFn - The function to be tested.
 * Expected signature: (s: string) => number
 */
function runTests(solutionFn: (s: string) => number): void {
  const testCases = [
    { input: 'abc', expected: 3 },      // "a", "b", "c"
    { input: 'aaa', expected: 6 },      // "a", "a", "a", "aa", "aa", "aaa"
    { input: 'abccba', expected: 9 },   // Includes all individual letters and palindromic substrings
    { input: 'a', expected: 1 },
    { input: '', expected: 0 },
    { input: 'racecar', expected: 10 }
  ]

  console.log('Running tests for LeetCode 647...')
  console.log('-----------------------------------')

  let passed = 0

  testCases.forEach((test, index) => {
    const result = solutionFn(test.input)
    const isPassed = result === test.expected

    if (isPassed) {
      passed++
    }

    console.log(`Test Case ${index + 1}:`)
    console.log(`  Input:    "${test.input}"`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Actual:   ${result}`)
    console.log(`  Status:   ${isPassed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('-----------------------------------')
  })

  console.log(`Final Result: ${passed}/${testCases.length} passed.`)
}

runTests(countSubstrings2)
