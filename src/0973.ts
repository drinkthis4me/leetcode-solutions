// 973. K Closest Points to Origin

import { MaxPriorityQueue, MinPriorityQueue } from '@datastructures-js/priority-queue'

/**
 * Sort
 * T: O(n log n); S: O(n);
 */
function kClosest(points: number[][], k: number): number[][] {
  // Calculate each distance.
  // Sort then take top k.

  points.sort((a, b) => {
    const xa = a[0]!
    const ya = a[1]!
    const xb = b[0]!
    const yb = b[1]!

    return (xa ** 2 + ya ** 2) - (xb ** 2 + yb ** 2)
  })

  return points.slice(0, k)
};

/**
 * Min Heap
 * T: O(n + k log ⁡n); S: O(n);
 */
function kClosest2(points: number[][], k: number): number[][] {
  // Push distances to min heap, and get top k smallest from the minHeap top.

  // Min heap that stores [x, y, distance]
  const minHeap = new MinPriorityQueue<[number, number, number]>(x => x[2])

  for (const [x, y] of points) {
    const d = x! ** 2 + y! ** 2
    minHeap.push([x!, y!, d])
  }

  const res: number[][] = []

  for (let i = 0; i < k; i++) {
    const [x, y] = minHeap.pop()!
    res.push([x, y])
  }

  return res
};

/**
 * Max Heap
 * T:O(n log k); S: O(k);
 */
function kClosest3(points: number[][], k: number): number[][] {
  // Maintain maxHeap with at most k elements.

  // Max heap that stores [x, y, distance]
  const maxHeap = new MaxPriorityQueue<[number, number, number]>(x => x[2])

  for (const [x, y] of points) {
    const d = x! ** 2 + y! ** 2
    maxHeap.push([x!, y!, d])

    if (maxHeap.size() > k) {
      maxHeap.pop()
    }
  }

  return maxHeap.toArray().map(el => [el[0], el[1]])
};

/**
 * Quick Select (Quick sort)
 * T: avg O(n) worst O(n ^ 2); S: O(1);
 */
function kClosest4(points: number[][], k: number): number[][] {
  // Quick sort in ascending order.
  // Each iteration, split at index p.
  // All points before p are smaller than p; all points after p are larger.
  // When p < k, search right part.
  // When p > k, search left part.
  // When p === k, left are the top k.

  const getDistance = (point: number[]): number => {
    return point[0] ** 2 + point[1] ** 2
  }

  const partition = (points: number[][], l: number, r: number): number => {
    const pivotIdx = r
    const pivotDist = getDistance(points[pivotIdx]!)

    let i = l
    for (let j = l; j < r; j++) {
      if (getDistance(points[j]!) < pivotDist) {
        [points[i], points[j]] = [points[j], points[i]]
        i++
      }
    }

    [points[i], points[r]] = [points[r], points[i]]
    return i
  }

  let l = 0
  let r = points.length - 1
  let pivot = points.length

  while (pivot !== k) {
    pivot = partition(points, l, r)
    if (pivot < k) {
      l = pivot + 1
    } else {
      r = pivot - 1
    }
  }

  return points.slice(0, k)
};

/**
 * --- Tester ---
 */
function runAllTests(fn: (points: number[][], k: number) => number[][]) {
  const testCases = [
    { points: [[1, 3], [-2, 2]], k: 1, expected: [[-2, 2]] },
    { points: [[3, 3], [5, -1], [-2, 4]], k: 2, expected: [[3, 3], [-2, 4]] }
  ]

  function normalize(points: number[][]): number[][] {
    return [...points].sort((a, b) => a[0]! - b[0]! || a[1]! - b[1]!)
  }

  function runTest(
    points: number[][],
    k: number,
    expected: number[][]
  ) {
    const result = fn(points, k)

    const normalizedResult = normalize(result)
    const normalizedExpected = normalize(expected)

    const isMatch = JSON.stringify(normalizedResult) === JSON.stringify(normalizedExpected)

    console.log(`Test with k=${k}, points=${JSON.stringify(points)}`)
    if (isMatch) {
      console.log('✅ Passed')
    } else {
      console.error('❌ Failed')
      console.error(`   Expected: ${JSON.stringify(normalizedExpected)}`)
      console.error(`   Got:      ${JSON.stringify(normalizedResult)}`)
    }
  }


  testCases.forEach(t => runTest(t.points, t.k, t.expected))
}

runAllTests(kClosest4)
