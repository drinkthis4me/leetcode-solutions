// 5. Longest Palindromic Substring

/**
 * Brute Force
 * T: O(n^3); S: O(n);
 */
function longestPalindrome(s: string): string {
  if (!s || s.length <= 1) return s

  const n = s.length
  let startIdx = 0
  let maxLen = 1

  const isPalindrome = (l: number, r: number) => {
    while (l < r) {
      if (s.charAt(l) !== s.charAt(r)) return false
      l++
      r--
    }
    return true
  }

  // i as potential start
  for (let i = 0; i < n; i++) {
    // j as potential end
    for (let j = i; j < n; j++) {
      // Check if substring s[i..j] is valid palindrome
      const currLen = j - i + 1
      if (currLen > maxLen && isPalindrome(i, j)) {
        startIdx = i
        maxLen = currLen
      }
    }
  }

  return s.substring(startIdx, startIdx + maxLen)
};

/**
 * Two Pointers
 * T: O(n^2); S: O(1);
 */
function longestPalindrome2(s: string): string {
  // At every i, expand left and right while valid.
  // Be careful with odd/even length palindrome.

  if (!s || s.length <= 1) return s

  const n = s.length
  let startIdx = 0
  let maxLen = 1

  const expandPalindrome = (l: number, r: number) => {
    while (l >= 0 && r < n && s.charAt(l) === s.charAt(r)) {
      if (r - l + 1 > maxLen) {
        startIdx = l
        maxLen = r - l + 1
      }
      l--
      r++
    }
  }

  for (let i = 0; i < n; i++) {
    // Early exit
    // Remaining length is less than the max length
    if ((n - i) * 2 <= maxLen) break

    // Odd length
    expandPalindrome(i, i)

    // Even length
    expandPalindrome(i, i + 1)
  }

  return s.substring(startIdx, startIdx + maxLen)
}

/**
 * DP (Bottom-up)
 * T: O(n^2); S: O(n^2);
 */
function longestPalindrome3(s: string): string {
  // DP array to memorize if a given substring is valid

  // s = 'abba'
  // DP array of size n x n.
  // [
  //   [T, F, F, F],
  //   [F, T, F, F],
  //   [F, F, T, F],
  //   [F, F, F, T],
  // ]

  // dp[i][j] = true (s[i..j] is a palindrome) when:
  //  - s[i] == s[j]
  //  - dp[i+1][j-1] = true // Inner substring is also valid.
  //  - j - i <= 2  // **Special case** when length <= 3

  if (!s || s.length <= 1) return s

  const n = s.length
  const dp = Array.from({ length: n }, () => new Array(n).fill(false))
  let startIdx = 0
  let maxLen = 0

  // Computed the inner substring first by iterating from bottom to top
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = true

    for (let j = i; j < n; j++) {
      if (
        s.charAt(i) === s.charAt(j) &&
        (j - i <= 2 || dp[i + 1][j - 1])
      ) {
        dp[i][j] = true

        if (j - i + 1 > maxLen) {
          startIdx = i
          maxLen = j - i + 1
        }
      }
    }
  }

  return s.substring(startIdx, startIdx + maxLen)
}

/**
 * Manacher's Algorithm
 * T: O(n); S: O(n);
 */
function longestPalindrome4(s: string): string {
  if (!s || s.length <= 1) return s

  // Transform s to make it always odd length
  // 'aba' -> '#a#b#a#'
  const T = '#' + s.split('').join('#') + '#'
  const n = T.length
  // Radius array
  const p = new Array(n).fill(0)
  // Center fo the rightmost palindrome
  let center = 0
  // Right boundary of the right most palindrome
  let radius = 0

  let maxLen = 0
  let centerIdx = 0

  for (let i = 0; i < n; i++) {
    // Skip mirror comparisons
    const mirror = 2 * center - i
    if (i < radius) {
      p[i] = Math.min(radius - i, p[mirror])
    }

    // Attempt to expand around i
    let r = i + (1 + p[i])
    let l = i - (1 + p[i])
    while (r < n && l >= 0 && T[r] === T[l]) {
      p[i]++
      r++
      l--
    }

    // If expand past current radius, update current.
    if (i + p[i] > radius) {
      center = i
      radius = i + p[i]
    }

    // Track the max found
    if (p[i] > maxLen) {
      maxLen = p[i]
      centerIdx = i
    }
  }

  // Map back to the original index
  const start = Math.floor((centerIdx - maxLen) / 2)
  return s.substring(start, start + maxLen)
}

/**
 * Tester for LeetCode 5: Longest Palindromic Substring
 * @param solution - A function that takes a string and returns the longest palindromic substring.
 */
function runTests(solution: (s: string) => string): void {
  const testCases = [
    { input: 'babad', expected: ['bab', 'aba'] },
    { input: 'cbbd', expected: ['bb'] },
    { input: 'a', expected: ['a'] },
    { input: 'ac', expected: ['a', 'c'] },
    { input: 'racecar', expected: ['racecar'] },
    { input: '', expected: [''] },
    { input: 'aaaa', expected: ['aaaa'] },
    { input: 'abbc', expected: ['bb'] }
  ]

  console.log('--- Starting Tests for Longest Palindromic Substring ---')

  testCases.forEach(({ input, expected }, index) => {
    const result = solution(input)

    // Check if the result is one of the expected valid answers
    const passed = expected.includes(result)

    console.log(`Test Case #${index + 1}:`)
    console.log(`  Input: "${input}"`)
    console.log(`  Expected: ${expected.map(s => `"${s}"`).join(' or ')}`)
    console.log(`  Actual: "${result}"`)
    console.log(`  Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('-------------------------------------------------------')
  })
}

runTests(longestPalindrome)
