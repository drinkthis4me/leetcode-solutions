import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// 347. Top K Frequent Elements

/**
 * Min Heap
 * T: O(n log k); S: O(n + k);
 */
function topKFrequent(nums: number[], k: number): number[] {
  // Data: nums = [1,1,1,2,2,3], k = 2

  // Build a frequency map of [num, count]
  // counts = {
  //   1: 3,
  //   2: 2,
  //   3: 1,
  // }
  const counts = new Map<number, number>()

  for (const n of nums) {
    if (counts.has(n)) {
      counts.set(n, counts.get(n)! + 1)
    } else {
      counts.set(n, 1)
    }
  }

  // Create a Min Heap. Keep its size <= k.
  // heap = [
  //   [1, 3],
  //   [2, 2],
  // ]
  const heap = new MinPriorityQueue<[number, number]>(val => val[1])
  for (const [n, count] of counts.entries()) {
    heap.enqueue([n, count])

    if (heap.size() > k) {
      heap.dequeue()
    }
  }

  // Pop all elements from the heap and get the number
  // res = [1, 2]
  const res: number[] = []
  for (let i = 0; i < k; i++) {
    const [n, _count] = heap.dequeue()!
    res.push(n)
  }

  return res
};

/**
 * Bucket Sort
 * T: O(n); S:(n);
 */
function topKFrequent2(nums: number[], k: number): number[] {
  // Data: nums = [1,1,1,2,2,3], k = 2

  // Create a frequency map
  const counts = new Map<number, number>()

  for (const n of nums) {
    counts.set(n, (counts.get(n) || 0) + 1)
  }

  // Create a bucket sort array with size of `nums.length + 1`.
  // The index represents count and value is array of numbers
  // (Logic: If all nums are the same number, the max count is bound to `nums.length`)

  // [[], [3], [2], [1], [], [], []]
  // -> 1 has count fo 3, and is put into index 3 array
  // -> 2 has count fo 2, and is put into index 2 array
  // -> 3 has count fo 1, and is put into index 1 array

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);

  for (const [n, count] of counts.entries()) {
    buckets[count]!.push(n)
  }

  // Collect the top k number. Starting from back of the buckets
  const res: number[] = []
  for (
    let i = buckets.length - 1;
    i >= 0 && res.length < k;
    i--
  ) {
    for (const n of buckets[i]!) {
      res.push(n)
      // Return immediately if top k found. 
      // (Even though there still might be numbers in the same bucket.)
      if (res.length === k) {
        return res
      }
    }
  }

  return res
};

const nums = [1, 1, 1, 2, 2, 3], k = 2
const expected = [1, 2]

const ans = topKFrequent2(nums, k)

console.log('Input: ', nums, k)
console.log('expected: ', expected)
console.log('answer: ', ans)
