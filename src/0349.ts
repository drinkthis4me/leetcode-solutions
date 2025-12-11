// 349. Intersection of Two Arrays

/**
 * Sorting and Two Pointers
 * T:O(n log n + m log m); S: O(min(m, n));
 */
function intersection(nums1: number[], nums2: number[]): number[] {
  // Sort both arrays
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  const n1 = nums1.length
  const n2 = nums2.length
  // Initialize two pointers
  let p1 = 0
  let p2 = 0
  // Set to store results
  const set = new Set<number>()

  // Iterate pointers from left to right
  while (p1 < n1 && p2 < n2) {
    if (nums1[p1] === nums2[p2]) {
      // Add the same elements to set
      set.add(nums1[p1]!)
      p1++
      p2++
    } else if (nums1[p1]! > nums2[p2]!) {
      // The smaller one cannot appear in the other array
      p2++
    } else {
      // `nums1[p1] < nums2[p2]`    
      p1++
    }
  }

  // Convert Set to Array
  const res = Array.from(set)

  return res
};

/**
 * Two Sets
 * T:O(m + n); S: O(m + n);
 */
function intersection2(nums1: number[], nums2: number[]): number[] {
  const res: number[] = []

  const set1 = new Set(nums1)
  const set2 = new Set(nums2)

  // return [...set1.intersection(set2)]

  for (const n of set1) {
    if (set2.has(n)) {
      res.push(n)
    }
  }

  return res
};

/**
 * One Dictionary
 * T:O(m + n); S: O(m + n);
 */
function intersection3(nums1: number[], nums2: number[]): number[] {
  // Map to store frequency
  // Elements: [value, (1 for seen; 0 for added to result)]
  const seen = new Map<number, number>()
  // Result array
  const res: number[] = []

  // Mark values occurring in `nums1`
  for (const n of nums1) {
    seen.set(n, 1)
  }

  // Cross check `nums2`
  for (const n of nums2) {
    if (seen.has(n) && seen.get(n) === 1) {
      // Add `n` to result
      res.push(n)
      // Update dictionary entry as already added
      seen.set(n, 0)
    }
  }

  return res
};

/**
 * Binary Search
 * T: O((n + m) * log n); S: O(n + k);
 */
function intersection4(nums1: number[], nums2: number[]): number[] {
  // Make sure `nums1` is the shorter array
  if (nums1.length > nums2.length) {
    return intersection4(nums2, nums1)
  }

  // Sort the shorter array.
  nums1.sort((a, b) => a - b)

  // Set to store unique intersection elements
  const set = new Set<number>()

  // Iterate through `nums2` and search in `nums1`
  for (const n of nums2) {
    let left = 0
    let right = nums1.length - 1
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)

      if (nums1[mid] === n) {
        // Intersection found
        set.add(n)
        break
      } else if (nums1[mid]! > n) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
  }

  // Convert Set to Array for the final result
  return Array.from(set)
}

// const nums1 = [1, 2, 2, 1], nums2 = [2, 2]
// const expected = [2]
const nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
const expected = [9, 4]

const output = intersection4(nums1, nums2)

console.log('Input: ', nums1, nums2)
console.log('expected: ', expected)
console.log('output: ', output)