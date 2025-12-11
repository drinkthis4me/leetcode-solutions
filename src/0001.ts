// 1. Two Sum

/**
 * Hash Map
 * T: O(n); S: O(n);
 */
function twoSum(nums: number[], target: number): number[] {
  // Map stores `[value, index]`
  const map = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]!
    const pair = target - num

    if (map.has(pair)) {
      return [map.get(pair)!, i]
    } else {
      map.set(num, i)
    }
  }

  // No solution found
  return [-1, -1];
}

const nums = [2, 7, 11, 15]
const target = 9
const output = twoSum(nums, target);

console.log('Input: ', nums)
console.log('expected: ', target)
console.log('output: ', output)