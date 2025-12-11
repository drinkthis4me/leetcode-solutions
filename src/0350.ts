// 350. Intersection of Two Arrays II

/**
 * Sorting and Two Pointers
 * T:O(n log n + m log m); S: O(1); 
 */
function intersect(nums1: number[], nums2: number[]): number[] {
  // Sort both array
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  //             i
  // [1, 1, 2, 2]
  // [1, 2, 2]
  //          j

  const res: number[] = []
  // Initialize two pointers
  // `i` points to `nums1`; j points to `nums2`.
  let i = 0
  let j = 0

  while (i < nums1.length && j < nums2.length) {
    const n1 = nums1[i]!
    const n2 = nums2[j]!

    if (n1 === n2) {
      res.push(n1)
      i++
      j++
    } else if (n1 < n2) {
      i++
    } else {
      // n1 > n2
      j++
    }
  }

  return res
};

/**
 * Hash Map
 * T: O(n + m); S: O(min(n, m));
 */
function intersect2(nums1: number[], nums2: number[]): number[] {
  // Make sure `nums1` is the shorter array
  if (nums1.length > nums2.length) {
    return intersect2(nums2, nums1)
  }

  // Result array
  const res: number[] = []
  // Count the frequency of elements in `nums1`
  // [value, frequency]
  const map = new Map<number, number>()
  for (const n of nums1) {
    map.set(n, (map.get(n) ?? 0) + 1)
  }

  // Iterate through `nums2` and check for matches
  for (const n of nums2) {
    if (map.has(n) && map.get(n)! > 0) {
      // Add current value to result
      res.push(n)
      // Update frequency
      map.set(n, map.get(n)! - 1)
    }
  }

  return res
}

/**
 * Binary Search
 * T: O(n log m); S: O(1);
 */
function intersect3(nums1: number[], nums2: number[]): number[] {
  // Make sure `nums1` is the shorter array
  if (nums1.length > nums2.length) {
    return intersect3(nums2, nums1)
  }

  // Sort `nums2`
  nums2.sort((a, b) => a - b)

  // Result array
  const res: number[] = []
  // Array to record visited index
  const visited: boolean[] = new Array(nums2.length).fill(false)

  // Iterate through `nums1` 
  // For each element, do binary search on `nums2`
  for (const n of nums1) {
    let left = 0
    let right = nums2.length - 1
    // Found index
    let idx = -1

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)

      if (nums2[mid]! === n) {
        // Store the possible result's index
        idx = mid
        // Handle duplicate: Find the upper bound (first instance)
        right = mid - 1
      } else if (nums2[mid]! > n) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    // Post-processing
    if (idx !== -1) {
      // Linear Scan for the First Unvisited Duplicate
      for (
        let i = idx;
        i < nums2.length && nums2[i] === n;
        i++
      ) {
        if (!visited[i]) {
          // Match found and it hasn't been used yet
          visited[i] = true
          res.push(n)
          break
        }
      }
    }
  }


  return res
}

const nums1 = [1, 2, 2, 1], nums2 = [2, 2]
const expected = [2, 2]
// const nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
// const expected = [9, 4]

const output = intersect3(nums1, nums2)

console.log('Input: ', nums1, nums2)
console.log('expected: ', expected)
console.log('output: ', output)