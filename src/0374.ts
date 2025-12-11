/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			         1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */
const TARGET = 6

var guess = function (num: number): number {
  if (num > TARGET) {
    return -1
  } else if (num < TARGET) {
    return 1
  } else {
    return 0
  }
}

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function guessNumber(n: number): number {
  let left = 1
  let right = n

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    const currentGuess = guess(mid)

    if (currentGuess === -1) {
      // Too high
      right = mid - 1
    } else if (currentGuess === 1) {
      // Too low
      left = mid + 1
    } else {
      // Guessed
      return mid
    }
  }

  // `n` is out of bound
  return -1
};

const n = 10

const expected = TARGET

const output = guessNumber(n)

console.log('Input: ', n)
console.log('expected: ', expected)
console.log('output: ', output)