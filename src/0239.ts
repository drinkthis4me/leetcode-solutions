// 239. Sliding Window Maximum
import { Deque } from '@datastructures-js/deque'

/**
 * Monotonic Decreasing Deque
 * T: O(n); S: O(n);
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  // Monotonic Decreasing Deque

  // Pop from back: While the deque’s last element is less than current, remove it
  // Push current index to the deque
  // Pop from front: If it’s out of the window, remove it
  // Add front of deque to result once i ≥ k − 1

  const n = nums.length
  const res: number[] = []
  const deque = new Deque<number>() // indices

  for (let i = 0; i < n; i++) {
    // Remove indices outside of the window
    if (
      deque.size() > 0 &&
      deque.front()! <= (i - k)
    ) {
      deque.popFront()
    }

    // Maintain decreasing order in deque.
    // Top of the deque will always be max.
    while (
      deque.size() > 0 &&
      nums[deque.back()!]! <= nums[i]!
    ) {
      deque.popBack()
    }
    deque.pushBack(i)

    // Add max for the current window.
    // Make sure the window size is at least k.
    if (i >= k - 1) {
      res.push(nums[deque.front()!]!)
    }
  }

  return res
};

const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 3
const expected = [3, 3, 5, 5, 6, 7]

const res = maxSlidingWindow(nums, k)

console.log('Input: ', nums, k)
console.log('expected: ', expected)
console.log('output: ', res)