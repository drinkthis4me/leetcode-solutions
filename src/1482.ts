// 1482. Minimum Number of Days to Make m Bouquets

/**
 * Binary Search
 * T: O(n log D); S: O(1);
 */
function minDays(bloomDay: number[], m: number, k: number): number {
  // Find the smallest day in range: [1, (Max bloom day)]

  // Edge Case: 
  // Total number of flowers is less than the required number of flowers
  if ((m * k) > bloomDay.length) return -1

  // Helper fn
  // Calculate the number of bouquets that can be made on target day
  const getNumberOfBouquets = (targetDay: number): number => {
    let flowerCount = 0
    let bouquetCount = 0

    for (const day of bloomDay) {
      if (day <= targetDay) {
        // Current flower is bloomed and can be added to a bouquet
        flowerCount++
      } else {
        // Current flower is not bloomed.
        // Bouquet must use adjacent flowers, so we reset flower count here.
        flowerCount = 0
      }
      // Check if there is enough flowers to form a bouquet
      if (flowerCount === k) {
        // Increment bouquet count and reset flower count
        bouquetCount++
        flowerCount = 0
      }
    }

    return bouquetCount
  }

  // Binary search
  let left = 1
  let right = Math.max(...bloomDay)

  while (left < right) {
    // Try `mid` as min day
    const mid = left + Math.floor((right - left) / 2)
    const bouquets = getNumberOfBouquets(mid)

    if (bouquets < m) {
      // Not enough bouquets. Find a later day.
      left = mid + 1
    } else {
      // Enough bouquets. Find a previous possible day.
      right = mid
    }
  }

  // Validate: `left === right`
  return left
};

const bloomDay = [1, 10, 3, 10, 2], m = 3, k = 1
const expected = 3
// const bloomDay = [1, 10, 3, 10, 2], m = 3, k = 2
// const expected = -1
// const bloomDay = [7, 7, 7, 7, 12, 7, 7], m = 2, k = 3
// const expected = 12

const output = minDays(bloomDay, m, k)

console.log('Input: ', bloomDay, m, k)
console.log('expected: ', expected)
console.log('output: ', output)