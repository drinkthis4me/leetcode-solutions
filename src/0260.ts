// 260. Single Number III

/**
 * Look-up Map
 * 
 * T: O(n); S(n);
 * 
 * Failed: Violate S(1).
 */
function singleNumber(nums: number[]): number[] {
  const set = new Set<number>()

  for (const n of nums) {
    if (set.has(n)) {
      set.delete(n)
    } else {
      set.add(n)
    }
  }

  return [...set]
};

/**
 * Bitwise XOR
 * 
 * T: O(n); S(1);
 */
function singleNumber2(nums: number[]): number[] {
  // nums = [1, 2, 1, 3, 2, 5]
  // 1 = 00001 
  // 2 = 00010 
  // 3 = 00011 
  // 5 = 00101 

  // 1. Get the XOR of all the numbers
  // diff = 00110
  let diff = 0
  for (const n of nums) {
    diff ^= n
  }

  // 2. Get the Least Significant Bit
  // diffBit = 00010
  // let diffBit = 1
  // while ((diff & diffBit) === 0) {
  //   diffBit <<= 1
  // }

  // 2. (Better) Get the Most Significant Bit
  // 00110 diff
  // 11010 -diff (flip all bit then add 1)
  // -----
  // 00010 diffBit
  const diffBit = diff & -diff

  // 3. Separate all numbers into two groups by the first diff bit
  // firstGroup = [2, 2, 5], secondGroup = [1, 1, 3]
  const res = [0, 0]
  for (const n of nums) {
    if (diffBit & n) {
      res[0]! ^= n
    } else {
      res[1]! ^= n
    }
  }

  return res
};

const nums = [1, 2, 1, 3, 2, 5]
const expected = [3, 5]

const ans = singleNumber2(nums)

console.log('Input: ', nums)
console.log('expected: ', expected)
console.log('answer: ', ans)
