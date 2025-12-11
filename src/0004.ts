// 4. Median of Two Sorted Arrays

/**
 * Merge And Sort
 * T: O((m + n) * log (m + n)); S: O(m + n);
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const nums = [...nums1, ...nums2].sort((a, b) => a - b)

  const n = nums.length
  const mid = Math.floor(n / 2)

  if (n % 2 === 0) {
    // Even length
    return (nums[mid - 1]! + nums[mid]!) / 2
  } else {
    // Odd length
    return nums[mid]!
  }
};

/**
 * Merge Sort and Pointers
 * T: O(m + n); S: O(1);
 */
function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  // Lengths
  const n1 = nums1.length
  const n2 = nums2.length
  const n = n1 + n2
  // Pointers
  let p1 = 0 // Pointer for `nums1`
  let p2 = 0 // Pointer for `nums2`

  // Helper function using merge sort to advance pointers
  const getMin = (): number => {
    if (p1 < n1 && p2 < n2) {
      // Pointers are in bound
      // Both arrays have numbers
      // Return smaller and advance pointer
      return nums1[p1]! < nums2[p2]! ? nums1[p1++]! : nums2[p2++]!
    } else if (p1 < n1) {
      // `nums2` is exhausted
      return nums1[p1++]!
    } else if (p2 < n2) {
      // `nums1` is exhausted
      return nums2[p2++]!
    }

    // Both exhausted
    return -1
  }


  if (n % 2 === 0) {
    // Even length
    // Return the mean of middle two numbers
    for (let i = 0; i < (n / 2) - 1; i++) {
      getMin()
    }

    return (getMin()! + getMin()!) / 2
  } else {
    // Odd length
    // Return the middle number
    for (let i = 0; i < Math.floor((n / 2)); i++) {
      getMin()
    }

    return getMin()!
  }
}

/**
 * Binary Search
 * T: O(log(min(m, n))); S: O(1);
 */
function findMedianSortedArrays3(nums1: number[], nums2: number[]): number {
  // Make sure that `nums1` is the shorter array (n1 <= n2)
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1)
  }

  // Lengths
  const n1 = nums1.length
  const n2 = nums2.length
  const n = n1 + n2
  // The target total size of the left partition.
  // The +1 ensures correct handling for both odd and even total lengths.
  const half = Math.floor((n + 1) / 2)
  // Pointers for `nums1` to calculate mid index with binary search
  // NOTE: We don't need to do binary search for `nums1` because
  // (Total left half elements) = (Left half elements from `nums1`) + (Left half elements from `nums2`) 
  let left = 0
  let right = n1

  // Binary search until we get the median
  while (left <= right) {
    // Partition point in `nums1` (number of elements in the left part of `nums1`)
    const i = Math.floor((left + right) / 2)
    // Partition point in `nums2`
    const j = half - i

    // Get the partition elements from `nums1`: [0...i-1, i...(n1-1)]
    // If out of bound, set to Infinity/-Infinity
    const left1 = (i === 0) ? -Infinity : nums1[i - 1]!
    const right1 = (i === n1) ? Infinity : nums1[i]!
    // Get the partition elements from `nums2`: [0...j-1, j...(n2-1)]
    const left2 = (j === 0) ? -Infinity : nums2[j - 1]!
    const right2 = (j === n2) ? Infinity : nums2[j]!

    // Check if the current partition is correct
    // Merged array: [0...i, j, (i+1), (j+1)...(n1-1), (n2-1)]
    // If partition for `nums1` at middle index `i` is correct,
    // number at index `i` should be less or equal to number at index `(j+ 1)` (and `(i+ 1)`, but we already knew that).
    // Vise versa for `nums2`.
    if (left1 <= right2 && left2 <= right1) {
      // Partition is correct. 
      // The elements in the left half are all smaller than the elements in the right half.
      // End binary search.
      // Return median based on total length
      if (n % 2 === 0) {
        // Even length
        return (Math.max(left1, left2) + Math.min(right1, right2)) / 2
      } else {
        // Odd length
        return Math.max(left1, left2)
      }
    } else if (left1 > right2) {
      // `nums1`'s left part is too large
      // Move partition to the left
      right = i - 1
    } else {
      // `nums2`'s left part is too large.
      // Move partition to the right
      left = i + 1
    }
  }

  // End of binary search. Cannot find median.
  // Input arrays are not sorted or logic error.
  return 0
}

const nums1 = [1, 3], nums2 = [2]
const expected = 2
// const nums1 = [0, 0, 0, 0, 0], nums2 = [-1, 0, 0, 0, 0, 0, 1]
// const expected = 0

const output = findMedianSortedArrays3(nums1, nums2)

console.log('Input: ', nums1, nums2)
console.log('expected: ', expected)
console.log('output: ', output)