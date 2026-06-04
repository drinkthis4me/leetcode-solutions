// 18. 4Sum

/**
 * Two Pointers
 * 
 * T: O(n); S: O(1);
 */
function twoSum(nums: number[], target: number, startIndex: number): number[][] {
  let res: number[][] = []

  const n = nums.length
  let l = startIndex
  let r = n - 1

  while (l < r) {
    const sum = nums[l]! + nums[r]!

    if (sum < target || (l > startIndex && nums[l] === nums[l - 1])) {
      // Find a larger left number
      // Or skip the duplicate left number
      l++
    } else if (sum > target || (r < n - 1 && nums[r] === nums[r + 1])) {
      // Find a smaller right number
      // Or skip the duplicate right number
      r--
    } else {
      // sum === target
      res.push([nums[l]!, nums[r]!])

      // Move pointers and continue find the next pair
      l++
      r--
    }
  }

  return res
}

/**
 * Hash Set
 * 
 * T: O(n); S: O(n);
 */
function twoSum2(nums: number[], start: number, target: number): number[][] {
  let res: number[][] = [];
  let s = new Set<number>();

  for (let i = start; i < nums.length; i++) {
    const curr = nums[i]!

    if (
      res.length === 0 ||
      res[res.length - 1]![1] !== curr // Skip duplicate
    ) {
      if (s.has(target - curr)) {
        res.push([target - curr, curr]);
      }
    }

    s.add(curr);
  }

  return res;
}

/**
 * All purpose k sum.
 * 
 * T: O(n ^ (k - 1)); S: O(n);
 * 
 * We need O(k) space for the recursion. k -> n in the worst case.
 */
function kSum(nums: number[], target: number, startIndex: number, k: number): number[][] {
  // Reduce k sume to (k - 1) sum.
  // (k - 1) sum to (k - 2) sum.
  // ...
  // 3Sum to 2Sum.

  const n = nums.length
  let res: number[][] = []

  // Edge case: Ran out of numbers
  if (startIndex === nums.length) return res

  // Boundary check:
  // Smallest number must be less than avg.
  // Largest number must be greater than avg.
  const avgVal = target / k
  if (
    nums[startIndex]! > avgVal ||
    avgVal > nums[n - 1]!
  ) {
    return res
  }

  if (k === 2) {
    return twoSum2(nums, target, startIndex)
  }

  // Recursively call kSum
  for (let i = startIndex; i < n; i++) {
    // Skip duplicate first number
    if (i === startIndex || nums[i] !== nums[i - 1]) {
      // Divide and conquer
      const kSumResult = kSum(nums, target - nums[i]!, i + 1, k - 1)
      // Rebuild result
      for (let subResult of kSumResult) {
        res.push([nums[i]!, ...subResult])
      }
    }
  }

  return res
}

/**
 * T: O(n ^ 3); S: O(n);
 */
function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b)

  return kSum(nums, target, 0, 4)
};

const nums = [1, 0, -1, 0, -2, 2], target = 0
const expected = [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]
// const nums = [2, 2, 2, 2, 2], target = 8
// const expected = [[2, 2, 2, 2]]

const ans = fourSum(nums, target)

console.log('Input: ', nums, target)
console.log('expected: ', expected)
console.log('answer: ', ans)
