// 131. Palindrome Partitioning

/**
 * Backtrack
 * T: O(n * 2^n); S: O(n);
 */
function partition(s: string): string[][] {
  const res: string[][] = []
  const solution: string[] = []

  /**
   * Helper fn to check if given substring is a palindrome
   * @param i Start index of the substring
   * @param j End index of the substring
   */
  const isPalindrome = (i: number, j: number): boolean => {
    while (i < j) {
      if (s[i] !== s[j]) return false

      i++
      j--
    }

    return true
  }

  /**
   * @param i Current partition index (Start of the substring)
   */
  const backtrack = (i: number) => {
    if (i >= s.length) {
      res.push([...solution])
      return
    }

    for (let j = i; j < s.length; j++) {
      if (isPalindrome(i, j)) {
        // Add current substring to option. (Be careful off-by-one error)
        solution.push(s.slice(i, j + 1))

        // Find the other partition at next char
        backtrack(j + 1)

        solution.pop()
      }
    }

  }

  backtrack(0)

  return res
};

/**
 * DP
 * T: O(n^2 + 2^n); S: O(n^2);
 */
function partition2(s: string): string[][] {
  const n = s.length
  const res: string[][] = []
  const solution: string[] = []

  // Pre-compute palindrome table: O(N^2)
  const dp: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false))

  // len: the length of the substring currently being checked
  for (let len = 1; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1
      if (s[i] === s[j]) {
        // Palindrome if length is 1, 2, or inner part is palindrome
        dp[i][j] = (len <= 2) || dp[i + 1][j - 1]
      }
    }
  }

  const backtrack = (i: number) => {
    if (i === n) {
      res.push([...solution])
      return
    }

    for (let j = i; j < n; j++) {
      // O(1) check instead of O(N)
      if (dp[i][j]) {
        solution.push(s.substring(i, j + 1))
        backtrack(j + 1)
        solution.pop()
      }
    }
  }

  backtrack(0)
  return res
}

/**
 * Tester for LeetCode 131: Palindrome Partitioning
 * @param solutionFn - The function to test
 */
function runTests(solutionFn: (s: string) => string[][]) {
  const testCases = [
    {
      input: 'aab',
      expected: [['a', 'a', 'b'], ['aa', 'b']]
    },
    {
      input: 'a',
      expected: [['a']]
    },
    {
      input: 'racecar',
      expected: [
        ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        ['r', 'a', 'cec', 'a', 'r'],
        ['r', 'aceca', 'r'],
        ['racecar']
      ]
    }
  ]

  /**
  * Helper to compare two 2D arrays regardless of the order of inner lists
  */
  function compareResults(result: string[][], expected: string[][]): boolean {
    if (result.length !== expected.length) return false

    const serialize = (arr: string[][]) =>
      arr.map(sub => sub.join(',')).sort().join('|')

    return serialize(result) === serialize(expected)
  }

  console.log(`--- Testing: ${solutionFn.name || 'Anonymous Function'} ---`)

  testCases.forEach(({ input, expected }, index) => {
    const result = solutionFn(input)

    // Helper to compare arrays of arrays (order-insensitive for sub-arrays)
    const isMatch = compareResults(result, expected)

    if (isMatch) {
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.error(`Test Case ${index + 1}: FAILED`)
      console.error(`  Input:    ${input}`)
      console.error(`  Expected: ${JSON.stringify(expected)}`)
      console.error(`  Received: ${JSON.stringify(result)}`)
    }
  })
  console.log('')
}

runTests(partition2)
