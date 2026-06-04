// 33. Search in Rotated Sorted Array

/**
 * Binary Search (Two Pass)
 * T: O(log n); S: O(1);
 */
function search(nums: number[], target: number): number {
  // Binary Search

  //              p
  // [4, 5, 6, 7, 0, 1, 2]
  //  L
  //           M
  //                    R

  // Rotated sorted array is essentially two sorted array joined at pivot.
  // 1. Find the pivot by the first binary search.
  // 2. Check which sorted half target belongs to. Discard other half.
  // 3. Second Binary search on the correct half.

  const n = nums.length

  // First binary search to find the pivot
  let l = 0
  let r = n - 1
  while (l < r) {
    const m = l + Math.floor((r - l) / 2)

    if (nums[m]! > nums[r]!) {
      l = m + 1
    } else {
      r = m
    }
  }

  // l pointer is now at pivot index
  let pivot = l
  l = 0
  r = n - 1
  // Decide which half to discard
  if (nums[l]! <= target && target < nums[pivot]!) {
    r = pivot - 1
  } else {
    l = pivot
  }

  // Second binary search to find the target
  while (l <= r) {
    const m = l + Math.floor((r - l) / 2)

    if (nums[m]! === target) {
      return m
    } else if (nums[m]! > target) {
      r = m - 1
    } else {
      l = m + 1
    }
  }

  // Cannot find target
  return -1
};

/**
 * Binary Search (One Pass)
 * T: O(log n); S: O(1);
 */
function search2(nums: number[], target: number): number {
  // Binary Search

  // [4, 5, 6, 7, 0, 1, 2]
  //  L
  //           M
  //                    R

  // Middle number is not the target.
  // We need to determine which half to discard.
  // Even the array is rotated, there will always be one sorted half.
  // In this case, [L...M] is sorted and [M...R] is not.
  // (We know this by comparing `L-M` and `M-R`.)
  // If target is in [L...M], discard right part.
  // Otherwise, discard left part.

  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const midNum = nums[mid]!

    // Middle value check
    if (midNum === target) {
      return mid
    }

    const leftNum = nums[left]!
    const rightNum = nums[right]!

    // Determine which half is sorted
    if (leftNum <= midNum) {
      // [left...mid] is sorted
      if (leftNum <= target && target < midNum) {
        // `target` is in [left...mid] range
        // Discard right part
        right = mid - 1
      } else {
        // `target` is in [(mid + 1)...right] range
        // Discard left part
        left = mid + 1
      }
    } else {
      // [mid...right] is sorted
      if (midNum < target && target <= rightNum) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }

  // Cannot find target
  return -1
};


const nums = [4, 5, 6, 7, 0, 1, 2]
const target = 0
const expected = 4
// const nums = [5, 1, 3]
// const target = 3
// const expected = 2
// const nums = [1, 2, 3, 4, 5, 6]
// const target = 1
// const expected = 0

const output = search(nums, target)

console.log('Input: ', nums, target)
console.log('expected: ', expected)
console.log('output: ', output)