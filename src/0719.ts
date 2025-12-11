// 719. Find K-th Smallest Pair Distance

/**
 * Bucket Sort
 * T: O(n^2 + M); S: O(M);
 */
function smallestDistancePair(nums: number[], k: number): number {
  const n = nums.length
  // Find the max element in the array
  let maxElement = Math.max(...nums)
  // Initialize a bucket array to store counts of each distance
  const distanceBucket: number[] = new Array(maxElement + 1).fill(0)

  // Populate the bucket array with counts of each distance
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const distance = Math.abs(nums[i]! - nums[j]!)

      // Increment the count for this distance in the bucket
      distanceBucket[distance]! ++
    }
  }

  // Find the k-th smallest distance
  for (let i = 0; i <= maxElement; i++) {
    k -= distanceBucket[i]!

    if (k <= 0) {
      return i
    }
  }

  // No distance found. Should not reach here.
  return -1
};

/**
 * Binary Search & DP
 */
function smallestDistancePair2(nums: number[], k: number): number {
  // Sort the array for binary search
  nums.sort((a, b) => a - b)

  const n = nums.length
  const maxElement = nums[n - 1]!

  // Auxiliary arrays for DP
  const prefixCountSize = maxElement + 1
  // valueCount[v] = number of times value 'v' appears in nums
  const valueCount: number[] = new Array(prefixCountSize).fill(0)
  // prefixCount[v] = number of elements in nums that are <= 'v'
  const prefixCount: number[] = new Array(prefixCountSize).fill(0)

  // Example: `nums = [1, 3, 3]`
  // prefixCount = [0, 1, 1, 3]
  // valueCount = [0, 1, 0, 3]

  // Compute value counts
  for (const num of nums) {
    valueCount[num]!++;
  }
  // Compute prefix counts
  let runningCount = 0;
  for (let value = 0; value < prefixCountSize; ++value) {
    runningCount += valueCount[value]!;
    prefixCount[value] = runningCount;
  }

  // Helper fn for counting the number of pairs `(i, j)` with `i < j` such that `nums[j] - nums[i] <= maxDistance`.
  const countPairs = (maxDistance: number): number => {
    let count = 0

    let idx = 0
    while (idx < n) {
      const currentValue = nums[idx]!
      const valueCountForCurrent = valueCount[currentValue]!
      const pairsWithLargerValues =
        prefixCount[Math.min(
          currentValue + maxDistance, prefixCount.length - 1
        )]! -
        prefixCount[currentValue]!
      const pairsWithSameValues = (valueCountForCurrent * (valueCountForCurrent - 1)) / 2
      count += pairsWithLargerValues * valueCountForCurrent + pairsWithSameValues

      while (idx + 1 < n && nums[idx] === nums[idx + 1]) {
        idx++
      }
      idx++
    }
    return count
  }

  // Binary search in [0, (Max distance)]
  let left = 0 // Min possible distance (duplicate numbers)
  let right = maxElement // Max possible distance
  let res = maxElement
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)

    // Count the number of pairs with helper fn
    const count = countPairs(mid)

    if (count >= k) {
      // 'middle' is a possible answer. Try for a smaller distance.
      res = mid
      right = mid - 1
    } else {
      // Not enough pairs with this distance. Need a larger distance.
      left = mid + 1
    }
  }

  return res
}

/**
 * Binary Search & Sliding Window
 * T: O(n log n + n log w); S: O(1);
 */
function smallestDistancePair3(nums: number[], k: number): number {
  // Sort the array for binary search
  nums.sort((a, b) => a - b)

  const n = nums.length

  // Get the max possible distance 
  const maxDistance = nums[n - 1]! - nums[0]!

  // Helper fn
  // Counts the number of pairs `(i, j)` with `i < j` such that `nums[j] - nums[i] <= maxDistance`.
  const countPairs = (maxDistance: number): number => {
    let count = 0

    // Two pointers to form a sliding window: [left, right]
    let left = 0
    for (let right = 0; right < n; right++) {
      while (nums[right]! - nums[left]! > maxDistance) {
        left++
      }
      // For the current `nums[right]`, all elements from 
      // `nums[left]` up to `nums[right - 1]` form a valid pair distance (<= maxDistance)
      count += right - left
    }

    return count
  }

  // Binary search on the possible `k`th smallest distance
  let left = 0
  let right = maxDistance
  let result = maxDistance

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    // Get count of pairs with distance <= `mid`
    const count = countPairs(mid)

    // Binary search check: Does `mid` produce enough pairs?
    if (count >= k) {
      // `mid` is a possible answer
      // Find a smaller distance
      result = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  return result
}

const nums = [1, 3, 1], k = 1
const expected = 0
// const nums = [1,1,1], k = 2
// const expected = 0
// const nums = [1, 6, 1], k = 3
// const expected = 5
// const nums = [1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900], k = 50
// const expected = 300

const output = smallestDistancePair3(nums, k)

console.log('Input: ', nums, k)
console.log('expected: ', expected)
console.log('output: ', output)