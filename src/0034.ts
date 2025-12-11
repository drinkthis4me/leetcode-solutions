// 34. Find First and Last Position of Element in Sorted Array

/**
 * Binary Search
 * T: O(log n); S: O(1); 
 */
function searchRange(nums: number[], target: number): number[] {
  // Do Binary search twice to find the lower bound and upper bound

  // nums = [5,7,7,8,8,10], target = 8
  // Lower bound is at index 3
  // Upper bound is at index 4

  /**
   * Helper function.
   * @param nums Number array.
   * @param target Target number to find.
   * @param findLowerBound True to find the lower bound; false to find the upper bound.
   * @returns Index of target number in array.
   */
  const binarySearch = (
    nums: number[],
    target: number,
    findLowerBound: boolean
  ): number => {
    let left = 0
    let right = nums.length - 1

    let idx = -1

    // [0, 1, 2, 2]
    //     L
    //  R
    //  M

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)

      if (nums[mid]! < target) {
        // Discard left
        left = mid + 1
      } else if (nums[mid]! > target) {
        // Discard right
        right = mid - 1
      } else { // `nums[mid] === target`
        // Store possible answer
        idx = mid
        // Discard based on `findLowerBound`
        if (findLowerBound) {
          // Discard right
          right = mid - 1
        } else {
          // Discard left
          left = mid + 1
        }
      }
    }

    // `left > right`
    return idx
  }

  const ans = [-1, -1]

  ans[0] = binarySearch(nums, target, true)
  // Only search for the upper bound if the lower bound was found (optimization)
  if (ans[0] !== -1) {
    ans[1] = binarySearch(nums, target, false)
  }

  return ans
};

/**
 * Binary Search
 * T: O(log n); S: O(1); 
 */
function searchRange2(nums: number[], target: number): number[] {
  // Find lower bound of `target` and `target + 1`.

  // nums = [5, 7, 7, 8, 8, 10], target = 8
  // [lowerBound(8), lowerBound(9)] = [3, 5]

  // nums = [5, 7, 10, 10], target = 10
  // [lowerBound(10), lowerBound(11)] = [2, 4]

  /**
   * Helper function to find the index of the lower bound.
   * 
   * If the element is not found, it returns `nums.length`.
   * @param nums 
   * @param target 
   * @returns Index
   */
  const lowerBound = (nums: number[], target: number): number => {
    // Search range: [0...(n + 1)]
    let left = 0
    let right = nums.length
    let idx = nums.length // Default: one pass the end

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2)

      if (nums[mid]! >= target) {
        // Store potential answer
        idx = mid
        // Find bound in the left
        // Discard right
        right = mid
      } else {
        // Discard left and mid
        left = mid + 1
      }
    }

    return idx
  }

  const start = lowerBound(nums, target)

  // Check if `start` is out of bound or element is not the target.
  if (start === nums.length || nums[start] !== target) {
    return [-1, -1]
  }

  const end = lowerBound(nums, target + 1) - 1

  return [start, end]
}

/**
 * Binary Search (template III)
 * T: O(log n); S: O(1); 
 */
function searchRange3(nums: number[], target: number): number[] {
  // Edge Case
  if (nums.length === 0) {
    return [-1, -1]
  }

  const findBoundary = (nums: number[], target: number, findLowerBound: boolean): number => {
    let left = 0
    let right = nums.length - 1
    while (left + 1 < right) {
      const mid = left + Math.floor((right - left) / 2)

      if (findLowerBound) {
        if (nums[mid]! >= target) {
          right = mid
        } else {
          left = mid
        }
      } else {
        if (nums[mid]! <= target) {
          left = mid
        } else {
          right = mid
        }
      }
    }

    // Post-processing: `left + 1 === right`
    if (findLowerBound) {
      // Check left first
      if (nums[left] === target) return left
      if (nums[right] === target) return right

      // target is not in the array
      return -1
    } else {
      if (nums[right] === target) return right + 1
      if (nums[left] === target) return left + 1

      if (nums[right]! > target) return right
      if (nums[left]! > target) return left

      // All elements are less than target
      return nums.length
    }
  }

  const leftIndex = findBoundary(nums, target, true)

  if (leftIndex === -1 || nums[leftIndex] !== target) {
    return [-1, -1]
  }

  const rightIndex = findBoundary(nums, target, false)


  return [leftIndex, rightIndex - 1]
}

const nums = [5, 7, 7, 8, 8, 10], target = 8
// const nums = [1, 2, 5, 7], target = 8

const expected = [3, 4]

const output = searchRange3(nums, target)

console.log('Input: ', nums, target)
console.log('expected: ', expected)
console.log('output: ', output)