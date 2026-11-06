// 895. Maximum Frequency Stack

import { PriorityQueue } from '@datastructures-js/priority-queue'

// Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.
//
// Implement the FreqStack class:
//
//     FreqStack() constructs an empty frequency stack.
//     void push(int val) pushes an integer val onto the top of the stack.
//     int pop() removes and returns the most frequent element in the stack.
//         If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.
//
// Example 1://
// Input
// ["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
// [[], [5], [7], [5], [7], [4], [5], [], [], [], []]
// Output
// [null, null, null, null, null, null, null, 5, 7, 5, 4]
//
// Explanation
// FreqStack freqStack = new FreqStack();
// freqStack.push(5); // The stack is [5]
// freqStack.push(7); // The stack is [5,7]
// freqStack.push(5); // The stack is [5,7,5]
// freqStack.push(7); // The stack is [5,7,5,7]
// freqStack.push(4); // The stack is [5,7,5,7,4]
// freqStack.push(5); // The stack is [5,7,5,7,4,5]
// freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
// freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
// freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
// freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].

/**
 * Max Heap
 */
class FreqStack {
  // Serial number for stack elements
  index: number
  // Frequency map of (element, count)
  map: Map<number, number>
  // Max heap of [el, frequency, serial_number_when_inserted]
  maxHeap: PriorityQueue<[number, number, number]>

  constructor() {
    this.index = 0
    this.map = new Map()
    this.maxHeap = new PriorityQueue((a, b) => {
      if (a[1] !== b[1]) {
        // Most frequent at the top
        return b[1] - a[1]
      } else {
        // If counts are the same, sort newer element at the top
        return b[2] - a[2]
      }
    })
  }

  /**
   * T: O(log n); S: O(n)
   */
  push(val: number): void {
    const count = (this.map.get(val) || 0) + 1

    this.map.set(val, count)

    this.maxHeap.push([val, count, this.index++])
  }

  /**
   * T: O(log n); S: O(n)
   */
  pop(): number {
    const [el] = this.maxHeap.pop()!

    this.map.set(el, this.map.get(el)! - 1)

    return el
  }
}

/**
 * Hash Map
 */
class FreqStack2 {
  // Frequency map of (el, count)
  freqMap: Map<number, number>
  // Group map of (count, list_of_elements)
  groupMap: Map<number, number[]>
  // Current global max frequency of an element
  maxFreq: number

  constructor() {
    this.freqMap = new Map()
    this.groupMap = new Map()
    this.maxFreq = 0
  }

  /**
   * T: O(1); S: O(n)
   */
  push(val: number): void {
    const count = (this.freqMap.get(val) || 0) + 1

    this.freqMap.set(val, count)

    if (this.groupMap.has(count)) {
      const group = this.groupMap.get(count)!
      group.push(val)
    } else {
      this.groupMap.set(count, [val])
    }

    this.maxFreq = Math.max(this.maxFreq, count)
  }

  /**
   * T: O(1); S: O(n)
   */
  pop(): number {
    const group = this.groupMap.get(this.maxFreq)!

    const el = group.pop()!

    this.freqMap.set(el, this.freqMap.get(el)! - 1)

    if (group.length === 0) {
      // Keys in groupMap are always continuous (1, 2, 3, ...)
      // We can safely delete the current group and decrement current max frequency by 1
      this.groupMap.delete(this.maxFreq)
      this.maxFreq--
    }

    return el
  }
}

/**
 * Stack of Stacks
 */
class FreqStack3 {
  // Frequency map of (el, count)
  freqMap: Map<number, number>
  // Array of Stacks
  // `i`th stack holds elements with `i` count (like bucket sort)
  stacks: number[][]

  constructor() {
    this.freqMap = new Map()
    this.stacks = [[]]
  }

  /**
   * T: O(1); S: O(n)
   */
  push(val: number): void {
    const count = (this.freqMap.get(val) || 0) + 1

    this.freqMap.set(val, count)

    if (count === this.stacks.length) {
      this.stacks.push([])
    }

    this.stacks[count].push(val)
  }

  /**
   * T: O(1); S: O(n)
   */
  pop(): number {
    const topStack = this.stacks.at(-1)!

    const el = topStack.pop()!

    this.freqMap.set(el, this.freqMap.get(el)! - 1)

    if (topStack.length === 0) {
      this.stacks.pop()
    }

    return el
  }
}

interface TestCase {
  name: string
  operations: string[]
  arguments: number[][]
  expected: (number | null)[]
}

function runTests(FreqStackClass: new () => { push(val: number): void, pop(): number }) {
  const testCases: TestCase[] = [
    {
      name: 'LeetCode Example 1',
      operations: [
        'FreqStack', 'push', 'push', 'push', 'push',
        'push', 'push', 'pop', 'pop', 'pop', 'pop'
      ],
      arguments: [
        [], [5], [7], [5], [7],
        [4], [5], [], [], [], []
      ],
      expected: [null, null, null, null, null, null, null, 5, 7, 5, 4]
    },
    {
      name: 'Single Element Multiple Pops',
      operations: ['FreqStack', 'push', 'push', 'push', 'pop', 'pop', 'pop'],
      arguments: [[], [1], [1], [1], [], [], []],
      expected: [null, null, null, null, 1, 1, 1]
    },
    {
      name: 'Interleaved Frequencies and Tie-Breaking',
      operations: [
        'FreqStack', 'push', 'push', 'push',
        'pop', 'push', 'pop', 'pop'
      ],
      arguments: [
        [], [1], [2], [1],
        [], [2], [], []
      ],
      expected: [null, null, null, null, 1, null, 2, 2]
    }
  ]

  let passedCount = 0

  testCases.forEach((tc, index) => {
    let stack: InstanceType<typeof FreqStackClass> | null = null
    const results: (number | null)[] = []

    try {
      for (let i = 0; i < tc.operations.length; i++) {
        const op = tc.operations[i]
        const args = tc.arguments[i]

        if (op === 'FreqStack') {
          stack = new FreqStackClass()
          results.push(null)
        } else if (op === 'push') {
          stack!.push(args[0])
          results.push(null)
        } else if (op === 'pop') {
          const val = stack!.pop()
          results.push(val)
        }
      }

      // Verify results
      const isMatch = JSON.stringify(results) === JSON.stringify(tc.expected)
      if (isMatch) {
        console.log(`✅ Test ${index + 1}: ${tc.name} PASSED`)
        passedCount++
      } else {
        console.error(`❌ Test ${index + 1}: ${tc.name} FAILED`)
        console.error(`  Expected: ${JSON.stringify(tc.expected)}`)
        console.error(`  Received: ${JSON.stringify(results)}`)
      }
    } catch (error) {
      console.error(`❌ Test ${index + 1}: ${tc.name} CRASHED with error:`, error)
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(FreqStack3)
