// 917. Reverse Only Letters

// Given a string s, reverse the string according to the following rules:
//
//     All the characters that are not English letters remain in the same position.
//     All the English letters (lowercase or uppercase) should be reversed.
//
// Return s after reversing it.
//
// Example 1:
// Input: s = "ab-cd"
// Output: "dc-ba"
//
// Example 2:
// Input: s = "a-bC-dEf-ghIj"
// Output: "j-Ih-gfE-dCba"
//
// Example 3:
// Input: s = "Test1ng-Leet=code-Q!"
// Output: "Qedo1ct-eeLg=ntse-T!"

/**
 * Two Pointer
 * T:O(n); S:O(n);
 */
function reverseOnlyLetters(s: string): string {
  function isAlphabet(char: string) {
    const charCode = char.charCodeAt(0)

    return (
      ('a'.charCodeAt(0) <= charCode && charCode <= 'z'.charCodeAt(0)) ||
      ('A'.charCodeAt(0) <= charCode && charCode <= 'Z'.charCodeAt(0))
    )
  }

  const charArray = s.split('')

  let l = 0
  let r = s.length - 1

  while (l < r) {
    if (!isAlphabet(charArray[l])) {
      l++
    } else if (!isAlphabet(charArray[r])) {
      r--
    } else {
      [charArray[l], charArray[r]] = [charArray[r], charArray[l]]

      l++
      r--
    }
  }

  return charArray.join('')
}

function runTests(solution: (s: string) => string): void {
  // Define test cases with the input string, expected output, and description
  const testCases: { input: string, expected: string, description: string }[] = [
    {
      description: 'Example 1: Basic string with a single hyphen',
      input: 'ab-cd',
      expected: 'dc-ba'
    },
    {
      description: 'Example 2: Mixed case letters with multiple hyphens',
      input: 'a-bC-dEf-ghIj',
      expected: 'j-Ih-gfE-dCba'
    },
    {
      description: 'Example 3: String with numbers, letters, and symbols',
      input: 'Test1ng-Leet=code-Q!',
      expected: 'Qedo1ct-eeLg=ntse-T!'
    },
    {
      description: 'Edge Case: Only non-letter characters',
      input: '123-456!',
      expected: '123-456!'
    },
    {
      description: 'Edge Case: Single letter string',
      input: 'a',
      expected: 'a'
    },
    {
      description: 'Edge Case: Single non-letter character',
      input: '-',
      expected: '-'
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 917 Tests (Reverse Only Letters) ===\n')

  testCases.forEach((test, index) => {
    const startTime = performance.now()
    const result = solution(test.input)
    const endTime = performance.now()

    const passed = result === test.expected
    if (passed) {
      passedCount++
    }

    console.log(`Test ${index + 1}: ${test.description}`)
    console.log(`- Input:    "${test.input}"`)
    console.log(`- Expected: "${test.expected}"`)
    console.log(`- Received: "${result}"`)
    console.log(`- Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`- Time:     ${(endTime - startTime).toFixed(4)} ms`)
    console.log('--------------------------------------------------')
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(reverseOnlyLetters)
