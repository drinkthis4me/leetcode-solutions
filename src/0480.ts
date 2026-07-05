// 480. Sliding Window Median

import { PriorityQueue } from '@datastructures-js/priority-queue'

/**
 * Heap & Hash Map
 * T: O(n log k); S: O(k);
 */
function medianSlidingWindow(nums: number[], k: number): number[] {
  // maxHeap.top = largest of lower half
  const maxHeap = new PriorityQueue<number>((a, b) => b - a)
  // minHeap.top = smallest of upper half
  const minHeap = new PriorityQueue<number>((a, b) => a - b)

  // Lazy-deletion counts
  const delayed = new Map<number, number>()

  // Active heap size (without marked deleted numbers)
  let maxHeapSize = 0
  let minHeapSize = 0

  const result: number[] = []

  const pruneMax = () => {
    while (!maxHeap.isEmpty()) {
      const top = maxHeap.front()!
      const cnt = delayed.get(top)
      if (cnt) {
        maxHeap.dequeue()
        if (cnt === 1) {
          delayed.delete(top)
        } else {
          delayed.set(top, cnt - 1)
        }
      } else break
    }
  }

  const pruneMin = () => {
    while (!minHeap.isEmpty()) {
      const top = minHeap.front()!
      const cnt = delayed.get(top)
      if (cnt) {
        minHeap.dequeue()
        if (cnt === 1) {
          delayed.delete(top)
        } else {
          delayed.set(top, cnt - 1)
        }
      } else break
    }
  }

  const insert = (num: number) => {
    if (maxHeapSize === 0 || num <= maxHeap.front()!) {
      maxHeap.enqueue(num)
      maxHeapSize++
    } else {
      minHeap.enqueue(num)
      minHeapSize++
    }
  }

  const erase = (num: number) => {
    pruneMax()
    pruneMin()

    delayed.set(num, (delayed.get(num) || 0) + 1)

    if (maxHeapSize > 0 && num <= maxHeap.front()!) {
      maxHeapSize--
    } else {
      minHeapSize--
    }

    pruneMax()
    pruneMin()
  }

  const rebalance = () => {
    pruneMax()
    pruneMin()
    if (maxHeapSize > minHeapSize + 1) {
      const val = maxHeap.dequeue() as number
      maxHeapSize--
      minHeap.enqueue(val)
      minHeapSize++
      pruneMax()
    } else if (maxHeapSize < minHeapSize) {
      const val = minHeap.dequeue() as number
      minHeapSize--
      maxHeap.enqueue(val)
      maxHeapSize++
      pruneMin()
    }
  }

  const getMedian = (): number => {
    pruneMax()
    pruneMin()
    return k % 2 === 1
      ? maxHeap.front()!
      : (maxHeap.front()! + minHeap.front()!) / 2
  }

  for (let i = 0; i < nums.length; i++) {
    insert(nums[i])
    rebalance()

    if (i >= k - 1) {
      result.push(getMedian())
      erase(nums[i - k + 1])
      rebalance()
    }
  }

  return result
}

type SolutionFn = (nums: number[], k: number) => number[]

function runTests(solution: SolutionFn) {
  console.log(`--- Running tests for: ${solution.name} ---`)

  const testCases = [
    {
      nums: [1, 3, -1, -3, 5, 3, 6, 7],
      k: 3,
      expected: [1, -1, -1, 3, 5, 6]
    },
    {
      nums: [1, 2, 3, 4, 5],
      k: 2,
      expected: [1.5, 2.5, 3.5, 4.5]
    },
    {
      nums: [1, 2, 3, 4, 5],
      k: 3,
      expected: [2, 3, 4]
    },
    {
      nums: [1],
      k: 1,
      expected: [1]
    },
    {
      nums: [1, 1, 1, 1],
      k: 2,
      expected: [1, 1, 1]
    },
    {
      nums: [9, 7, 0, 3, 9, 8, 6, 5, 7, 6],
      k: 2,
      expected: [8.00000, 3.50000, 1.50000, 6.00000, 8.50000, 7.00000, 5.50000, 6.00000, 6.50000]
    }
  ]

  testCases.forEach((tc, index) => {
    const result = solution([...tc.nums], tc.k)
    const passed = JSON.stringify(result) === JSON.stringify(tc.expected)

    if (passed) {
      console.log(`Test Case ${index + 1}: PASSED`)
    } else {
      console.error(`Test Case ${index + 1}: FAILED`)
      console.error(`   Input:    nums=[${tc.nums}], k=${tc.k}`)
      console.error(`   Expected: [${tc.expected}]`)
      console.error(`   Received: [${result}]`)
    }
  })
  console.log('\n')
}

runTests(medianSlidingWindow)