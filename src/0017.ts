// 17. Letter Combinations of a Phone Number

/**
 * Backtrack
 * T: O(n * 4^n); O(n * 4^n);
 */
function letterCombinations(digits: string): string[] {
  if (!digits || digits.length === 0) return []

  const DIGIT_MAP: Record<string, string> = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  const res: string[] = []
  const solution: string[] = []

  const backtrack = (i: number) => {
    if (i >= digits.length) {
      res.push(solution.join(''))
      return
    }

    const currDigit = digits[i]
    const currLetters = DIGIT_MAP[currDigit]

    for (const letter of currLetters) {
      solution.push(letter)

      backtrack(i + 1)

      solution.pop()
    }
  }

  backtrack(0)

  return res
};

/**
 * Test Runner for LeetCode 17
 * 
 * @param solutionFn - The function to test (takes string, returns string[])
 */
function runTests(solutionFn: (digits: string) => string[]) {
  const testCases = [
    { digits: "23", expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
    { digits: "", expected: [] },
    { digits: "2", expected: ["a", "b", "c"] },
    { digits: "7", expected: ["p", "q", "r", "s"] }
  ];

  console.log(`--- Testing Function: ${solutionFn.name || 'Anonymous'} ---`);

  testCases.forEach(({ digits, expected }, index) => {
    const result = solutionFn(digits);

    // Helper to check array equality (order independent if needed, 
    // but typically LC expects specific order for this problem)
    const passed = JSON.stringify(result.sort()) === JSON.stringify(expected.sort());

    if (passed) {
      console.log(`Test Case ${index + 1}: ✅ Passed`);
    } else {
      console.error(`Test Case ${index + 1}: ❌ Failed`);
      console.error(`   Input: "${digits}"`);
      console.error(`   Expected: ${JSON.stringify(expected)}`);
      console.error(`   Received: ${JSON.stringify(result)}`);
    }
  });
  console.log('\n');
}

runTests(letterCombinations);
