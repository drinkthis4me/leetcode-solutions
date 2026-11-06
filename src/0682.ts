// 682. Baseball Game

// An integer x.
// Record a new score of x.
// '+'.
// Record a new score that is the sum of the previous two scores.
// 'D'.
// Record a new score that is the double of the previous score.
// 'C'.
// Invalidate the previous score, removing it from the record.
//
// Example 1:
// Input: ops = ["5","2","C","D","+"]
// Output: 30
//
// Example 2:
// Input: ops = ["5","-2","4","C","D","9","+","+"]
// Output: 27

/**
 * Stack
 * T: O(n); S: O(n);
 */
function calPoints(operations: string[]): number {
  const stack: number[] = []

  for (const input of operations) {
    if (input === '+') {
      const prev2 = stack.at(-2)!
      const prev1 = stack.at(-1)!
      const sum = prev2 + prev1
      stack.push(sum)
    } else if (input === 'D') {
      const prev = stack.at(-1)!
      const double = prev * 2
      stack.push(double)
    } else if (input === 'C') {
      stack.pop()
    } else {
      // Parse number
      const n = parseInt(input)
      stack.push(n)
    }
    console.log(stack)
  }

  return stack.reduce((a, b) => a + b, 0)
};

/**
 * Stack w/ running sum
 * T: O(n); S: O(n);
 */
function calPoints2(operations: string[]): number {
  const stack: number[] = []
  let res = 0

  for (const input of operations) {
    if (input === '+') {
      const prev2 = stack.at(-2)!
      const prev1 = stack.at(-1)!
      const sum = prev2 + prev1
      stack.push(sum)
      res += sum
    } else if (input === 'D') {
      const prev = stack.at(-1)!
      const double = prev * 2
      stack.push(double)
      res += double
    } else if (input === 'C') {
      const removed = stack.pop()!
      res -= removed
    } else {
      // Parse number
      const n = parseInt(input)
      stack.push(n)
      res += n
    }
  }

  return res
};

interface TestCase {
  input: string[]
  expected: number
}

function runTests(solution: (operations: string[]) => number): void {
  const testCases: TestCase[] = [
    {
      input: ['5', '2', 'C', 'D', '+'],
      expected: 30
    },
    {
      input: ['5', '-2', '4', 'C', 'D', '9', '+', '+'],
      expected: 27
    },
    {
      input: ['1', 'C'],
      expected: 0
    },
    {
      input: ['1', 'D'],
      expected: 3
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    try {
      const result = solution(test.input)
      const passed = result === test.expected

      if (passed) {
        passedCount++
        console.log(`Test Case ${index + 1}: PASSED`)
      } else {
        console.log(`Test Case ${index + 1}: FAILED`)
        console.log(`  Input:    ${JSON.stringify(test.input)}`)
        console.log(`  Expected: ${test.expected}`)
        console.log(`  Received: ${result}`)
      }
    } catch (error) {
      console.log(`Test Case ${index + 1}: ERROR`)
      console.log(`  Input:    ${JSON.stringify(test.input)}`)
      console.log(`  Error:    ${error}`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(calPoints2)
