// 703. Kth Largest Element in a Stream

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

// KthLargest kthLargest = new KthLargest(3, [1, 2, 3, 3]);
// kthLargest.add(3);   // return 3 ([1, 2, 3, 3, 3])
// kthLargest.add(5);   // return 3 ([1, 2, 3, 3, 3, 5])
// kthLargest.add(6);   // return 3 ([1, 2, 3, 3, 3, 5, 6])
// kthLargest.add(7);   // return 5 ([1, 2, 3, 3, 3, 5, 6, 7])
// kthLargest.add(8);   // return 6 ([1, 2, 3, 3, 3, 5, 6, 7, 8])

interface IKthLargest {
  add(val: number): number
}

/**
 * Min-heap
 * T: O( (m + n) log k); S: O(k);
 */
class KthLargest implements IKthLargest {
  k: number
  minHeap: MinPriorityQueue<number>

  constructor(k: number, nums: number[]) {
    this.k = k
    // T: O(m log k)
    this.minHeap = new MinPriorityQueue<number>(null, nums)

    while (this.minHeap.size() > k) {
      this.minHeap.pop()
    }
  }

  // T: O(n log k)
  add(val: number): number {
    this.minHeap.push(val)
    if (this.minHeap.size() > this.k) {
      this.minHeap.pop()
    }
    return this.minHeap.front()!
  }
}


// Constructor type
type KthLargestConstructor = new (k: number, nums: number[]) => IKthLargest

function runAllTests(KthLargestClass: KthLargestConstructor) {
  console.log(`--- Running Tests for ${KthLargestClass.name} ---`)

  const tests = [
    {
      name: 'LeetCode Example',
      k: 3,
      nums: [4, 5, 8, 2],
      ops: [3, 5, 10, 9, 4],
      expected: [4, 5, 5, 8, 8]
    },
    {
      name: 'k=1 (Max element)',
      k: 1,
      nums: [1],
      ops: [2, 0, 5],
      expected: [2, 2, 5]
    },
    {
      name: 'Increasing sequence',
      k: 2,
      nums: [1, 2],
      ops: [3, 4, 5],
      expected: [2, 3, 4]
    },
    {
      name: 'Duplicates',
      k: 2,
      nums: [5, 5, 5],
      ops: [5, 5],
      expected: [5, 5]
    }
  ]

  for (const test of tests) {
    const stream = new KthLargestClass(test.k, test.nums)
    let passed = true

    for (let i = 0; i < test.ops.length; i++) {
      const actual = stream.add(test.ops[i]!)
      if (actual !== test.expected[i]) {
        console.error(`❌ [FAIL] ${test.name} - Op ${i}: Expected ${test.expected[i]}, got ${actual}`)
        passed = false
        break
      }
    }
    if (passed) console.log(`✅ [PASS] ${test.name}`)
  }
  console.log('--- Tests Finished ---\n')
}

runAllTests(KthLargest)