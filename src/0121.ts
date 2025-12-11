// 121. Best Time to Buy and Sell Stock

/**
 * Precompute Selling Prices
 * T: O(n); S: O(n); 
 */
function maxProfit(prices: number[]): number {
  // prices = 
  // [7, 1, 5, 3, 6, 4]
  // (Best selling price i) = max(prices to the right)
  // [0, 6, 6, 6, 6, 4]
  // (Profit i) = (Best selling price i) - prices[i]
  // [0, 5, 1, 3, 0, 0]

  const n = prices.length

  // Array of best selling prices
  const maxRight: number[] = new Array(n).fill(0)
  // Precompute the best selling price
  maxRight[n - 1] = prices[n - 1]!
  for (let i = n - 2; i >= 0; i--) {
    maxRight[i] = Math.max(maxRight[i + 1]!, prices[i]!)
  }

  let maxP = 0
  // Calculate each day's possible profit
  for (let i = 0; i < n; i++) {
    // (Profit i) = maxRight[i] - prices[i]
    const currentProfit = maxRight[i]! - prices[i]!
    // Update `maxP` if larger profit found 
    maxP = Math.max(maxP, currentProfit)
  }

  return maxP
};

/**
 * Two Pointers
 * T: O(n); S: O(1); 
 */
function maxProfit2(prices: number[]): number {
  // Pointers
  // Buying day. Starts at the first day.
  let left = 0
  // Selling day. Starts at the second day. (day trading not allowed)
  let right = 1
  // (Profit) = prices[right] - prices[left]
  let maxP = 0

  while (right < prices.length) {
    if (prices[right]! > prices[left]!) {
      // Selling price is higher than buying price: Profit exist
      // Calculate profit and update `maxP`
      maxP = Math.max(maxP, prices[right]! - prices[left]!)
    } else {
      // `prices[right] <= prices[left]`
      // A cheaper/same buying price found: Move buying day to `right`
      left = right
    }

    // Move selling day to the next day
    right++
  }

  return maxP
};

/**
 * DP - Kadane's Algorithm
 * T: O(n); S: O(1); 
 */
function maxProfit3(prices: number[]): number {
  // Edge Case
  if (prices.length <= 1) return 0

  let maxP = 0
  let minBuy = prices[0]!

  for (const price of prices) {
    // (Profit) = (Selling Price) - (Buying Price)
    const currentProfit = price - minBuy
    maxP = Math.max(maxP, currentProfit)
    // Update `minBuy` if a lower buying price found
    minBuy = Math.min(minBuy, price)
  }

  return maxP
};

const prices = [7, 1, 5, 3, 6, 4]
const expected = 5
// const prices = [7, 6, 4, 3, 1]
// const expected = 0
// const prices = [10, 1, 5, 6, 7, 1]
// const expected = 6
// const prices = [10, 8, 7, 5, 2]
// const expected = 0

const ans = maxProfit3(prices)

console.log('Input: ', prices)
console.log('expected: ', expected)
console.log('answer: ', ans)
