// 680. Valid Palindrome II

// Example 1:
// Input: s = "aba"
// Output: true
//
// Example 2:
// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.
//
// Example 3:
// Input: s = "abc"
// Output: false

/**
 * Two Pointers
 * T: O(n); S: O(1);
 */
function validPalindrome(s: string): boolean {
  function isValid(s: string, l: number, r: number): boolean {
    while (l < r) {
      if (s[l] !== s[r]) return false
      l++
      r--
    }

    return true
  }

  let l = 0
  let r = s.length - 1

  while (l < r) {
    if (s[l] !== s[r]) {
      // Remove the left character and check [l+1..r]
      // Remove the right character and check [l..r-1]
      // Return true if either case is valid
      return isValid(s, l + 1, r) || isValid(s, l, r - 1)
    }
    l++
    r--
  }

  return true
};

interface TestCase {
  input: string
  expected: boolean
}

function runTests(solution: (s: string) => boolean): void {
  const testCases: TestCase[] = [
    { input: 'aba', expected: true },
    { input: 'abca', expected: true },   // Can delete 'b' or 'c'
    { input: 'abc', expected: false },  // Cannot be palindrome with one deletion
    { input: 'deeee', expected: true }, // Delete 'd' -> "eeee"
    { input: 'eccer', expected: true } // Delete 'c' -> "ecer" -> wait, "ecerc" reversed is "crece", let's check: "eccer" delete 'c' -> "ecer" or "ecet"? Wait, delete 'c' at index 1 -> "ecer" (not palindrome), delete 'c' at index 2 -> "ecer"... actually "eccer" delete 'c' at index 1 -> "ecer", wait, "eccer" can delete 'c' to make "ecer"? No, "eccer" reversed is "recce". Delete 'c' at index 2 -> "ecer" (not palindrome). Let's use standard LC examples instead.
  ]

  // Replacing with official LeetCode examples and robust edge cases:
  const officialTestCases: TestCase[] = [
    { input: 'aba', expected: true },
    { input: 'abca', expected: true },
    { input: 'abc', expected: false },
    { input: 'cupuupuuc', expected: true }, // Deleting 'c' at the end or 'p'
    { input: 'a', expected: true },         // Single character
    { input: 'ab', expected: true },        // Two characters
    { input: 'aa', expected: true },        // Identical characters
    { input: 'pidbliassaqozokmtgahluruufwbjdofwwnpbkfdgjsiraigopbaaeunvqhsqdhtqecpzxxeiigmuifvugwcpnvpnfrqcugbngcctegtaeocmuqjncduzvvptdzu', expected: false } // Long random non-palindrome
  ]

  let passedCount = 0

  console.log('=========================================')
  console.log('Running Tests for LeetCode 680 (Valid Palindrome II)')
  console.log('=========================================\n')

  officialTestCases.forEach((test, index) => {
    const actual = solution(test.input)
    const passed = actual === test.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test ${index + 1}: input = "${test.input}" | expected = ${test.expected} | got = ${actual}`)
    } else {
      console.error(`[FAIL] Test ${index + 1}: input = "${test.input}" | expected = ${test.expected} | got = ${actual}`)
    }
  })

  console.log('\n=========================================')
  console.log(`Results: ${passedCount}/${officialTestCases.length} tests passed.`)
  console.log('=========================================')
}

runTests(validPalindrome)
