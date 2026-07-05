// 295. Find Median from Data Stream

import { PriorityQueue } from "@datastructures-js/priority-queue"

interface IMedianFinder {
  addNum(num: number): void;
  findMedian(): number;
}

/**
 * Array Sort
 */
class MedianFinder implements IMedianFinder {
  private small: number[] = []; // Max-heap (simplified for example)
  private large: number[] = []; // Min-heap

  /**
   * T: O(m); S: O(n)
   */
  addNum(num: number): void {
    this.small.push(num);
    this.small.sort((a, b) => b - a);
    this.large.push(this.small.shift()!);
    this.large.sort((a, b) => a - b);
    if (this.large.length > this.small.length) {
      this.small.push(this.large.shift()!);
      this.small.sort((a, b) => b - a);
    }
  }

  /**
   * T: O(m * n log n); S: O(n)
   */
  findMedian(): number {
    return this.small.length > this.large.length
      ? this.small[0]
      : (this.small[0] + this.large[0]) / 2;
  }
}

/**
 * Heap
 */
class MedianFinder2 implements IMedianFinder {
  // [..., leftTop, rightTop, ...]
  // If len is even, median = (leftTop + rightTop) / 2
  // Else, median = leftTop

  // To access leftTop/rightTop in O(1):
  //   - Store left part in maxHeap
  //   - Store right part in minHeap

  // Maintain size difference to have the correct split:
  // left.size + (1 or 0) = right.size

  left = new PriorityQueue<number>((a, b) => b - a)
  right = new PriorityQueue<number>((a, b) => a - b)

  constructor() {
  }

  /**
   * T: O(log n); O(n);
   */
  addNum(num: number): void {
    // Push new number 
    this.left.push(num)


    // Balance heap sizes
    this.right.push(this.left.pop()!)

    if (this.left.size() < this.right.size()) {
      this.left.push(this.right.pop()!)
    }
  }

  /**
   * T: O(1); O(n);
   */
  findMedian(): number {
    if (this.left.isEmpty() && this.right.isEmpty()) return Infinity

    if (this.left.size() > this.right.size()) {
      return this.left.front()!
    } else {
      const lTop = this.left.front() || 0
      const rTop = this.right.front() || 0

      return lTop + (rTop - lTop) / 2
    }
  }
}

/**
 * Test Harness
 * @param Implementation The class to test
 */
function runTests(Implementation: new () => IMedianFinder) {
  console.log(`--- Running Tests for ${Implementation.name} ---`);

  const testCases = [
    {
      name: "Standard sequence",
      actions: ["addNum", "addNum", "findMedian", "addNum", "findMedian"],
      params: [[1], [2], [], [3], []],
      expected: [null, null, 1.5, null, 2.0]
    },
    {
      name: "Single element",
      actions: ["addNum", "findMedian"],
      params: [[10], []],
      expected: [null, 10.0]
    },
    {
      name: "Even/Odd transitions",
      actions: ["addNum", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
      params: [[5], [10], [15], [], [20], []],
      expected: [null, null, null, 10.0, null, 12.5]
    }
  ];

  testCases.forEach((tc, index) => {
    const solver = new Implementation();
    let passed = true;

    for (let i = 0; i < tc.actions.length; i++) {
      const action = tc.actions[i] as keyof IMedianFinder;
      const param = tc.params[i][0];
      // Execute based on method name to satisfy TS type checking
      let result: number | null;
      if (action === "addNum") {
        solver.addNum(param)
        result = null
      } else {
        result = solver.findMedian();
      }

      if (result !== tc.expected[i]) {
        console.error(`  Test ${index + 1} ("${tc.name}") FAILED at step ${i}: Expected ${tc.expected[i]}, got ${result}`);
        passed = false;
        break;
      }
    }

    if (passed) {
      console.log(`  Test ${index + 1} ("${tc.name}"): PASSED`);
    }
  });
  console.log("");
}


// Execution
runTests(MedianFinder2);
