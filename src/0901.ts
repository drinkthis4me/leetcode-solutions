// 901. Online Stock Span

// Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.
//
// The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.
//
//     For example, if the prices of the stock in the last four days are [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal to 2 for 4 consecutive days.
//     Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
//
// Implement the StockSpanner class:
//
//     StockSpanner() Initializes the object of the class.
//     int next(int price) Returns the span of the stock's price given that today's price is price.
//
// Example 1://
// Input
// ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
// [[], [100], [80], [60], [70], [60], [75], [85]]
// Output
// [null, 1, 1, 1, 2, 1, 4, 6]
//
// Explanation
// StockSpanner stockSpanner = new StockSpanner();
// stockSpanner.next(100); // return 1
// stockSpanner.next(80);  // return 1
// stockSpanner.next(60);  // return 1
// stockSpanner.next(70);  // return 2
// stockSpanner.next(60);  // return 1
// stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
// stockSpanner.next(85);  // return 6

/**
 * Stack
 */
class StockSpanner {
  // Monotonic decreasing stack for [price, span].
  // Store price along with span so we don't have to check previous days
  // if a higher price appears.
  stack: number[][]

  constructor() {
    this.stack = []
  }

  next(price: number): number {
    let span = 1

    while (
      this.stack.length > 0 &&
      this.stack.at(-1)![0] <= price
    ) {
      span += this.stack.pop()![1]
    }

    this.stack.push([price, span])

    return span
  }
}

// Define the interface representing the StockSpanner class structure
interface IStockSpanner {
  next(price: number): number
}

interface TestCase {
  name: string
  prices: number[]
  expected: number[]
}

/**
 * Runs multiple test cases against the provided StockSpanner implementation.
 * @param StockSpannerClass The StockSpanner class to test.
 */
function runTests(StockSpannerClass: new () => IStockSpanner): void {
  const testCases: TestCase[] = [
    {
      name: 'LeetCode Example 1 (Mixed fluctuations)',
      prices: [100, 80, 60, 70, 60, 75, 85],
      expected: [1, 1, 1, 2, 1, 4, 6]
    },
    {
      name: 'Strictly increasing prices',
      prices: [10, 20, 30, 40, 50],
      expected: [1, 2, 3, 4, 5]
    },
    {
      name: 'Strictly decreasing prices',
      prices: [50, 40, 30, 20, 10],
      expected: [1, 1, 1, 1, 1]
    },
    {
      name: 'All identical prices',
      prices: [25, 25, 25, 25, 25],
      expected: [1, 2, 3, 4, 5]
    },
    {
      name: 'Single price element',
      prices: [42],
      expected: [1]
    },
    {
      name: 'Peaks and valleys',
      prices: [31, 41, 48, 59, 79, 70, 85],
      expected: [1, 2, 3, 4, 5, 1, 7]
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 901 Tests ===\n')

  testCases.forEach((test, index) => {
    const spanner = new StockSpannerClass()
    const results: number[] = []

    // Simulate daily price inputs
    for (const price of test.prices) {
      results.push(spanner.next(price))
    }

    // Validate results
    const isPassed =
      results.length === test.expected.length &&
      results.every((val, i) => val === test.expected[i])

    if (isPassed) {
      passedCount++
      console.log(`[PASS] Test ${index + 1}: ${test.name}`)
    } else {
      console.error(`[FAIL] Test ${index + 1}: ${test.name}`)
      console.error(`  Prices:   ${JSON.stringify(test.prices)}`)
      console.error(`  Expected: ${JSON.stringify(test.expected)}`)
      console.error(`  Received: ${JSON.stringify(results)}`)
      console.error('-'.repeat(40))
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(StockSpanner)
