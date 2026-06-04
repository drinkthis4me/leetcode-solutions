// 217. Contain Duplicate

/**
 * Hash Set and Length
 * T: O(n); S: O(n);
 */
function containsDuplicate(nums: number[]): boolean {
  return new Set(nums).size < nums.length
};

const input = [1, 2, 3, 3]
const expected = true

const output = containsDuplicate(input)

console.log('Input: ', input)
console.log('expected: ', expected)
console.log('output: ', output)
