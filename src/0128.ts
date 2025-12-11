// 128. Longest Consecutive Sequence

/**
 * Filter and Sort
 * T: O(n log n); S: O(n);
 * 
 * Violation: O(n log n) time complexity
 */
function longestConsecutive(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  // Filter and sort the array
  const _nums = [...new Set(nums)]
  _nums.sort((a, b) => a - b)

  // Find longest consecutive sequence
  let currentLength = 1
  let maxLength = 1
  for (let i = 1; i < _nums.length; i++) {
    // Compare i and (i - 1)
    if (_nums[i]! === _nums[i - 1]! + 1) {
      currentLength++
    } else {
      currentLength = 1
    }

    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
};

/**
 * Map
 * T:O(n); S: O(n);
 */
function longestConsecutive2(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  // Map for lookup: [(value), (visited)]
  const map = new Map<number, boolean>()
  for (const num of nums) {
    map.set(num, false)
  }

  let maxLength = 1

  for (const num of nums) {
    // Only check unvisited number
    if (!map.get(num)) {
      // Mark as visited
      map.set(num, true)

      // Find the longest consecutive length starting from `num`
      let currentLength = 1
      let currentNum = num
      while (map.has(currentNum + 1)) {
        currentLength++
        currentNum++
        map.set(currentNum, true)
      }

      // Compare and update `maxLength`
      maxLength = Math.max(maxLength, currentLength)
    }
  }

  return maxLength
};

/**
 * Test Starting Number w/ Set
 * T:O(n); S: O(n);
 */
function longestConsecutive3(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  const set = new Set<number>(nums)

  let maxLength = 0

  for (const num of set) {
    // Only test starting number
    // i.e. (num - 1) does not exist.
    if (!set.has(num - 1)) {
      let currNum = num
      while (set.has(currNum)) {
        currNum++
      }

      // Calculate length: last - start
      const currentLength = currNum - num

      // Compare and update `maxLength`
      maxLength = Math.max(maxLength, currentLength)
    }
  }

  return maxLength
};

const nums = [100, 4, 200, 1, 3, 2]
const expected = 4
// const nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
// const expected = 9
// const nums = [1, 0, 1, 2]
// const expected = 3

const output = longestConsecutive3(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)