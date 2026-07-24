// 91. Decode Ways

/**
 * DFS Recursion
 * T: O(2^n); S:O(n);
 */
function numDecodings(s: string): number {
  if (!s || s.length === 0 || s.startsWith('0')) return 0

  const n = s.length

  const dfs = (i: number): number => {
    if (i >= n) {
      // Partition complete. No error.
      return 1
    }

    const curr = s[i]

    // Cannot start with '0'
    if (curr === '0') return 0

    const next = s[i + 1] ?? null

    const canBeDoubleDigit = next &&
      (curr === '1' || (curr === '2' && parseInt(next) <= 6))

    return canBeDoubleDigit ?
      dfs(i + 1) + dfs(i + 2) :
      dfs(i + 2)
  }

  return dfs(0)
};

/**
 * DP (Top-down)
 * T: O(n); S:O(n);
 */
function numDecodings2(s: string): number {
  if (!s || s.length === 0 || s.startsWith('0')) return 0

  const n = s.length
  // Memorization map for index-count
  const dp = new Array(n).fill(-1)

  const dfs = (i: number): number => {
    if (i >= n) return 1
    if (s[i] === '0') return 0

    if (dp[i] !== -1) {
      return dp[i]
    }

    // Path 1: One digit
    let count = dfs(i + 1)

    // Path 2: Two digits if valid
    if (
      i + 1 < n &&
      (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))
    ) {
      count += dfs(i + 2)
    }

    dp[i] = count

    return dp[i]
  }

  return dfs(0)
};

/**
 * DP (Bottom-up)
 * T: O(n); S:O(n);
 */
function numDecodings3(s: string): number {
  if (!s || s.length === 0 || s.startsWith('0')) return 0

  const n = s.length
  const dp = new Array(n + 1).fill(0)

  dp[n] = 1

  for (let i = n - 1; i >= 0; i--) {
    // Edge case
    if (s[i] === '0') {
      dp[i] = 0
    } else {
      // Path1: One digit
      dp[i] = dp[i + 1]

      // Path2: Two digits
      if (
        i + 1 < n &&
        (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))
      ) {
        dp[i] += dp[i + 2]
      }
    }
  }

  return dp[0]
}

/**
 * DP (Bottom-up. Optimized)
 * T: O(n); S:O(1);
 */
function numDecodings4(s: string): number {
  if (!s || s.length === 0 || s.startsWith('0')) return 0

  const n = s.length

  let prev1 = 1
  let prev2 = 0

  for (let i = n - 1; i >= 0; i--) {
    let curr = 0

    if (s[i] !== '0') {
      curr = prev1
    }

    if (
      i + 1 < n &&
      (s[i] === '1' || (s[i] === '2' && s[i + 1] <= '6'))
    ) {
      curr += prev2
    }

    prev2 = prev1
    prev1 = curr
  }

  return prev1
}

/**
 * Test runner for LeetCode 91: Decode Ways
 *
 * @param solutionFn - The function to test with signature: (s: string) => number
 */
function runTests(solutionFn: (s: string) => number): void {
  const testCases = [
    { input: '12', expected: 2, description: 'Basic case: \'12\' can be \'AB\' or \'L\'' },
    { input: '226', expected: 3, description: 'Multiple mappings: \'BZ\', \'VF\', \'BBF\'' },
    { input: '06', expected: 0, description: 'Leading zero: cannot start with 0' },
    { input: '1', expected: 1, description: 'Single digit' },
    { input: '10', expected: 1, description: 'Ending with zero: must combine' },
    { input: '2101', expected: 1, description: 'Complex case with zeros' },
    { input: '27', expected: 1, description: 'No mapping for 27' },
    { input: '0', expected: 0, description: 'Just zero' }
  ]

  console.log('--- Running Tests for LeetCode 91 ---')
  let passedCount = 0

  testCases.forEach((test, index) => {
    const result = solutionFn(test.input)
    const passed = result === test.expected

    if (passed) {
      passedCount++
    }

    console.log(`Test #${index + 1}: ${test.description}`)
    console.log(`  Input:    "${test.input}"`)
    console.log(`  Expected: ${test.expected}`)
    console.log(`  Result:   ${result}`)
    console.log(`  Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('-----------------------------------')
  })

  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(numDecodings4)
