// 15. 3Sum

/**
 * Sort & Two Pointer
 * T: O(n^2); S: O(1);
 */
function threeSum(nums: number[]): number[][] {
  // Edge Case
  if (nums.length < 3) return []

  // Sort the array
  nums.sort((a, b) => a - b)

  const n = nums.length
  const res: number[][] = []

  // Fix one number at index i. Reduce 3Sum to 2Sum.
  // sum = nums[i] + nums[left] + nums[right]

  for (let i = 0; i < n - 2; i++) {
    // Optimization
    // If the smallest number is positive, the sum can never be zero
    if (nums[i]! > 0) break

    // Skip duplicate first number
    // [-3, -3, 2, 1]
    //    i---->i
    if (i > 0 && nums[i] === nums[i - 1]) continue

    // Two pointer to find 2Sum
    let j = i + 1
    let k = n - 1

    while (j < k) {
      const sum = nums[i]! + nums[j]! + nums[k]!

      if (sum === 0) {
        // Triplet found
        res.push([nums[i]!, nums[j]!, nums[k]!])

        // Skip duplicate second number
        // [-3, 2, 2, 1]
        //   i  j->j  k
        while (j < k && nums[j] === nums[j + 1]) {
          j++
        }

        // Skip duplicate third number
        // [-3, 2, 1, 1]
        //   i  j  k<-k
        while (j < k && nums[k] === nums[k - 1]) {
          k--
        }

        // Move pointers to find the next possible triplet
        j++
        k--
      } else if (sum < 0) {
        // Find a larger sum
        j++
      } else {
        // Find a smaller sum
        k--
      }
    }
  }

  return res
};

const nums = [-1, 0, 1, 2, -1, -4]
const expected = [[-1, -1, 2], [-1, 0, 1]]
// const nums = [0, 1, 1]
// const expected = []

const ans = threeSum(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('answer: ', ans)
