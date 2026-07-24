// 322. Coin Change

import { Queue } from '@datastructures-js/queue'

// coins = [1,2,5], amount = 11
// Output = 3

/**
 * Recursion
 * T:O(n ^ D); S: O(D);
 * Where D = amount/min(coins)
 */
function coinChange(coins: number[], amount: number): number {
  if (!coins || coins.length === 0 || amount < 0) return -1
  if (amount === 0) return 0

  const dfs = (remaining: number): number => {
    if (remaining === 0) return 0

    let minCoins = Infinity

    for (const coin of coins) {
      if (remaining - coin >= 0) {
        const currCoins = dfs(remaining - coin)
        if (currCoins !== -1) {
          minCoins = Math.min(minCoins, currCoins + 1)
        }
      }
    }

    return minCoins === Infinity ? -1 : minCoins
  }

  return dfs(amount)
};

/**
 * DP (Top-down)
 * T:O(n * amount); S: O(amount);
 */
function coinChange2(coins: number[], amount: number): number {
  if (!coins || coins.length === 0 || amount < 0) return -1
  if (amount === 0) return 0

  const dp = new Array(amount + 1).fill(-1)

  const dfs = (remaining: number): number => {
    if (remaining === 0) return 0

    if (dp[remaining] !== -1) {
      return dp[remaining]
    }

    let minCoins = Infinity

    for (const coin of coins) {
      if (remaining - coin >= 0) {
        const currCoins = dfs(remaining - coin) + 1
        minCoins = Math.min(minCoins, currCoins)
      }
    }

    dp[remaining] = minCoins

    return dp[remaining]
  }

  const minCoins = dfs(amount)

  return minCoins === Infinity ? -1 : minCoins
};

/**
 * DP (Bottom-up)
 * T:O(n * amount); S: O(amount);
 */
function coinChange3(coins: number[], amount: number): number {
  if (!coins || coins.length === 0 || amount < 0) return -1
  if (amount === 0) return 0

  const dp = new Array(amount + 1).fill(Infinity)

  dp[0] = 0

  for (let i = 1; i < dp.length; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        // dp[i - coin] might be Infinity.
        // This is fine because min(Infinity, Infinity + 1) = Infinity
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
};

/**
 * BFS
 * T:O(n * amount); S: O(amount);
 */
function coinChange4(coins: number[], amount: number): number {
  if (amount === 0) return 0

  // Treat each coin as a node.
  // We want to go from 0 and reach `amount`.
  // The shortest path is the result.

  const q = new Queue([0])
  const seen = new Array(amount + 1).fill(false)
  seen[0] = true

  let res = 0

  while (!q.isEmpty()) {
    res++
    const size = q.size()

    for (let i = 0; i < size; i++) {
      const currSum = q.pop()!

      for (const coin of coins) {
        const newSum = currSum + coin

        if (newSum === amount) {
          return res
        }

        if (newSum > amount || seen[newSum]) {
          continue
        }

        seen[newSum] = true
        q.push(newSum)
      }
    }
  }

  return -1
}

/**
 * Tester for LeetCode 322: Coin Change
 *
 * @param solutionFn - The function to be tested.
 * Expected signature: (coins: number[], amount: number) => number
 */
function runTests(solutionFn: (coins: number[], amount: number) => number): void {
  const testCases = [
    {
      coins: [1, 2, 5],
      amount: 11,
      expected: 3 // 5 + 5 + 1
    },
    {
      coins: [2],
      amount: 3,
      expected: -1
    },
    {
      coins: [1],
      amount: 0,
      expected: 0
    },
    {
      coins: [1],
      amount: 1,
      expected: 1
    },
    {
      coins: [1],
      amount: 2,
      expected: 2
    },
    {
      coins: [186, 419, 83, 408],
      amount: 6249,
      expected: 20
    }
  ]

  console.log('Running tests for Coin Change...')
  console.log('-----------------------------------')

  testCases.forEach((tc, index) => {
    const result = solutionFn(tc.coins, tc.amount)
    const passed = result === tc.expected

    console.log(`Test Case #${index + 1}:`)
    console.log(`  Input:    coins = [${tc.coins}], amount = ${tc.amount}`)
    console.log(`  Expected: ${tc.expected}`)
    console.log(`  Result:   ${result}`)
    console.log(`  Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('-----------------------------------')
  })
}

runTests(coinChange4)
