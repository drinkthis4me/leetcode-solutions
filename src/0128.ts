// 128. Longest Consecutive Sequence

/**
 * Filter and Sort
 * T: O(n log n); S: O(n);
 *
 * Violation: O(n log n) time complexity
 */
function longestConsecutive(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  // Filter and sort the array
  const _nums = [...new Set(nums)]
  _nums.sort((a, b) => a - b)

  // Find longest consecutive sequence
  let currentLength = 1
  let maxLength = 1
  for (let i = 1; i < _nums.length; i++) {
    // Compare i and (i - 1)
    if (_nums[i]! === _nums[i - 1]! + 1) {
      currentLength++
    } else {
      currentLength = 1
    }

    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
};

/**
 * Map
 * T:O(n); S: O(n);
 */
function longestConsecutive2(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  // Map for lookup: [(value), (visited)]
  const map = new Map<number, boolean>()
  for (const num of nums) {
    map.set(num, false)
  }

  let maxLength = 1

  for (const num of nums) {
    // Only check unvisited number
    if (!map.get(num)) {
      // Mark as visited
      map.set(num, true)

      // Find the longest consecutive length starting from `num`
      let currentLength = 1
      let currentNum = num
      while (map.has(currentNum + 1)) {
        currentLength++
        currentNum++
        map.set(currentNum, true)
      }

      // Compare and update `maxLength`
      maxLength = Math.max(maxLength, currentLength)
    }
  }

  return maxLength
};

/**
 * Test Starting Number w/ Set
 * T:O(n); S: O(n);
 */
function longestConsecutive3(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  const set = new Set<number>(nums)

  let maxLength = 0

  for (const num of set) {
    // Only test starting number
    // i.e. (num - 1) does not exist.
    if (!set.has(num - 1)) {
      let currNum = num
      while (set.has(currNum)) {
        currNum++
      }

      // Calculate length: last - start
      const currentLength = currNum - num

      // Compare and update `maxLength`
      maxLength = Math.max(maxLength, currentLength)
    }
  }

  return maxLength
};

/**
 * Sequence Boundary w/ map
 * T:O(n); S: O(n);
 */
function longestConsecutive4(nums: number[]): number {
  // Edge Case
  if (nums.length <= 1) return nums.length

  // Map of [num, length_of_sequence_starting_at_num]
  const map = new Map<number, number>()

  let res = 0

  for (const n of nums) {
    if (map.has(n)) continue

    // Calculate the current length
    const length = (map.get(n - 1) || 0) + (map.get(n + 1) || 0) + 1
    map.set(n, length)

    // Update left boundary length
    const left = n - (map.get(n - 1) || 0)
    map.set(left, length)
    // Update right boundary length
    const right = n + (map.get(n + 1) || 0)
    map.set(right, length)

    res = Math.max(res, length)
  }

  return res
};

/**
 * Disjoint Set Union
 * T: O(n); S: O(n);
 */
function longestConsecutive5(nums: number[]): number {
  // 1. Group numbers by disjoint set. Put consecutive numbers under the same root.
  // 2. Find the size of the largest tree.

  class UnionFind {
    root = new Map<number, number>()
    size = new Map<number, number>()

    constructor(set: Set<number>) {
      for (const n of set) {
        this.root.set(n, n)
        this.size.set(n, 1)
      }
    }

    find(x: number): number {
      if (this.root.get(x) === x) {
        return x
      }

      const r = this.find(this.root.get(x)!)
      this.root.set(x, r)
      return r
    }

    union(x: number, y: number): boolean {
      const rootX = this.find(x)
      const rootY = this.find(y)

      if (rootX === rootY) return false

      const sizeX = this.size.get(rootX)!
      const sizeY = this.size.get(rootY)!

      if (sizeX < sizeY) {
        this.root.set(rootX, rootY)
        this.size.set(rootY, sizeX + sizeY)
      } else {
        this.root.set(rootY, rootX)
        this.size.set(rootX, sizeX + sizeY)
      }

      return true
    }

    getMaxSize(): number {
      let max = 0
      for (const size of this.size.values()) {
        max = Math.max(max, size)
      }
      return max
    }
  }

  const set = new Set<number>(nums)

  const dsu = new UnionFind(set)

  for (const n of set) {
    if (set.has(n + 1)) {
      dsu.union(n, n + 1)
    }
  }

  return dsu.getMaxSize()
}

type SolutionFunction = (nums: number[]) => number

interface TestCase {
  input: number[]
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    { input: [100, 4, 200, 1, 3, 2], expected: 4 },
    { input: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], expected: 9 },
    { input: [], expected: 0 },
    { input: [5], expected: 1 },
    { input: [1, 2, 0, 1], expected: 3 },
    { input: [-1, -2, -3, 10, 5], expected: 3 },
    { input: [1, 2, 3, 4, 5], expected: 5 },
    { input: [5, 4, 3, 2, 1], expected: 5 }
  ]

  let passedCount = 0

  console.log('Running LeetCode 128 Tests...\n')

  testCases.forEach((test, index) => {
    // Pass a copy of the array to prevent accidental in-place mutations
    const inputCopy = [...test.input]
    const result = solution(inputCopy)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED`)
    } else {
      console.error(`❌ Test Case ${index + 1}: FAILED`)
      console.error(`   Input:    [${test.input.join(', ')}]`)
      console.error(`   Expected: ${test.expected}`)
      console.error(`   Received: ${result}`)
    }
  })

  console.log('\n--- Summary ---')
  console.log(`Passed: ${passedCount}/${testCases.length} test cases.`)
}

runTests(longestConsecutive5)
