// 258. Add Digits

// Input: num = 38
// Output: 2
// 3 + 8 = 11; 1 + 1 = 2

/**
 * Brute Force
 * T: O(log n); S: O(n);
 */
function addDigits(num: number): number {
  if (num < 10) return num

  let sum = 0

  while (num !== 0) {
    sum += num % 10
    num = Math.floor(num / 10)
  }

  return addDigits(sum)
};

/**
 * Digit Root w/ Iteration
 * T: O(1); S: O(1);
 */
function addDigits2(num: number): number {
  // abcd = 1000a + 100b + 10c + d
  //      = (a + b + c + d) + 9 * (111a + 11b + c)
  // We can get digit sum by mod 9
  // abcd % 9 = (a + b + c + d)

  // See: https://en.wikipedia.org/wiki/Digital_root
  // digit root(n) = (n - 1) % 9 + 1

  // Edge case:
  // 0 -> return 0
  // 9 % 9 = 0 -> return 9

  if (num === 0) return 0
  // else if (num % 9 === 0) return 9
  // else return (num % 9)
  else return (num - 1) % 9 + 1
};

/**
 * Tester for LeetCode 258: Add Digits
 *
 * @param solution - The function to be tested.
 * Expected signature: (num: number) => number
 */
function runTests(solution: (num: number) => number): void {
  const testCases = [
    { input: 38, expected: 2 },
    { input: 0, expected: 0 },
    { input: 9, expected: 9 },
    { input: 10, expected: 1 },
    { input: 99, expected: 9 },
    { input: 999, expected: 9 },
    { input: 12345, expected: 6 }
  ]

  console.log('--- Starting Tests for Add Digits ---')

  testCases.forEach(({ input, expected }, index) => {
    const result = solution(input)
    const passed = result === expected

    console.log(
      `Test Case ${index + 1}: Input ${input} | ` +
      `Expected ${expected} | Got ${result} | ` +
      `${passed ? '✅ PASSED' : '❌ FAILED'}`
    )
  })

  console.log('--- Tests Completed ---')
}

runTests(addDigits2)
