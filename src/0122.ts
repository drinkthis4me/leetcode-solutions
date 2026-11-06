// 122. Best Time to Buy and Sell Stock II

// Input: prices = [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
// Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Total profit is 4 + 3 = 7.

/**
 * DP (Top-down)
 * T:O(n); S: O(n);
 */
function maxProfit(prices: number[]): number {
  const n = prices.length

  // Edge case
  if (n === 0) return 0

  // DP array of [max_profit, holding_status][]
  // holding_status: 0 = (not holding); 1 = (holding)
  // memo[i][0] = (max profit on day i if not holding stock)
  // memo[i][1] = (max profit on day i if holding stock)
  const memo: number[][] = Array.from({ length: n }, () => new Array(2).fill(-1))

  function dp(i: number, holding: number): number {
    if (i === n) return 0

    if (memo[i][holding] !== -1) {
      return memo[i][holding]
    }

    if (holding === 0) {
      // Choices when not holding:
      // 1. Do nothing
      // 2. Buy
      const doNothing = dp(i + 1, 0)
      const buy = -prices[i] + dp(i + 1, 1)
      memo[i][holding] = Math.max(doNothing, buy)
    } else {
      // Choices when holding:
      // 1. Do nothing
      // 2. Sell
      const doNothing = dp(i + 1, 1)
      const sell = prices[i] + dp(i + 1, 0)
      memo[i][holding] = Math.max(doNothing, sell)
    }

    console.log(memo)
    return memo[i][holding]
  }

  // Start on day 0 with no stock
  return dp(0, 0)
};

/**
 * DP (Bottom-up)
 * T:O(n); S: O(n);
 */
function maxProfit2(prices: number[]): number {
  const n = prices.length

  // Edge case
  if (n === 0) return 0

  const dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0))

  // Base case for day 0
  // Profit on day 0 if not holding is zero
  dp[0][0] = 0
  // Profit on day 0 if holding (which is impossible) set to negative
  dp[0][1] = -prices[0]

  for (let i = 1; i < n; i++) {
    // Option A: Not holding today
    dp[i][0] = Math.max(
      dp[i - 1][0], // Do nothing
      prices[i] + dp[i - 1][1] // Sell if holding
    )

    // Option B: Holding today
    dp[i][1] = Math.max(
      dp[i - 1][1], // Already holding. Do nothing.
      -prices[i] + dp[i - 1][0] // Buy if not holding
    )
  }

  // Return the max profit on the last day with not holding
  return dp[n - 1][0]
};

/**
 * DP (Optimized)
 * T:O(n); S: O(1);
 */
function maxProfit3(prices: number[]): number {
  const n = prices.length

  // Edge case
  if (n === 0) return 0

  // Base case for day 0
  let notHolding = 0
  let holding = -prices[0]

  for (let i = 1; i < n; i++) {
    const prevNotHolding = notHolding
    const prevHolding = holding

    notHolding = Math.max(prevNotHolding, prevHolding + prices[i])
    holding = Math.max(prevHolding, prevNotHolding - prices[i])
  }

  return notHolding
};

/**
 * Greedy
 * T:O(n); S: O(1);
 */
function maxProfit4(prices: number[]): number {
  // Capture the upward price trend and calculate profit day by day.
  // Compare each day (i) with previous day (i-1).
  // If today's price > yesterday's price, we generate profit

  let profit = 0

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]
    }
  }

  return profit
};

interface TestCase {
  input: number[]
  expected: number
  description: string
}

function runTests(solution: (prices: number[]) => number): void {
  const testCases: TestCase[] = [
    {
      input: [7, 1, 5, 3, 6, 4],
      expected: 7,
      description: 'Standard case with multiple peaks and valleys'
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: 4,
      description: 'Strictly increasing prices'
    },
    {
      input: [7, 6, 4, 3, 1],
      expected: 0,
      description: 'Strictly decreasing prices (no profit possible)'
    },
    {
      input: [2, 4, 1],
      expected: 2,
      description: 'Short array with a single profitable transaction'
    },
    {
      input: [1],
      expected: 0,
      description: 'Single-element array'
    },
    {
      input: [2, 2, 5],
      expected: 3,
      description: 'Flat prices followed by an increase'
    }
  ]

  let passedCount = 0

  console.log('=== Running Tests for LeetCode 122: Best Time to Buy and Sell Stock II ===\n')

  testCases.forEach((test, index) => {
    // Clone input to prevent solution mutations from affecting subsequent tests
    const inputCopy = [...test.input]
    const actual = solution(inputCopy)
    const passed = actual === test.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test ${index + 1}: ${test.description}`)
    } else {
      console.log(`[FAIL] Test ${index + 1}: ${test.description}`)
      console.log(`  Input:    [${test.input.join(', ')}]`)
      console.log(`  Expected: ${test.expected}`)
      console.log(`  Actual:   ${actual}`)
    }
  })

  console.log('\n=== Test Summary ===')
  console.log(`Passed: ${passedCount}/${testCases.length}`)

  if (passedCount === testCases.length) {
    console.log('🎉 All tests passed successfully!')
  } else {
    console.log('❌ Some tests failed.')
  }
}

runTests(maxProfit3)
