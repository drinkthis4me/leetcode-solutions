// 540. Single Element in a Sorted Array

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function singleNonDuplicate(nums: number[]): number {
  // Pattern observation:
  // [1, 1, 2, 3, 3]
  // Pairs before the singleton will be at [even, odd] index position
  // e.g. 1 -> [0, 1]
  // Pairs after the singleton will be at [odd, even] index position
  // e.g. 3 -> [3, 4]

  let left = 0
  let right = nums.length - 1

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2)

    // if (
    //   (mid % 2 === 0 && nums[mid] === nums[mid + 1]) ||
    //   (mid % 2 === 1 && nums[mid] === nums[mid - 1])
    // ) {
    //   // Pair exist
    //   // Find singleton in the right part
    //   left = mid + 1
    // } else {
    //   // Pair broken
    //   // Find singleton in the left part
    //   right = mid
    // }

    // Adjust `mid` to be always even
    // This simplify the search range update
    if (mid % 2 === 1) {
      mid--
    }
    // Comparison and search range update
    if (nums[mid]! === nums[mid + 1]!) {
      // Find singleton in the right part (after the pair)
      left = mid + 2
    } else {
      // Find singleton in the left part
      right = mid
    }
  }

  // `left === right`
  return nums[left]!
};

/**
 * Brute Force - Linear Search
 * T: O(n); S: O(1);
 */
function singleNonDuplicate2(nums: number[]): number {
  // Check every odd index element
  for (let i = 0; i < nums.length - 1; i += 2) {
    // Find the pair
    if (nums[i] !== nums[i + 1]) {
      return nums[i]!
    }
  }

  return nums[nums.length - 1]!
}

/**
 * Brute Force - XOR
 * T: O(n); S: O(1);
 */
function singleNonDuplicate3(nums: number[]): number {
  // A XOR A = 0
  // A XOR 0 = A

  // For [1, 1, 2]:
  // 1 ^ 1 ^ 2
  // = (1 ^ 1) ^ 2
  // = 0 ^ 2
  // = 2

  let res = 0
  for (const n of nums) {
    res ^= n
  }

  return res
}

const nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
const expected = 2
// const nums = [3, 3, 7, 7, 10, 11, 11]
// const expected = 10

const output = singleNonDuplicate(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)