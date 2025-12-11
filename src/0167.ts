// 167. Two Sum II - Input Array Is Sorted

/**
 * Two Pointer
 * @param numbers 
 * @param target 
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

const numbers = [2, 7, 11, 15], target = 9
const expected = [1, 2]
// const numbers = [2, 3, 4], target = 6
// const expected = [1, 3]
// const numbers = [-1, 0], target = -1
// const expected = [1, 2]

const output = twoSum(numbers, target)

console.log('Input: ', numbers, target)
console.log('expected: ', expected)
console.log('output: ', output)