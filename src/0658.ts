// 658. Find K Closest Elements

/**
 * Binary Search
 * T: O(log n)); S: O(1);
 */
function findClosestElements(arr: number[], k: number, x: number): number[] {
  let left = 0
  let right = arr.length - 1

  // Find the optimal starting position for window
  while (left < right) {
    // Left bound of the window
    const mid = left + Math.floor((right - left) / 2)

    // Compare the distances of the two ends of the window from x
    // If left element is farther, move window right
    if (x - arr[mid]! > arr[mid + k]! - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // Return the k elements starting form the final left
  return arr.slice(left, left + k)
};

const arr = [1, 2, 3, 4, 5], k = 4, x = 3

// Element differences to x = 3 are:
// 3: diff = 0
// 2 and 4: diff = 1 (2 has higher priority than 4)
// 1 and 5: diff = 2 (1 has higher priority than 5)

// Take the first k elements: [3, 2, 4, 1]
// Return sorted: [1, 2, 3, 4]

const expected = [1, 2, 3, 4]

const output = findClosestElements(arr, k, x)

console.log('Input: ', arr, k, x)
console.log('expected: ', expected)
console.log('output: ', output)