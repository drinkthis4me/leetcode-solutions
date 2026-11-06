// 225. Implement Stack using Queues

import { Queue } from '@datastructures-js/queue'

// Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).
//
// Implement the MyStack class:
//
//     void push(int x) Pushes element x to the top of the stack.
//     int pop() Removes the element on the top of the stack and returns it.
//     int top() Returns the element on the top of the stack.
//     boolean empty() Returns true if the stack is empty, false otherwise.
//
// Example 1:
// Input
// ["MyStack", "push", "push", "top", "pop", "empty"]
// [[], [1], [2], [], [], []]
// Output
// [null, null, null, 2, 2, false]
//
// Explanation
// MyStack myStack = new MyStack();
// myStack.push(1);
// myStack.push(2);
// myStack.top(); // return 2
// myStack.pop(); // return 2
// myStack.empty(); // return False

/**
 * Two Queues
 */
class MyStack {
  // Main queue acts as stack
  q1 = new Queue<number>()
  // Helper queue for storing q1's elements in reverse order
  q2 = new Queue<number>()

  constructor() {
  }

  push(x: number): void {
    // Store current stack in q2
    while (this.q1.size() > 0) {
      this.q2.push(this.q1.pop()!)
    }

    // Push new element to q1
    this.q1.push(x)

    // Push the rest from q2
    while (this.q2.size() > 0) {
      this.q1.push(this.q2.pop()!)
    }
  }

  pop(): number {
    return this.q1.pop()!
  }

  top(): number {
    return this.q1.front()!
  }

  empty(): boolean {
    return this.q1.isEmpty()
  }
}

/**
 * One Queues
 */
class MyStack2 {
  // Main queue acts as stack
  q = new Queue<number>()

  constructor() {
  }

  push(x: number): void {
    const oldSize = this.q.size()

    // Add the new element
    this.q.push(x)

    // Rotate old elements to the back
    for (let i = 0; i < oldSize; i++) {
      const el = this.q.pop()!
      this.q.push(el)
    }
  }

  pop(): number {
    return this.q.pop()!
  }

  top(): number {
    return this.q.front()!
  }

  empty(): boolean {
    return this.q.isEmpty()
  }
}

interface TestCase {
  operations: string[]
  arguments: any[][]
  expected: any[]
}

function runTests(MyStackClass: new () => any): void {
  const testCases: TestCase[] = [
    {
      operations: ['MyStack', 'push', 'push', 'top', 'pop', 'empty'],
      arguments: [[], [1], [2], [], [], []],
      expected: [null, null, null, 2, 2, false]
    },
    {
      operations: ['MyStack', 'push', 'top', 'pop', 'empty'],
      arguments: [[], [10], [], [], []],
      expected: [null, null, 10, 10, true]
    },
    {
      operations: ['MyStack', 'push', 'push', 'push', 'pop', 'top', 'empty'],
      arguments: [[], [1], [2], [3], [], [], []],
      expected: [null, null, null, null, 3, 2, false]
    }
  ]

  let passedCount = 0

  testCases.forEach((tc, index) => {
    let stack: any = null
    const results: any[] = []

    for (let i = 0; i < tc.operations.length; i++) {
      const op = tc.operations[i]
      const args = tc.arguments[i]

      switch (op) {
        case 'MyStack':
          stack = new MyStackClass()
          results.push(null)
          break
        case 'push':
          stack.push(args[0])
          results.push(null)
          break
        case 'pop':
          results.push(stack.pop())
          break
        case 'top':
          results.push(stack.top())
          break
        case 'empty':
          results.push(stack.empty())
          break
        default:
          throw new Error(`Unsupported operation: ${op}`)
      }
    }

    const isPassed = JSON.stringify(results) === JSON.stringify(tc.expected)
    if (isPassed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.log(`❌ Test Case ${index + 1}: FAILED`)
      console.log('   Expected:', tc.expected)
      console.log('   Received:', results)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(MyStack2)
