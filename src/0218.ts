// 218. The Skyline Problem

import { MaxPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * Coordinate compression
 * T: O(n^2); S: O(n);
 */
function getSkyline(buildings: number[][]): number[][] {
  // Collect all unique x-coordinates (building starts and ends)
  const uniquePositions = new Set<number>()
  for (const building of buildings) {
    uniquePositions.add(building[0]) // left edge
    uniquePositions.add(building[1]) // right edge
  }

  // Convert set to sorted array and create position to index mapping
  const sortedPositions = Array.from(uniquePositions).sort((a, b) => a - b)
  const positionToIndex = new Map<number, number>()
  sortedPositions.forEach((position, index) => {
    positionToIndex.set(position, index)
  })

  // Track the maximum height at each compressed position
  const maxHeights = new Array(sortedPositions.length).fill(0)
  for (const [left, right, height] of buildings) {
    const leftIndex = positionToIndex.get(left)!
    const rightIndex = positionToIndex.get(right)!

    // Update heights for all positions covered by this building
    for (let i = leftIndex; i < rightIndex; i++) {
      maxHeights[i] = Math.max(maxHeights[i], height)
    }
  }

  // Build the skyline by finding height changes
  const skyline: number[][] = []
  let prevHeight = 0

  for (let i = 0; i < sortedPositions.length; i++) {
    const currentHeight = maxHeights[i]
    if (currentHeight !== prevHeight) {
      skyline.push([sortedPositions[i], currentHeight])
      prevHeight = currentHeight
    }
  }

  return skyline
};

/**
 * Sweep Line w/ Max Heap
 * T: O(n log n); S: O(n);
 */
function getSkyline2(buildings: number[][]): number[][] {
  // Transform buildings into "starting event" and "ending event"
  // Sort events by x coordinates.
  // Store/remove the heights in maxHeap to access the current max height

  const res: number[][] = []
  const events: [number, number][] = []

  for (const [l, r, h] of buildings) {
    events.push([l, -h]) // Negative h for start point
    events.push([r, h]) // Positive h for end point
  }

  // Sort events by x. If tie, smaller h came first.
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1])

  // MaxHeap for heights. Starts at 0.
  const maxHeap = new MaxPriorityQueue<number>()
  maxHeap.push(0)

  let prevMax = 0

  // Sweep line
  for (const [x, h] of events) {
    if (h < 0) {
      // Start point: push h
      maxHeap.push(-h)
    } else {
      // End point: remove h
      maxHeap.remove(val => val === h)
    }

    const currMax = maxHeap.front()!
    if (currMax !== prevMax) {
      res.push([x, currMax])
      prevMax = currMax
    }
  }

  return res
};

/**
 * D&C
 * T: O(n log n); S: O(n);
 */
function getSkyline3(buildings: number[][]): number[][] {
  // Helper fn to merge two skylines
  const merge = (left: number[][], right: number[][]): number[][] => {
    // Shape of skyline:
    // [[l, h], [r, 0]] where [l, r, h] = building[i]
    const res: number[][] = []

    // Max heights
    let h1 = 0
    let h2 = 0
    // Pointers for left/right skylines
    let i = 0
    let j = 0

    while (i < left.length && j < right.length) {
      let x: number
      const leftX = left[i][0]
      const leftH = left[i][1]

      const rightX = right[j][0]
      const rightH = right[j][1]

      if (leftX < rightX) {
        x = leftX
        h1 = leftH
        i++
      } else if (leftX > rightX) {
        x = rightX
        h2 = rightH
        j++
      } else {
        x = leftX
        h1 = leftH
        h2 = rightH
        i++
        j++
      }

      const maxH = Math.max(h1, h2)
      if (res.length === 0 || res[res.length - 1][1] !== maxH) {
        res.push([x, maxH])
      }
    }

    return res.concat(left.slice(i)).concat(right.slice(j))
  }

  const n = buildings.length

  // Base case
  if (n === 0) return []
  if (n === 1) {
    const [l, r, h] = buildings[0]
    return [[l, h], [r, 0]]
  }

  // Divide and conquer
  const mid = Math.floor(n / 2)
  const left = getSkyline3(buildings.slice(0, mid))
  const right = getSkyline3(buildings.slice(mid))

  return merge(left, right)
}

/**
 * Test harness for The Skyline Problem (LeetCode 218)
 * * @param solutionFn - The function to test (signature: (buildings: number[][]) => number[][])
 */
function runTests(solutionFn: (buildings: number[][]) => number[][]): void {
  const testCases = [
    {
      name: 'Standard Example',
      input: [[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]],
      expected: [[2, 10], [3, 15], [7, 12], [12, 0], [15, 10], [20, 8], [24, 0]]
    },
    {
      name: 'Single Building',
      input: [[1, 2, 3]],
      expected: [[1, 3], [2, 0]]
    },
    {
      name: 'Flat Rooftop',
      input: [[0, 2, 3], [2, 5, 3]],
      expected: [[0, 3], [5, 0]]
    },
    {
      name: 'Buildings with same start/end',
      input: [[1, 5, 10], [1, 5, 5]],
      expected: [[1, 10], [5, 0]]
    }
  ]

  console.log('--- Starting Tests ---')

  testCases.forEach(({ name, input, expected }, index) => {
    const result = solutionFn(input)
    const passed = JSON.stringify(result) === JSON.stringify(expected)

    console.log(`Test Case #${index + 1}: ${name}`)
    console.log(`  Status: ${passed ? 'PASSED' : 'FAILED'}`)
    if (!passed) {
      console.log(`  Expected: ${JSON.stringify(expected)}`)
      console.log(`  Received: ${JSON.stringify(result)}`)
    }
  })

  console.log('--- Tests Complete ---')
}

runTests(getSkyline2)
