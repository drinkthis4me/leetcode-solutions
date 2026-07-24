// 202. Happy Number

/**
 * Hash Set
 * S: O:(log n); T: O(log n);
 */
function isHappy(n: number): boolean {
  // Hash set to store seen values.
  // Keep reducing n until loop occur (already seen) or n is happy.

  const set = new Set<number>()

  while (!set.has(n) && n !== 1) {
    set.add(n)

    let sum = 0
    let curr = n

    while (curr > 0) {
      const digit = curr % 10
      sum += digit * digit
      curr = Math.floor(curr / 10)
    }

    n = sum
  }

  return n === 1
};

/**
 * Floyd Cycle Detection
 * S: O:(log n); T: O(1);
 */
function isHappy2(n: number): boolean {
  // Helper fn to calculate the next number
  const reduce = (n: number): number => {
    let sum = 0

    while (n > 0) {
      const digit = n % 10
      sum += digit * digit
      n = Math.floor(n / 10)
    }

    return sum
  }

  // Detect cycle with slow and fast pointer
  let s = n
  let f = reduce(n)

  while (s !== f && f !== 1) {
    s = reduce(s)

    f = reduce(f)
    f = reduce(f)
  }

  return f === 1
};

/**
 * Executes a set of test cases against a provided solution function.
 * @param fn - The function to test (number -> boolean)
 */
function runTests(fn: (n: number) => boolean) {
  const testCases = [
    { input: 19, expected: true },
    { input: 2, expected: false },
    { input: 7, expected: true },
    { input: 1, expected: true },
    { input: 116, expected: false },
    { input: 0, expected: false }
  ]

  console.log(`--- Testing Solution: ${fn.name} ---`)

  let allPassed = true

  for (const test of testCases) {
    const result = fn(test.input)
    const passed = result === test.expected

    if (!passed) allPassed = false

    console.log(
      `Input: ${test.input.toString().padEnd(5)} | ` +
      `Expected: ${test.expected.toString().padEnd(6)} | ` +
      `Result: ${result.toString().padEnd(6)} | ` +
      `${passed ? '✅ PASS' : '❌ FAIL'}`
    )
  }

  console.log(`Summary: ${allPassed ? 'All tests passed!' : 'Some tests failed.'}\n`)
}

runTests(isHappy2)
