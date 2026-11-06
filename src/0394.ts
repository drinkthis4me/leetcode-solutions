// 394. Decode String

// Given an encoded string, return its decoded string.
//
// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
//
// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].
//
// The test cases are generated so that the length of the output will never exceed 105.
//
// Example 1:
// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"
//
// Example 2:
// Input: s = "3[a2[c]]"
// Output: "accaccacc"
//
// Example 3:
// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

/**
 * Recursion
 * T: O(n + L); S:(D + L);
 * where L = output length, D = recursion depth.
 */
function decodeString(s: string): string {
  // Pointer for s
  let i = 0

  // Helper for recursively building the string
  function decode() {
    let curr = ''
    let k = 0

    while (i < s.length) {
      const char = s[i]
      const parsedDigit = parseInt(char)

      if (!Number.isNaN(parsedDigit)) {
        k = k * 10 + parsedDigit
        i++
      } else if (char === '[') {
        // Recursively call decode to build substring
        i++
        const substring = decode()
        curr += substring.repeat(k)
        k = 0
      } else if (char === ']') {
        // End of substring. Return to parent.
        i++
        return curr
      } else {
        curr += char
        i++
      }
    }

    return curr
  }

  return decode()
}

/**
 * Stack
 * T: O(n + L); S:(D + L)
 * where L = output length, D = Stack length.
 */
function decodeString2(s: string): string {
  // Stack of (previous_substring, previous_k)
  const stack: [string, number][] = []
  let k = 0
  let curr = ''

  for (const char of s) {
    if ('0' <= char && char <= '9') {
      k = k * 10 + parseInt(char)
    } else if (char === '[') {
      // Store current substring in stack and build the next substring
      stack.push([curr, k])
      curr = ''
      k = 0
    } else if (char === ']') {
      // Current substring ended.
      // Combine current substring with the previous one.
      const [substring, prevK] = stack.pop()!

      curr = substring + curr.repeat(prevK)
    } else {
      curr += char
    }
  }

  return curr
}

interface TestCase {
  input: string
  expected: string
}

function runTests(solution: (s: string) => string): void {
  const testCases: TestCase[] = [
    { input: '3[a]2[bc]', expected: 'aaabcbc' },
    { input: '3[a2[c]]', expected: 'accaccacc' },
    { input: '2[abc]3[cd]ef', expected: 'abcabccdcdcdef' },
    { input: 'abc3[cd]xyz', expected: 'abccdcdcdxyz' },
    { input: '10[a]', expected: 'aaaaaaaaaa' },
    { input: '1[b]', expected: 'b' }
  ]

  let passedCount = 0

  console.log('=== Running Tests for LeetCode 394: Decode String ===\n')

  testCases.forEach((test, index) => {
    const startTime = performance.now()
    let actual: string
    let error: Error | null = null

    try {
      actual = solution(test.input)
    } catch (e: any) {
      error = e
      actual = `ERROR: ${e.message}`
    }

    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(3)

    const passed = !error && actual === test.expected
    if (passed) {
      passedCount++
    }

    console.log(`Test Case ${index + 1}: ${passed ? '✅ PASSED' : '❌ FAILED'} (${duration} ms)`)
    console.log(`  Input:    "${test.input}"`)
    console.log(`  Expected: "${test.expected}"`)
    console.log(`  Actual:   "${actual}"`)

    if (error) {
      console.log('  Details:  Threw an exception during execution.')
    }
    console.log('-'.repeat(50))
  })

  console.log(`\nFinal Result: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(decodeString2)
