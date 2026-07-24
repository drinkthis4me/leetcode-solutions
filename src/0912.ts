// 912. Sort an Array

/**
 * Merge Sort (Top-down)
 * T: O(n log n); S: O(n);
 */
function sortArray(nums: number[]): number[] {
  // [5, 2, 3, 1]
  // Divide & Conquer:
  // [5, 2] | [3, 1]
  // [5],[2]| [3],[1]
  // Merge:
  // [2, 5], [1, 3]
  // [1, 2, 3, 5]

  // Helper fn to merge two arrays (conquer)
  const merge = (arr1: number[], arr2: number[]): number[] => {
    const n1 = arr1.length
    const n2 = arr2.length
    const n = n1 + n2

    // Result array with size n
    const res: number[] = Array(n)
    // Pointers for arrays
    let p1 = 0
    let p2 = 0
    let pr = 0

    while (p1 < n1 && p2 < n2) {
      if (arr1[p1] < arr2[p2]) {
        res[pr++] = arr1[p1++]
      } else {
        res[pr++] = arr2[p2++]
      }
    }

    // Append the rest to result
    while (p1 < n1) {
      res[pr++] = arr1[p1++]
    }
    while (p2 < n2) {
      res[pr++] = arr2[p2++]
    }

    return res
  }

  // Main sorting fn
  const mergeSort = (nums: number[]): number[] => {
    const n = nums.length
    if (n <= 1) return nums

    // Divide by choosing mid point as pivot
    const pivot = Math.floor(nums.length / 2)
    const leftParts = mergeSort(nums.slice(0, pivot))
    const rightParts = mergeSort(nums.slice(pivot, n))

    return merge(leftParts, rightParts)
  }

  return mergeSort(nums)
};

/**
 * Merge Sort (Top-down) 2
 * T: O(n log n); S: O(n);
 */
function sortArray2(nums: number[]): number[] {
  // Use pointers to avoid slicing

  // Auxiliary array for merging process
  const aux = new Array(nums.length)

  // Helper fn to merge two arrays (conquer)
  const merge = (left: number, mid: number, right: number) => {
    for (let i = left; i < right; i++) {
      aux[i] = nums[i]
    }

    // Pointers for left half, right half, and main array
    let i = left
    let j = mid
    let k = left

    while (i < mid && j < right) {
      if (aux[i] <= aux[j]) {
        nums[k++] = aux[i++]
      } else {
        nums[k++] = aux[j++]
      }
    }

    // Only need to copy remaining elements from the left side
    // (If the right side remains, they are already in the correct place)
    while (i < mid) {
      nums[k++] = aux[i++]
    }
  }

  // Main sorting fn
  const mergeSort = (left: number, right: number) => {
    if (right - left <= 1) return

    const mid = Math.floor((left + right) / 2)
    mergeSort(left, mid)
    mergeSort(mid, right)

    merge(left, mid, right)
  }

  mergeSort(0, nums.length)

  return nums
};

/**
 * Merge Sort (Bottom-up)
 * T: O(n log n); S: O(n);
 */
function sortArray3(nums: number[]): number[] {
  // [5, 2, 1, 3]
  // Divide & Conquer:
  // [5], [2], [1], [3]
  // Merge:
  // [2, 5], [1, 3]
  // [1, 2, 3, 5]
  const n = nums.length

  if (n <= 1) return nums

  const aux = new Array(n)

  // Helper fn to merge arrays [l, m) and [m, r)
  const merge = (l: number, m: number, r: number) => {
    // Copy range to aux array
    for (let i = l; i < r; i++) {
      aux[i] = nums[i]
    }

    // Pinter for left and right subarray
    let i = l
    let j = m

    for (let k = l; k < r; k++) {
      if (i < m && (j >= r || aux[i] <= aux[j])) {
        // 1. Left available
        // 2. "Right subarray exhausted" or "left el <= right el"
        nums[k] = aux[i++]
      } else {
        nums[k] = aux[j++]
      }
    }
  }

  // Merge subarray of size 1, 2, 4, 8 ...
  for (let width = 1; width < n; width *= 2) {
    for (let i = 0; i < n; i += 2 * width) {
      const left = i
      const mid = Math.min(i + width, n)
      const right = Math.min(i + 2 * width, n)

      merge(left, mid, right)
    }
  }

  return nums
}

/**
 * Quick Sort
 * @param nums
 */
function sortArray4(nums: number[]): number[] {
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  const partition = (arr: number[], lo: number, hi: number): number => {
    // Pick the last element as the pivot
    const pivot = arr[hi]
    let i = lo
    for (let j = lo; j < hi; j++) {
      if (arr[j] < pivot) {
        swap(arr, i, j)
        i++
      }
    }
    swap(arr, i, hi)

    return i
  }

  const quickSort = (arr: number[], lo: number, hi: number) => {
    if (lo < hi) {
      const p = partition(arr, lo, hi)
      quickSort(arr, lo, p - 1)
      quickSort(arr, p + 1, hi)
    }
  }

  quickSort(nums, 0, nums.length - 1)

  return nums
}

/**
 * Tester for LeetCode 912: Sort an Array
 * @param sortFn - The sorting function to test
 */
function runTests(sortFn: (nums: number[]) => number[]): void {
  const testCases = [
    { input: [5, 2, 3, 1], expected: [1, 2, 3, 5], label: 'Standard Case' },
    { input: [5, 1, 1, 2, 0, 0], expected: [0, 0, 1, 1, 2, 5], label: 'Duplicates' },
    { input: [-1, -5, 0, 2, 1], expected: [-5, -1, 0, 1, 2], label: 'Negative Numbers' },
    { input: [1], expected: [1], label: 'Single Element' },
    { input: [], expected: [], label: 'Empty Array' },
    { input: [10, 9, 8, 7, 6], expected: [6, 7, 8, 9, 10], label: 'Reverse Order' }
  ]

  console.log(`--- Starting tests for: ${sortFn.name || 'Anonymous Function'} ---`)

  testCases.forEach(({ input, expected, label }, index) => {
    // Create a copy to avoid mutating the test input for reference checks
    const result = sortFn([...input])

    // Simple deep equality check
    const isPassed = JSON.stringify(result) === JSON.stringify(expected)

    if (isPassed) {
      console.log(`[PASS] Test ${index + 1}: ${label}`)
    } else {
      console.error(`[FAIL] Test ${index + 1}: ${label}`)
      console.error(`   Input:    [${input}]`)
      console.error(`   Expected: [${expected}]`)
      console.error(`   Got:      [${result}]`)
    }
  })
  console.log('--- Testing Complete ---\n')
}

runTests(sortArray4)
