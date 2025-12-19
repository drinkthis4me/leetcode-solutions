// 239. Sliding Window Maximum
import { Deque } from '@datastructures-js/deque'
import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

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

/**
 * Max Heap
 * T: O(n log n); S: O(n);
 */
function maxSlidingWindow2(nums: number[], k: number): number[] {
  // Max heap stores (value, index)
  const heap = new MaxPriorityQueue<[number, number]>(x => x[0])
  const res: number[] = []

  for (let i = 0; i < nums.length; i++) {
    // Add current element and index to heap
    heap.enqueue([nums[i]!, i])

    // If the max element is outside the window, remove it
    while (
      heap.size() > 0 &&
      heap.front()![1] <= i - k
    ) {
      heap.dequeue()
    }

    // Add to result once the first window is complete
    if (i >= k - 1) {
      res.push(heap.front()![0]);
    }
  }

  return res
}

/**
 * DP - Block Partition
 * T: O(n); S: O(n);
 */
function maxSlidingWindow3(nums: number[], k: number): number[] {
  // Divide the array into fixed blocks of size `k`
  // and precompute the max from two different directions.

  // nums =     [1, 3, -1, -3, 5, 3, 6, 7]
  // Blocks: [1, 3, -1] | [-3, 5, 3] | [6, 7]
  // leftMax =  [1, 3, 3, -3, 5, 5, 6, 7]
  // rightMax = [1, 3, -1, -3, 6, 6, 6 ,7]
  // rightMax = [3, 3, -1, 5, 5, 3, 7 ,7]

  // res[i] = max(rightMax[i], leftMax(i + k - 1))
  // Example window (1, 3): 
  // res[1] = max(rightMax[1], leftMax[3])
  //        = max(3, -3) 
  //        = 3

  const n = nums.length
  const leftMax = new Array(n)
  const rightMax = new Array(n)

  // Compute max
  leftMax[0] = nums[0]
  rightMax[n - 1] = nums[n - 1]
  for (let i = 1; i < n; i++) {
    if (i % k === 0) {
      leftMax[i] = nums[i]
    } else {
      leftMax[i] = Math.max(leftMax[i - 1], nums[i]!)
    }

    const j = n - 1 - i
    if (j % k === 0) {
      rightMax[j] = nums[j]
    } else {
      rightMax[j] = Math.max(rightMax[j + 1], nums[j]!)
    }
  }

  const res: number[] = new Array(n - k + 1)

  for (let i = 0; i < n - k + 1; i++) {
    res[i] = Math.max(leftMax[i + k - 1], rightMax[i])
  }

  return res
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 3
const expected = [3, 3, 5, 5, 6, 7]

const res = maxSlidingWindow3(nums, k)

console.log('Input: ', nums, k)
console.log('expected: ', expected)
console.log('output: ', res)