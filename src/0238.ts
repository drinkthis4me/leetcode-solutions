// 238. Product of Array Except Self

/**
 * All Product
 * T: O(n); S: O(1);
 * 
 * Error: Division used; Wrong answer when zero exists;
 */
function productExceptSelf(nums: number[]): number[] {
  const productOfAll = nums.reduce((product, curr) => product * curr, 1)

  return nums.map(num => productOfAll / num)
};

/**
 * All Product w/ Zero Handling
 * T: O(n); S: O(1);
 * 
 * Error: Division used;
 */
function productExceptSelf2(nums: number[]): number[] {
  // Keep track of zero count:
  // zeroCount = 0 -> Product is non-zero.
  // zeroCount = 1 -> Zero element will have non-zero product. All other elements will have a result of 0.
  // zeroCount = 2 -> Product will always be zero.

  const n = nums.length
  let totalProduct = 1
  let zeroCount = 0

  for (const num of nums) {
    if (num === 0) {
      zeroCount++
    } else {
      totalProduct *= num
    }
  }

  const res: number[] = new Array(n)

  for (let i = 0; i < n; i++) {
    const num = nums[i]!

    if (zeroCount >= 2) {
      res[i] = 0
    } else if (zeroCount === 1) {
      if (num === 0) {
        res[i] = totalProduct
      } else {
        res[i] = 0
      }
    } else { // zeroCount === 0
      res[i] = totalProduct / num
    }
  }

  return res
};

/**
 * Brute Force
 * T: O(n^2); S: O(n);
 * 
 * Error: O(n^2) time complexity;
 */
function productExceptSelf3(nums: number[]): number[] {
  // nums[i] = (left product) * (right product)
  // Input = [1, 2, 3, 4]
  // Output = [1*24, 1*12, 2*8, 6*1]

  const n = nums.length
  const res: number[] = new Array(n)

  for (let i = 0; i < n; i++) {
    let leftProduct = 1
    let rightProduct = 1

    for (let j = i - 1; j >= 0; j--) {
      leftProduct *= nums[j]!
    }
    for (let j = i + 1; j < n; j++) {
      rightProduct *= nums[j]!
    }

    res[i] = leftProduct * rightProduct
  }

  return res
};

/**
 * PrefixProduct Multiply SuffixProduct
 * T: O(n); S: O(1);
 */
function productExceptSelf4(nums: number[]): number[] {
  const n = nums.length

  const res: number[] = new Array(n).fill(1)

  // Calculate prefix products
  // [1, nums[0], nums[0] * nums[1], ...]
  let prefixProduct = 1
  for (let i = 0; i < n; i++) {
    res[i] = prefixProduct
    // Update `prefixProduct` for the next iteration (i + 1)
    prefixProduct *= nums[i]!
  }

  // Calculate suffix products
  // [..., nums[n - 1] * nums[n - 2], nums[n - 1], 1]
  let suffixProduct = 1
  for (let i = n - 1; i >= 0; i--) {
    res[i]! *= suffixProduct
    // Update `suffixProduct` for the next iteration (i - 1)
    suffixProduct *= nums[i]!
  }

  return res
};

// const nums = [1, 2, 3, 4]
// const expected = [24, 12, 8, 6]
const nums = [-1, 1, 0, -3, 3]
const expected = [0, 0, 9, 0, 0]

const output = productExceptSelf2(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('output: ', output)