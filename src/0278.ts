// 278. First Bad Version

/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

/**
 * Binary Search
 * T: O(log n); S: O(1);
 */
var solution = function (isBadVersion: any) {

  return function (n: number): number {
    // Binary Search

    let left = 1
    let right = n

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2)

      const isMidBad = isBadVersion(mid)
      if (isMidBad) {
        // Discard right (but keep mid)
        right = mid
      } else {
        // Discard left and mid
        left = mid + 1
      }
    }

    // left === right
    // Edge Case: `n == 0` or no bad version exists
    return left <= n ? left : -1
  };
};

const n = 5, bad = 4

const expected = 4

function isBadVersion(version: number): boolean {
  return version === expected
}

const output = solution(isBadVersion)(5)

console.log('Input: ', n, bad)
console.log('expected: ', expected)
console.log('output: ', output)