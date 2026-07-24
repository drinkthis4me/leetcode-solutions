// 220. Contains Duplicate III

/**
 * You are given an integer array nums and two integers indexDiff and valueDiff.
 * Find a pair of indices (i, j) such that:
 *
 *     i != j,
 *     abs(i - j) <= indexDiff.
 *     abs(nums[i] - nums[j]) <= valueDiff, and
 *
 * Return true if such pair exists or false otherwise.
 */

/**
 * Sliding Window
 * T: O(n^2); S: O(1);
 */
function containsNearbyAlmostDuplicate(nums: number[], indexDiff: number, valueDiff: number): boolean {
  // Test every number within a fixed window
  // Edge case
  if (indexDiff < 1 || valueDiff < 0) return false

  const n = nums.length

  // Skip the last number
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j <= Math.min(indexDiff, n - 1); j++) {
      // Use BigInt to prevent number overflow
      let t = BigInt(nums[i]) - BigInt(nums[j])
      if (t < 0) {
        t = -t
      }

      // Fixed window for j
      // Only need to check value diff
      if (t <= BigInt(valueDiff)) {
        return true
      }
    }
  }

  return false
};

/**
 * Bucket
 * T: O(n); S: O(n);
 */
function containsNearbyAlmostDuplicate2(nums: number[], indexDiff: number, valueDiff: number): boolean {
  // 1. Bucket sort
  //    Map numbers to buckets with bucket width of t + 1.
  //    - Numbers in the same bucket will have difference at most t.
  //    - Numbers in the neighboring buckets may have difference at most t.
  // 2. Sliding window
  //    Use a hash map to maintain the index difference.

  // Edge case
  if (!nums || nums.length === 0) return false
  if (indexDiff < 1 || valueDiff < 0) return false

  const buckets = new Map<number, number>()
  const width = valueDiff + 1

  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i]
    const bucketId = Math.floor(curr / width)

    // Check same bucket
    if (buckets.has(bucketId)) return true

    // Check adjacent buckets
    if (buckets.has(bucketId - 1)) {
      const prev = buckets.get(bucketId - 1)!
      const diff = Math.abs(prev - curr)
      if (diff <= valueDiff) return true
    }
    if (buckets.has(bucketId + 1)) {
      const prev = buckets.get(bucketId + 1)!
      const diff = Math.abs(prev - curr)
      if (diff <= valueDiff) return true
    }

    // Add curr to bucket
    buckets.set(bucketId, curr)

    // Maintain sliding window size k
    if (i >= indexDiff) {
      const old = nums[i - indexDiff]
      const oldBucketId = Math.floor(old / width)
      buckets.delete(oldBucketId)
    }
  }

  return false
}

/**
 * Tester for LeetCode 220: Contains Duplicate III
 * @param solution - The function to test: (nums: number[], indexDiff: number, valueDiff: number) => boolean
 */
function runTests(solution: (nums: number[], indexDiff: number, valueDiff: number) => boolean): void {
  const testCases = [
    { nums: [1, 2, 3, 1], k: 3, t: 0, expected: true },
    { nums: [1, 5, 9, 1, 5, 9], k: 2, t: 3, expected: false },
    { nums: [1, 2, 3, 1], k: 0, t: 0, expected: false },
    { nums: [], k: 0, t: 0, expected: false },
    { nums: [1, 2], k: 1, t: 1, expected: true },
    { nums: [8, 7, 15, 1, 6, 1, 9, 15], k: 1, t: 3, expected: true },
    { nums: [-1, 2147483647], k: 1, t: 2147483647, expected: false },
    { nums: [1, 5, 9, 1, 5, 9], k: 3, t: 3, expected: true }
  ]

  console.log(`Starting tests for: ${solution.name || 'Solution Function'}\n`)

  testCases.forEach((tc, index) => {
    const result = solution(tc.nums, tc.k, tc.t)
    const passed = result === tc.expected

    console.log(`Test Case #${index + 1}:`)
    console.log(`  Input: nums=[${tc.nums}], k=${tc.k}, t=${tc.t}`)
    console.log(`  Expected: ${tc.expected}, Got: ${result}`)
    console.log(`  Status: ${passed ? '✅ PASSED' : '❌ FAILED'}\n`)
  })
}

runTests(containsNearbyAlmostDuplicate2)
