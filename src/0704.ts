// 704. Binary Search

/**
 * Binary Search: Find exact target
 * T: O(log n); S: O(1)
 */
function search(nums: number[], target: number): number {
  // Pointers
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2)

    const middleNum = nums[middle]!
    if (middleNum < target) {
      // Discard left part
      left = middle + 1
    } else if (middleNum > target) {
      // Discard right part
      right = middle - 1
    } else { // middleNum === target
      // Found target
      return middle
    }
  }

  // End of search. Cannot found target.
  return -1
};

/**
 * Binary Search: Find exact target - alternative
 * T: O(log n); S: O(1)
 */
function search2(nums: number[], target: number): number {
  let left = 0
  let right = nums.length - 1

  while (left !== right) {
    const middle = left + Math.ceil((right - left) / 2)

    if (nums[middle]! > target) {
      right = middle - 1
    } else {
      left = middle
    }
  }

  // Loop ends, `left === right`
  // Check if middle number equals to target
  return nums[left] === target ? left : -1
}

/**
 * Binary Search: Find lower bound
 * T: O(log n); S: O(1)
 */
function search3(nums: number[], target: number): number {
  let left = 0
  let right = nums.length

  while (left < right) {
    const middle = left + Math.floor((right - left) / 2)

    if (nums[middle]! >= target) {
      // If `mid == target` or `mid > target`, the lower bound is on mid's left.
      // Discard right half and mid 
      right = middle
    } else {
      // If mid < target, the lower bound is on mid's right.
      // Discard left half while keeping mid
      left = middle + 1
    }
  }

  // Value check
  if (left < nums.length && nums[left] === target) {
    return left
  } else {
    // 1. left >= nums.length
    //    `target` is not in `nums`
    // 2. nums[left] !== target
    //    nums[left] is greater than `target`
    return -1
  }
}

/**
 * Binary Search: Find upper bound
 * T: O(log n); S: O(1)
 */
function search4(nums: number[], target: number): number {
  let left = 0
  let right = nums.length

  while (left < right) {
    const middle = left + Math.floor((right - left) / 2)

    if (nums[middle]! <= target) {
      left = middle + 1
    } else {
      right = middle
    }
  }

  // Value check
  if (left > 0 && nums[left - 1] === target) {
    return left - 1
  } else {
    return -1
  }
}


const nums = [1, 2, 4, 4, 4, 5, 6, 7]
const target = 4

const expected = 2

const output = search4(nums, target)

console.log('Input: ', nums, target)
console.log('expected: ', expected)
console.log('output: ', output)