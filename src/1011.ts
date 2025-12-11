// 1011. Capacity To Ship Packages Within D Days

/**
 * Binary Search
 * T: O(n log W); S: O(1);
 */
function shipWithinDays(weights: number[], days: number): number {
  // Find the min capacity in range: [max(weights), sum(weights)]
  // Lower bound: Ship capacity must be greater or equal to the heaviest package.
  // Upper bound: On day 1, we ship all the packages.

  // Helper fn
  // Calculate if all the packages can be shipped within given day.
  const calculateShipping = (shipCapacity: number): boolean => {
    let currentCapacity = 0
    let currentDay = 1 // Starts at day 1

    for (const weight of weights) {
      if (currentCapacity + weight <= shipCapacity) {
        // Add to ship
        currentCapacity += weight
      } else {
        // Ship is full
        // Reset ship and advance to next day
        currentCapacity = weight
        currentDay++
      }

      // Check deadline
      if (currentDay > days) {
        return false
      }
    }

    // All packages shipped within D days
    return true
  }

  // Binary search
  // let left = Math.max(...weights)
  // let right = weights.reduce((sum, weight) => sum + weight, 0)
  let left = 0
  let right = 0
  for (const w of weights) {
    left = Math.max(left, w)
    right += w
  }

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    const canBeShipped = calculateShipping(mid)

    if (canBeShipped) {
      // Find a smaller ship
      right = mid
    } else {
      // Find a larger ship
      left = mid + 1
    }
  }

  // Range converged: `left === right`
  return left
};

const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], days = 5
const expected = 15
// const weights = [3, 2, 2, 4, 1, 4], days = 3
// const expected = 6
// const weights = [1, 2, 3, 1, 1], days = 4
// const expected = 3

const ans = shipWithinDays(weights, days)

console.log('Input: ', weights, days)
console.log('expected: ', expected)
console.log('answer: ', ans)