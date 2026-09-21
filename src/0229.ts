// 229. Majority Element II

/**
 * Hash Map
 * T: O(n); S: O(n);
 */
function majorityElement(nums: number[]): number[] {
  const countMap = new Map<number, number>()
  for (const n of nums) {
    if (!countMap.has(n)) {
      countMap.set(n, 0)
    }
    countMap.set(n, countMap.get(n)! + 1)
  }

  const res: number[] = []
  const threshold = Math.floor(nums.length / 3)
  for (const [n, count] of countMap.entries()) {
    if (count > threshold) {
      res.push(n)
    }
  }

  return res
};

/**
 * Boyer-Moore Voting Algorithm
 * @param nums
 * @returns
 */
function majorityElement2(nums: number[]): number[] {
  // Since result can be at most two numbers, we can track the top 2 only to save space.

  // First pass: Find the potential top 2
  let countMap = new Map<number, number>()
  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1)

    if (countMap.size > 2) {
      // Temp map to avoid altering the countMap size
      const newCountMap = new Map<number, number>()

      for (const [n, count] of countMap.entries()) {
        if (count > 1) {
          newCountMap.set(n, count - 1)
        }
      }

      countMap = newCountMap
    }
  }

  // Second pass: Verify the top 2 counts are over threshold
  const res: number[] = []
  const threshold = Math.floor(nums.length / 3)

  for (const n of countMap.keys()) {
    const trueCount = nums.filter(num => num === n).length
    if (trueCount > threshold) {
      res.push(n)
    }
  }

  return res
};

/**
 * Boyer-Moore Voting Algorithm (optimized)
 * T: O(n); S: O(1);
 */
function majorityElement3(nums: number[]): number[] {
  // Since result can be at most two numbers, we can track the top 2 only to save space.

  // First pass: Find the potential top 2
  let n1 = -1
  let n2 = -1
  let count1 = 0
  let count2 = 0

  for (const num of nums) {
    if (num === n1) {
      // Track count
      count1++
    } else if (num === n2) {
      // Track count
      count2++
    } else if (count1 === 0) {
      // Replace with new candidate and reset count
      count1 = 1
      n1 = num
    } else if (count2 === 0) {
      // Replace with new candidate and reset count
      count2 = 1
      n2 = num
    } else {
      // New number: Decrement top2 count
      count1--
      count2--
    }
  }

  // Second pass: Verify the top 2 counts are over threshold
  count1 = count2 = 0
  for (const num of nums) {
    if (num === n1) count1++
    else if (num === n2) count2++
  }

  const res: number[] = []
  const threshold = Math.floor(nums.length / 3)
  if (count1 > threshold) {
    res.push(n1)
  }
  if (count2 > threshold) {
    res.push(n2)
  }

  return res
};

interface TestCase {
  input: number[]
  expected: number[]
}

function arraysEqualUnordered(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  const sortedA = [...a].sort((x, y) => x - y)
  const sortedB = [...b].sort((x, y) => x - y)
  return sortedA.every((val, idx) => val === sortedB[idx])
}

function runTests(solution: (nums: number[]) => number[]): void {
  const testCases: TestCase[] = [
    { input: [3, 2, 3], expected: [3] },
    { input: [1], expected: [1] },
    { input: [1, 2], expected: [1, 2] },
    { input: [2, 2], expected: [2] },
    { input: [1, 1, 1, 3, 3, 2, 2, 2], expected: [1, 2] },
    { input: [], expected: [] }
  ]

  let passed = 0

  testCases.forEach((tc, index) => {
    const result = solution(tc.input)
    const isMatch = arraysEqualUnordered(result, tc.expected)

    if (isMatch) {
      passed++
      console.log(`✅ Test case ${index + 1}: PASSED`)
    } else {
      console.error(
        `❌ Test case ${index + 1}: FAILED\n` +
        `   Input:    [${tc.input.join(', ')}]\n` +
        `   Expected: [${tc.expected.join(', ')}]\n` +
        `   Got:      [${result.join(', ')}]\n`
      )
    }
  })

  console.log(`\nSummary: ${passed} / ${testCases.length} test cases passed.`)
}

runTests(majorityElement2)
