// 344. Reverse String

/**
 * Array.reverse()
 * T: O(n); S: O(1);
 */
function reverseString(s: string[]): void {
  s.reverse()
};

/**
 * Two Pointers
 * T: O(n); S: O(1);
 */
function reverseString2(s: string[]): void {
  let l = 0
  let r = s.length - 1

  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]]
    l++
    r--
  }
};

type SolutionFn = (s: string[]) => void

interface TestCase {
  input: string[]
  expected: string[]
}

function runTests(solution: SolutionFn): void {
  const testCases: TestCase[] = [
    {
      input: ['h', 'e', 'l', 'l', 'o'],
      expected: ['o', 'l', 'l', 'e', 'h']
    },
    {
      input: ['H', 'a', 'n', 'n', 'a', 'h'],
      expected: ['h', 'a', 'n', 'n', 'a', 'H']
    },
    {
      input: ['a'],
      expected: ['a']
    },
    {
      input: ['a', 'b'],
      expected: ['b', 'a']
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Create a copy because the function modifies the array in place
    const inputCopy = [...test.input]

    // Execute the solution
    solution(inputCopy)

    // Verify the result
    const passed = JSON.stringify(inputCopy) === JSON.stringify(test.expected)

    if (passed) {
      passedCount++
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`Test Case ${index + 1}: FAILED`)
      console.log(`  Input:    ${JSON.stringify(test.input)}`)
      console.log(`  Expected: ${JSON.stringify(test.expected)}`)
      console.log(`  Got:      ${JSON.stringify(inputCopy)}`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(reverseString)
