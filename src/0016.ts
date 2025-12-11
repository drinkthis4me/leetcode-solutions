// 16. 3Sum Closest

/**
 * Two Pointers & Sorting
 * T: O(n^2); S: O(1);
 */
function threeSumClosest(nums: number[], target: number): number {
  // Sort the array to simplify pointer movements
  nums.sort((a, b) => a - b)

  // [-4, -1, 1, 2]
  //   i (fixed)   
  //       L     R

  const n = nums.length
  let closestSum = Infinity
  let minDiff = Infinity

  // Fix one number at index `i`
  for (let i = 0; i < n - 2; i++) {
    // sum = nums[i] + nums[left] + nums[right]
    let left = i + 1
    let right = n - 1

    // Binary search
    // Find the sum with fixed first number by finding the min diff
    while (left < right) {
      const currentSum = nums[i]! + nums[left]! + nums[right]!
      const currentDiff = Math.abs(target - currentSum)

      // Update the `closestSum` if new min diff found
      if (currentDiff < minDiff) {
        minDiff = currentDiff
        closestSum = currentSum
      }

      // Move the pointer to find the next possible closer sum
      if (currentSum === target) {
        // Exact target sum found
        return target
      } else if (currentSum < target) {
        // Find a larger sum
        left++
      } else {
        // Find a smaller sum
        right--
      }
    }
  }

  return closestSum
};

const nums = [-1, 2, 1, -4], target = 1
const expected = 2
// const nums = [0,0,0], target = 1
// const expected = 0

const ans = threeSumClosest(nums, target)

console.log('Input: ', nums, target)
console.log('expected: ', expected)
console.log('answer: ', ans)
