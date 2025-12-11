// 50. Pow(x, n)

/**
 * Divide and Conquer
 * T: O(log n); S: O(log n);
 */
function myPow(x: number, n: number): number {
  // 2^5 = 2 * (2^2 * 2^2)
  //     = 2 * ((2^1 * 2^1) * (2^1 * 2^1))

  // Convert `n` to BigInt for safe calculation
  let N: bigint = BigInt(n)
  // Check negative `n`
  const isNegative = N < 0n;
  // Use `|n|` to calculate pow
  N = isNegative ? -N : N

  // Helper fn
  // Recursively calculate `x ^ (n/2)`
  const calculatePow = (x: number, N: bigint): number => {
    // Edge Case
    if (x === 0) {
      // 0 ^ n = 0
      return 0
    }
    if (N === 0n) {
      // x ^ 0 = 1
      return 1
    }

    let res = calculatePow(x, N / 2n)
    res = res * res

    // Handle odd n
    if (N % 2n === 1n) {
      // 2^5 = 2 * (2^2 * 2^2)
      // Need to multiply additional `x`
      res *= x
    }

    return res
  }

  // Calculate `x ^ |n|` then adjust answer accordingly:
  // n >= 0: ans = x ^ n
  // n < 0: ans = 1 / (x ^ n)
  let ans = calculatePow(x, N)

  return isNegative ? (1 / ans) : ans
};

/**
 * Iterative with Bit Manipulation
 * T: O(log n); S: O(1);
 */
function myPow2(x: number, n: number): number {
  // When calculating a^b:
  // If b is even: a^b = (a^2) ^ (b/2)
  // If b is odd : a^b = a * ((a^((b-1)/2))^2)

  // x ^ (2k) = (x^2) ^ k
  // x ^ (2k+1) = x * (x^2) ^ k

  // 2^12 = (2) ^ (2 * 6)
  //      = (4) ^ 6 
  //      = (4) ^ (2 * 3)
  //      = (16) ^ 3 
  //      = 16 * (16) ^ 2 
  //      = 16 * (256) ^ 1

  // Convert `n` to BigInt for safe calculation
  let N: bigint = BigInt(n)
  // Check negative `n`
  const isNegative = N < 0n
  // Use `|n|` to calculate pow
  N = isNegative ? -N : N

  let res = 1.0
  let currentX = x

  while (N > 0n) {
    if (N & 1n) { // N % 2n === 1n
      res *= currentX
    }

    currentX *= currentX

    // N /= 2n
    N >>= 1n
  }

  // Adjust result based on positive or negative z`n`
  return isNegative ? (1 / res) : res
};

const x = 2.00000, n = 10

const expected = 1024.0

const output = myPow2(x, n)

console.log('Input: ', n)
console.log('expected: ', expected)
console.log('output: ', output)