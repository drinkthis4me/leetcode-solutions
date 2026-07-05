// 1046. Last Stone Weight

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

/**
 * Max Heap
 * T: O(n log n); S: O(n);
 */
function lastStoneWeight(stones: number[]): number {
  const maxHeap = new MaxPriorityQueue<number>(null, stones)

  while (maxHeap.size() > 1) {
    const top1 = maxHeap.pop()!;
    const top2 = maxHeap.pop()!;

    const diff = top1 - top2
    if (diff !== 0) {
      maxHeap.push(diff)
    }
  }

  return maxHeap.isEmpty() ? 0 : maxHeap.front()!
};

/**
 * Bucket Sort
 * T: O(n + maxStoneValue); S: O(n);
 */
function lastStoneWeight2(stones: number[]): number {
  // [2,3,6,2,4]

  // max = 6
  const maxStone = Math.max(...stones)

  // Bucket sort all the stones
  // [0, 0, 2, 1, 1, 0, 1]
  const bucket: number[] = new Array(maxStone + 1).fill(0)
  for (const stone of stones) {
    bucket[stone]!++
  }

  // Process stones two by two
  let first = maxStone
  let second = maxStone
  while (first > 0) {
    // top1 === top2: cancel out
    if (bucket[first]! % 2 === 0) {
      first--
      continue
    }

    // Find the next top bucket (top2's bucket)
    let i = Math.min(first - 1, second)
    while (i > 0 && bucket[i] === 0) {
      i--
    }
    second = i

    // Boundary check: no more buckets
    if (i === 0) {
      return first
    }

    // Take top1 and top2, smash.
    // Then put the leftover to the diff bucket.
    bucket[first]!--
    bucket[second]!--
    bucket[first - second]!++

    first = Math.max(first - second, second)
  }

  return first
};

// --- Tester ---
function runTests(fn: (stones: number[]) => number) {
  const testCases = [
    { stones: [2, 7, 4, 1, 8, 1], expected: 1 },
    { stones: [1], expected: 1 },
    { stones: [2, 2], expected: 0 },
    { stones: [1, 3], expected: 2 },
    { stones: [7, 6, 7, 6, 9], expected: 3 },
    { stones: [3, 7, 2], expected: 2 },
  ];

  console.log("--- Running Tests ---");

  testCases.forEach((test, index) => {
    const result = fn([...test.stones]);

    if (result === test.expected) {
      console.log(`Test ${index + 1}: Passed`);
    } else {
      console.log(`Test ${index + 1}: Failed`);
      console.log(`   Input:    [${test.stones}]`);
      console.log(`   Expected: ${test.expected}`);
      console.log(`   Received: ${result}`);
    }
  });
}

runTests(lastStoneWeight2);