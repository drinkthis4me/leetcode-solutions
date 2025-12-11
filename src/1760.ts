// 1760. Minimum Limit of Balls in a Bag

/**
 * Binary Search
 * T: O(n log m); S: O(1);
 */
function minimumSize(nums: number[], maxOperations: number): number {
  // We need to shrink the largest bag as much as possible.
  // After all operations have been applied, all bags must have
  // a number of balls less than or equal to the target we are testing.

  // Mathematically:
  // nums[i] <= ((i th operation) + 1) * maxBallsInBag

  // Calculating the number of splits:
  // (i th operation) = nums[i] / maxBallsInBag) - 1

  // Helper fn
  // check if a distribution is possible for a given max size
  const checkPossibleMax = (maxSize: number): boolean => {
    let operationsNeeded = 0

    for (const balls of nums) {
      // (Number of new bags) = ceil(balls / maxSize)
      // (Operation needed) = (Number of new bags) - 1

      // Example: 10 balls, maxSize = 3 -> [3, 3, 3, 1]
      // (number of new bags) = ceil(10 / 3) = 4
      // (Operation needed) = 4 - 1 = 3
      const operations = Math.ceil(balls / maxSize) - 1
      operationsNeeded += operations

      if (operationsNeeded > maxOperations) {
        return false
      }
    }

    // Check if operation needed is within allowed max operation
    return operationsNeeded <= maxOperations
  }

  // Binary search to find the min bag size
  // Search range:
  //  - Left: 1 (every bag has size 1)
  //  - Right: max(nums) (perform 0 operation)
  let left = 1
  let right = Math.max(...nums)

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    // Calculate the current penalty with bag size `mid`
    const isPossible = checkPossibleMax(mid)

    if (isPossible) {
      // Try a smaller size
      right = mid
    } else {
      // Try a larger size
      left = mid + 1
    }
  }

  return left
};

// const nums = [9], maxOperations = 2
// const expected = 3
const nums = [2, 4, 8, 2], maxOperations = 4
const expected = 2

const ans = minimumSize(nums, maxOperations)

console.log('Input: ', nums, maxOperations)
console.log('expected: ', expected)
console.log('answer: ', ans)
