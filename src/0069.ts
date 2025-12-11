// 69. Sqrt(x)

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function mySqrt(x: number): number {
  // Search square root from 1 to x

  let left = 1
  let right = x

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const square = mid * mid

    if (square > x) {
      right = mid - 1
    } else if (square < x) {
      left = mid + 1
    } else {
      // Square root found
      return mid
    }
  }

  // Square root is fraction
  // Return nearest integer rounded down
  // Notice here `left > right` 
  return right
};

/**
 * Newton's Method
 * T: O(log n); S: O(1);
 */
function mySqrt2(x: number): number {
  // Newton's method

  // r (i + 1) = 1/2 * (ri + N / ri)
  // Where
  // N is the target.
  // ri is the current guess.
  // r (i + 1) is the next guess.

  // Start the initial guess with x itself
  let r = x

  while ((r * r) > x) {
    r = Math.floor(0.5 * (r + x / r))
  }

  return r
}


const x = 4

const expected = 2

const output = mySqrt2(x)

console.log('Input: ', x)
console.log('expected: ', expected)
console.log('output: ', output)