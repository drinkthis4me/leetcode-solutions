// 167. Two Sum II - Input Array Is Sorted

/**
 * Two Pointer
 * T: O(n); S: O(1);
 */
function twoSum(numbers: number[], target: number): number[] {
  let left = 0
  let right = numbers.length - 1

  while (left < right) {
    const sum = numbers[left]! + numbers[right]!

    if (sum === target) {
      return [left + 1, right + 1]
    } else if (sum < target) {
      left++
    } else {
      right--
    }
  }

  return []
};

/**
 * Binary Search
 * T: O(n log n); S: O(1);
 */
function twoSum2(numbers: number[], target: number): number[] {
  for (let i = 0; i < numbers.length; i++) {
    const temp = target - numbers[i]!

    // Perform Binary Search on numbers[(i + 1)...n]
    let l = i + 1
    let r = numbers.length - 1
    while (l <= r) {
      const mid = Math.floor(l + (r - l) / 2)

      if (numbers[mid] === temp) {
        return [i + 1, mid + 1]
      } else if (numbers[mid]! < temp) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
  }

  return []
};

const numbers = [2, 7, 11, 15], target = 9
const expected = [1, 2]
// const numbers = [2, 3, 4], target = 6
// const expected = [1, 3]
// const numbers = [-1, 0], target = -1
// const expected = [1, 2]

const output = twoSum2(numbers, target)

console.log('Input: ', numbers, target)
console.log('expected: ', expected)
console.log('output: ', output)