// 744. Find Smallest Letter Greater Than Target

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
function nextGreatestLetter(letters: string[], target: string): string {
  let left = 0
  let right = letters.length - 1
  // Index for potential result
  let idx = -1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (letters[mid]! > target) {
      // Store possible result's index
      idx = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  // `left === right`
  // If `idx` is still -1, `target` is not in `letters`.
  return idx === -1 ? letters[0]! : letters[idx]!
};

const letters = ["c", "f", "j"], target = "a"
const expected = 'c'
// const letters = ["c", "f", "j"], target = "c"
// const expected = 'f'
// const letters = ["x", "x", "y", "y"], target = "z"
// const expected = 'x'

const output = nextGreatestLetter(letters, target)

console.log('Input: ', letters, target)
console.log('expected: ', expected)
console.log('output: ', output)