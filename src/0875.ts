// 875. Koko Eating Bananas

/**
 * Binary Search
 * T: O(n log m); S: O(1);
 */
function minEatingSpeed(piles: number[], h: number): number {
  // Find the min eating speed (banana per hour)
  // Search range: [1, (Largest pile)]

  // Min possible speed
  let left = 1
  // Max possible speed
  let right = Math.max(...piles)

  while (left < right) {
    // Try mid as eating speed
    const mid = left + Math.floor((right - left) / 2)

    // Calculate hours required to finish all piles with this speed
    let hoursTaken = 0
    for (const pile of piles) {
      hoursTaken += Math.ceil(pile / mid)
    }

    if (hoursTaken > h) {
      // Current speed is too slow. Try a faster speed.
      left = mid + 1
    } else {
      // Current speed is acceptable. Try a slower speed.
      right = mid
    }
  }

  // Verify: `left === right`
  return left
};

const piles = [3, 6, 7, 11], h = 8
const expected = 4
// const piles = [30, 11, 23, 4, 20], h = 5
// const expected = 30
// const piles = [30, 11, 23, 4, 20], h = 6
// const expected = 23

const output = minEatingSpeed(piles, h)

console.log('Input: ', piles, h)
console.log('expected: ', expected)
console.log('output: ', output)