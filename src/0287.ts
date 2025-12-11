// 287. Find the Duplicate Number

/**
 * Set
 * T: O(n); S: O(n);
 * 
 * Failed: Not constant extra space.
 */
function findDuplicate(nums: number[]): number {
  const set = new Set<number>()

  for (const n of nums) {
    if (set.has(n)) {
      return n
    } else {
      set.add(n)
    }
  }

  return -1
};

/**
 * Sort
 * T: O(n log n); S: O(log n);
 * 
 * Failed: Input modified.
 */
function findDuplicate2(nums: number[]): number {
  nums.sort((a, b) => a - b)

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return nums[i]!
    }
  }

  return -1
};

/**
 * Index Sort
 * T: O(n); S: O(1);
 * 
 * Failed: Input modified
 */
function findDuplicate3(nums: number[]): number {
  // Since `nums` is in the range of `[1, n]`,
  // `n` should occupy index `n - 1` after sorting.

  // Duplicate number will occupy the same position.
  // Check and swap number by its correct position until duplicate found.

  for (let i = 0; i < nums.length;) {
    const n = nums[i]!

    if (n === i + 1) {
      // `n` is at the correct position. Skip.
      i++
    } else if (n === nums[n - 1]) {
      // Duplicate found:
      // The number `n` is already correctly placed at `n - 1`.
      // The current index `i` also holds the number `n`.
      return n
    } else {
      // `n` is not at the correct position and is not a duplicate.
      // Swap the number `n` with the number at its target position `nums[n - 1]`.
      nums[i] = nums[n - 1]!
      nums[n - 1] = n
    }
  }

  return -1
};

/**
 * Binary Search
 * T: O(n log n); S: O(1);
 */
function findDuplicate4(nums: number[]): number {
  // Pigeonhole Principle:
  // (n + 1) integers placed in an array of length n.
  // At least 1 integer will be repeated.

  let left = 1
  let right = nums.length - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    let count = 0

    // Count elements from [0, mid]
    for (let i = 0; i < nums.length; i++) {
      if (nums[i]! <= mid) {
        count++
      }
    }

    if (count <= mid) {
      // Duplicate must be in [(mid + 1), right]
      left = mid + 1
    } else {
      // Duplicate must be in [left, mid]
      right = mid
    }
  }

  return left
};

/**
 * Floyd's Cycle Detection
 * T: O(n); S: O(1);
 */
function findDuplicate5(nums: number[]): number {
  // Array as a linked list:
  // i -> nums[i] -> nums[nums[i]] -> ...

  // Example: [1, 3, 4, 2]
  // List: 0 -> 1 -> 3 -> 2 -> 4 -> null

  // Example: [1, 3, 4, 2, 2]
  // List: 0 -> 1 -> 3 -> 2 -> 4 -> 2 -> 4 -> 2 -> ...

  let slow = nums[0]!
  let fast = nums[nums[0]!]!

  // Find the intersection
  while (slow !== fast) {
    // Move `slow` one step
    slow = nums[slow]!
    // Move `fast` two steps
    fast = nums[nums[fast]!]!
  }

  // Find the entry point
  let finder = 0
  while (finder !== slow) {
    // Move both `finder` and `slow` one step a time
    finder = nums[finder]!
    slow = nums[slow]!
  }

  return finder
}

const nums = [1, 3, 4, 2, 2]
const expected = 2
// const nums = [3, 1, 3, 4, 2]
// const expected = 3
// const nums = [3, 3, 3, 3, 3]
// const expected = 3

const output = findDuplicate5(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)