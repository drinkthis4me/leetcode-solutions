// 215. Kth Largest Element in an Array

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * Min Heap
 * T: O(n log k); S: O(k);
 */
function findKthLargest(nums: number[], k: number): number {
  const minHeap = new MinPriorityQueue<number>()

  for (const n of nums) {
    minHeap.push(n)
    if (minHeap.size() > k) {
      minHeap.pop()
    }
  }

  return minHeap.front()!
};

/**
 * Quick Select
 * T: O(n) worst O(n ^ 2); S: O(1);
 */
function findKthLargest2(nums: number[], k: number): number {

  const partition = (nums: number[], l: number, r: number): number => {
    // Randomize pivot to maintain O(n) average time complexity
    const randomIndex = Math.floor(Math.random() * (r - l + 1)) + l;
    [nums[randomIndex], nums[r]] = [nums[r], nums[randomIndex]]

    const pivot = nums[r]
    let i = l
    for (let j = l; j < r; j++) {
      // Sort in descending order
      if (nums[j] > pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
        i++
      }
    }
    [nums[i], nums[r]] = [nums[r], nums[i]]
    return i
  }

  const n = nums.length
  let l = 0
  let r = n - 1
  const targetIdx = k - 1

  while (l <= r) {
    // Partition and get pivot index
    const pivotIdx = partition(nums, l, r)

    if (pivotIdx === targetIdx) {
      return nums[pivotIdx]
    } else if (pivotIdx < targetIdx) {
      l = pivotIdx + 1
    } else {
      r = pivotIdx - 1
    }
  }

  return -1 // Should not reach here for valid k
};

/**
 * Quick Select (Optimized)
 * T: O(n) worst O(n ^ 2); S: O(1);
 */
function findKthLargest3(nums: number[], k: number): number {

  const swap = (i: number, j: number): void => {
    [nums[i], nums[j]] = [nums[j], nums[i]]
  }

  const partition = (l: number, r: number): number => {
    // Median-of-three:
    // Swap element so that:
    //  - left is the largest
    //  - (left + 1) is the median
    //  - right is the smallest
    // [largest, median, ..., smallest]
    const mid = (l + r) >> 1
    swap(mid, l + 1)

    if (nums[l] < nums[r]) {
      swap(l, r)
    }
    if (nums[l + 1] < nums[r]) {
      swap(l + 1, r)
    }
    if (nums[l] < nums[l + 1]) {
      swap(l, l + 1)
    }

    // Hoare Partition
    const pivot = nums[l + 1]
    let i = l + 1
    let j = r

    while (true) {
      while (nums[++i] > pivot);
      while (nums[--j] < pivot);
      if (i > j) break
      swap(i, j)
    }

    nums[l + 1] = nums[j]
    nums[j] = pivot
    return j
  }

  function quickSelect(k: number) {
    let l = 0
    let r = nums.length - 1

    while (true) {
      if (r <= l + 1) {
        if (r == l + 1 && nums[r] > nums[l]) {
          swap(l, r)
        }
        return nums[k]
      }

      const j = partition(l, r)

      if (j >= k) r = j - 1
      if (j <= k) l = j + 1
    }
  }

  return quickSelect(k - 1)
}

/**
 * --- Tester ---
 */
function runTests(fn: (nums: number[], k: number) => number) {
  const testCases = [
    { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
    { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
    { nums: [1], k: 1, expected: 1 },
    { nums: [7, 6, 5, 4, 3, 2, 1], k: 2, expected: 6 },
    { nums: [1, 2, 3, 4, 5], k: 5, expected: 1 }
  ]

  console.log(`--- Testing Function: ${fn.name} ---`)

  testCases.forEach(({ nums, k, expected }, index) => {
    // Copy array to prevent mutations affecting subsequent tests
    const result = fn([...nums], k)
    const passed = result === expected

    console.log(
      `Test ${index + 1}: ${passed ? 'PASSED' : 'FAILED'} ` +
      `| Input: [${nums}], k=${k} ` +
      `| Expected: ${expected}, Got: ${result}`
    )
  })
  console.log('')
}

runTests(findKthLargest2)
