// 621. Task Scheduler

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'
import { Queue } from '@datastructures-js/queue'

// Always process the most frequent task 
// because they need to cool down and require more overall time to complete.

/**
 * Max Heap
 * T: O(m); S: O(1);
 */
function leastInterval(tasks: string[], n: number): number {
  // Max heap to sort the tasks in most-frequent order.

  const freq: number[] = new Array(26).fill(0)
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++
  }

  const maxHeap = new MaxPriorityQueue<number>()
  for (const count of freq) {
    if (count > 0) {
      maxHeap.push(count)
    }
  }

  let time = 0

  // Batch process task in cycle of (n + 1) time
  while (!maxHeap.isEmpty()) {

    let taskCount = 0
    let cycle = n + 1

    // Temporary list to store remaining tasks
    // that still need to be executed later
    const tempTasks: number[] = []

    while (cycle > 0 && !maxHeap.isEmpty()) {
      const currTask = maxHeap.pop()!
      if (currTask > 1) {
        tempTasks.push(currTask - 1)
      }
      taskCount++
      cycle--
    }

    // Push the tempTasks back to heap
    for (const task of tempTasks) {
      maxHeap.push(task)
    }

    // Add time for this cycle.
    // If there are still tasks, full cycle (n + 1) is needed.
    // Else, stop early by only add the taskCount.
    time += maxHeap.isEmpty() ? taskCount : n + 1
  }

  return time
};

/**
 * Max Heap & Queue
 * T: O(m); S: O(1);
 */
function leastInterval2(tasks: string[], n: number): number {
  // Max heap to sort the tasks in most-frequent order.
  // Queue to store tasks that are in cool-down.

  const freq: number[] = new Array(26).fill(0)
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++
  }

  const maxHeap = new MaxPriorityQueue<number>()
  for (const count of freq) {
    if (count > 0) {
      maxHeap.push(count)
    }
  }

  // Queue with (remainingCount)-(nextAvailableTime) pairs
  const q = new Queue<[number, number]>()
  let time = 0

  while (!maxHeap.isEmpty() || !q.isEmpty()) {
    time++

    if (maxHeap.isEmpty()) {
      // Currently idle
      // Fast-forward to the next task cycle
      time = q.front()![1]
    }
    else {
      // Process task
      const top = maxHeap.pop()!
      const remainingCount = top - 1

      if (remainingCount !== 0) {
        // Enter cool-down queue
        q.push([remainingCount, time + n])
      }
    }

    // Add cool-downed task back to max heap
    if (!q.isEmpty() && q.front()![1] === time) {
      maxHeap.push(q.pop()![0])
    }
  }

  return time
};

/**
 * Greedy (Sort and filling)
 * T: O(m); S: O(1);
 */
function leastInterval3(tasks: string[], n: number): number {
  // Make a list of most frequent task with idle as empty slot.
  // Fill the empty slot with the less frequent task.

  // tasks = ['A', 'A', 'A', 'B', 'B', 'B'], n = 2

  // 1. Count frequency.
  //      freq = [..., 3, 3]
  // 2. Take 'A' (index 25) and make a list.
  //      list: 'A', _ , _ ,'A', _ , _ 'A'
  //      maxFreq (gap) = 3 - 1 = 2
  //      idleSlots = maxFreq * n = 4
  // 3. Handle other tasks. Iterate from index 24 to 0.
  //    In each iteration, fill the slot by min(maxFreq, freq[i])
  //      (i = 24) idleSlots = idleSlots - min(2, 3) = 4 - 2 = 2
  //      List: 'A', 'B', _ ,'A', 'B', _ 'A'
  // 4. Final result:
  //    If idleSlots > 0, not enough slots for the other tasks.
  //    Need to expand beyond the list.
  //      time = tasks.length + idleSlots
  //    Else, all other tasks can be fitted into slots.
  //      time = tasks.length

  const freq = new Array(26).fill(0)
  for (const task of tasks) {
    freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++
  }
  freq.sort((a, b) => a - b)

  const maxFreq = freq[25] - 1
  let idleSlots = maxFreq * n

  for (let i = 24; i >= 0; i--) {
    if (freq[i] === 0) {
      // Optimize: All subsequent counts are zero 
      break
    }
    idleSlots -= Math.min(maxFreq, freq[i])
  }

  return idleSlots > 0 ? tasks.length + idleSlots : tasks.length
};

/**
 * Tester for LeetCode 621: Task Scheduler
 * @param solutionFn The function to test
 */
function runTaskSchedulerTests(solutionFn: (tasks: string[], n: number) => number) {
  const testCases = [
    {
      tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
      n: 2,
      expected: 8,
      description: 'Standard case with idle periods'
    },
    {
      tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
      n: 0,
      expected: 6,
      description: 'No cooldown required'
    },
    {
      tasks: ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
      n: 2,
      expected: 16,
      description: 'High frequency task dominating the schedule'
    },
    {
      tasks: ['A', 'B', 'C'],
      n: 1,
      expected: 3,
      description: 'Tasks are unique, no cooldown needed'
    },
    {
      tasks: ['A', 'A', 'B', 'B'],
      n: 2,
      expected: 5,
      description: 'Short cooldown buffer'
    }
  ]

  console.log(`--- Testing Function: ${solutionFn.name || 'Anonymous Function'} ---`)

  testCases.forEach((tc, index) => {
    const result = solutionFn([...tc.tasks], tc.n)
    const passed = result === tc.expected

    console.log(`Test ${index + 1}: ${tc.description}`)
    console.log(`  Input: tasks=[${tc.tasks}], n=${tc.n}`)
    console.log(`  Expected: ${tc.expected}, Got: ${result}`)
    console.log(`  Status: ${passed ? '✅ PASS' : '❌ FAIL'}`)
    console.log('-----------------------------------')
  })
}

// Execution
runTaskSchedulerTests(leastInterval3)