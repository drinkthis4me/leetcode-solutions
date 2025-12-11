// 367. Valid Perfect Square

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function isPerfectSquare(num: number): boolean {
  // Edge Case
  if (num < 1) return false
  if (num === 1) return true

  let left = 1
  let right = num

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const square = mid * mid

    if (square > num) {
      right = mid - 1
    } else if (square < num) {
      left = mid + 1
    } else {
      // Square root fund
      return true
    }
  }

  // `left > right`
  // Square root is fraction
  return false
};

function isPerfectSquare2(num: number): boolean {
  // Newton's Method

  // Initial guess of root
  let r = num

  while ((r * r) > num) {
    // Apply Newton's Method formula: r = 0.5 * (r + num / r)
    r = Math.floor(0.5 * (r + num / r))
  }

  return (r * r) === num
};

const num = 14

const expected = true

const output = isPerfectSquare2(num)

console.log('Input: ', num)
console.log('expected: ', expected)
console.log('output: ', output)