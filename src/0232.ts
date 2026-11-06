// 232. Implement Queue using Stacks

// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
//
// Implement the MyQueue class:
//
//     void push(int x) Pushes element x to the back of the queue.
//     int pop() Removes the element from the front of the queue and returns it.
//     int peek() Returns the element at the front of the queue.
//     boolean empty() Returns true if the queue is empty, false otherwise.
//
// Example 1:
// Input
// ["MyQueue", "push", "push", "peek", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 1, 1, false]
//
// Explanation
// MyQueue myQueue = new MyQueue();
// myQueue.push(1); // queue is: [1]
// myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
// myQueue.peek(); // return 1
// myQueue.pop(); // return 1, queue is [2]
// myQueue.empty(); // return false

/**
 * Two Stacks (Brute force)
 */
class MyQueue {
  // Main stack for pushing
  s1 = new Array<number>()
  // Helper stack for popping
  s2 = new Array<number>()

  constructor() {

  }

  push(x: number): void {
    this.s1.push(x)
  }

  pop(): number {
    // Move all elements in s1 to s2
    while (this.s1.length > 0) {
      this.s2.push(this.s1.pop()!)
    }

    // Pop the front of queue
    const top = this.s2.pop()!

    // Move all elements back to s1
    while (this.s2.length > 0) {
      this.s1.push(this.s2.pop()!)
    }

    return top
  }

  peek(): number {
    return this.s1.at(0)!
  }

  empty(): boolean {
    return this.s1.length === 0
  }
}

/**
 * Two Stacks (Improved)
 */
class MyQueue2 {
  // Main stack for pushing
  s1 = new Array<number>()
  // Helper stack for popping. This will store elements in Queue order.
  s2 = new Array<number>()

  constructor() {

  }

  push(x: number): void {
    this.s1.push(x)
  }

  pop(): number {
    if (this.s2.length === 0) {
      // Move all elements in s1 to s2
      while (this.s1.length > 0) {
        this.s2.push(this.s1.pop()!)
      }
    }

    // Pop the front of queue
    return this.s2.pop()!
  }

  peek(): number {
    if (this.s2.length > 0) {
      return this.s2.at(-1)!
    } else {
      return this.s1.at(0)!
    }
  }

  empty(): boolean {
    return this.s1.length === 0 && this.s2.length === 0
  }
}

type MyQueueConstructor = new () => {
  push(x: number): void
  pop(): number
  peek(): number
  empty(): boolean
}

interface TestCase {
  operations: string[]
  arguments: number[][]
  expected: (number | boolean | null)[]
}

function runTests(MyQueueClass: MyQueueConstructor): void {
  const testCases: TestCase[] = [
    {
      operations: ['MyQueue', 'push', 'push', 'peek', 'pop', 'empty'],
      arguments: [[], [1], [2], [], [], []],
      expected: [null, null, null, 1, 1, false]
    },
    {
      operations: ['MyQueue', 'push', 'peek', 'pop', 'empty'],
      arguments: [[], [5], [], [], []],
      expected: [null, null, 5, 5, true]
    },
    {
      operations: ['MyQueue', 'push', 'push', 'push', 'pop', 'peek', 'empty'],
      arguments: [[], [10], [20], [30], [], [], []],
      expected: [null, null, null, null, 10, 20, false]
    }
  ]

  let allPassed = true

  testCases.forEach((tc, index) => {
    let queue: any = null
    const results: (number | boolean | null)[] = []

    for (let i = 0; i < tc.operations.length; i++) {
      const op = tc.operations[i]
      const args = tc.arguments[i]

      if (op === 'MyQueue') {
        queue = new MyQueueClass()
        results.push(null)
      } else if (op === 'push') {
        queue.push(args[0])
        results.push(null)
      } else if (op === 'pop') {
        results.push(queue.pop())
      } else if (op === 'peek') {
        results.push(queue.peek())
      } else if (op === 'empty') {
        results.push(queue.empty())
      }
    }

    const passed = JSON.stringify(results) === JSON.stringify(tc.expected)
    if (!passed) allPassed = false

    console.log(`Test Case ${index + 1}: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    if (!passed) {
      console.log(`  Expected: ${JSON.stringify(tc.expected)}`)
      console.log(`  Received: ${JSON.stringify(results)}`)
    }
  })

  console.log(`\nOverall Result: ${allPassed ? '🎉 ALL TESTS PASSED' : '⚠️ SOME TESTS FAILED'}`)
}

runTests(MyQueue2)
