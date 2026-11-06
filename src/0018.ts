// 18. 4Sum

/**
 * Two Pointers
 *
 * T: O(n); S: O(1);
 */
function twoSum(nums: number[], startIndex: number, target: number): number[][] {
  const res: number[][] = []

  const n = nums.length
  let l = startIndex
  let r = n - 1

  while (l < r) {
    const sum = nums[l] + nums[r]

    if (sum < target) {
      // Find a larger left number
      l++
    } else if (sum > target) {
      // Find a smaller right number
      r--
    } else {
      // sum === target
      res.push([nums[l]!, nums[r]!])

      // Move pointers and continue find the next pair
      l++
      r--

      // Skip duplicate numbers
      while (l < r && nums[l] === nums[l - 1]) {
        l++
      }
      while (l < r && nums[r] === nums[r + 1]) {
        r--
      }
    }
  }

  return res
}

/**
 * Hash Set
 *
 * T: O(n); S: O(n);
 */
function twoSum2(nums: number[], start: number, target: number): number[][] {
  const res: number[][] = []
  const s = new Set<number>()

  for (let i = start; i < nums.length; i++) {
    const curr = nums[i]!

    if (
      res.length === 0 ||
      res[res.length - 1]![1] !== curr // Skip duplicate
    ) {
      if (s.has(target - curr)) {
        res.push([target - curr, curr])
      }
    }

    s.add(curr)
  }

  return res
}

/**
 * All purpose k sum.
 *
 * T: O(n ^ (k - 1)); S: O(n);
 *
 * We need O(k) space for the recursion. k -> n in the worst case.
 */
function kSum(nums: number[], startIndex: number, target: number, k: number): number[][] {
  // Reduce k sume to (k - 1) sum.
  // (k - 1) sum to (k - 2) sum.
  // ...
  // 3Sum to 2Sum.

  const n = nums.length
  const res: number[][] = []

  // Edge case: Ran out of numbers
  if (startIndex === nums.length) return res

  // Edge case: Boundary check
  // Smallest number must be less than avg.
  // Largest number must be greater than avg.
  const avgVal = target / k
  if (nums[startIndex] > avgVal || nums[n - 1] < avgVal) {
    return res
  }

  // Base case
  if (k === 2) {
    return twoSum(nums, startIndex, target)
  }

  // Recursively call kSum
  for (let i = startIndex; i < n - k + 1; i++) {
    // Skip duplicate first number
    if (i > startIndex && nums[i] === nums[i - 1]) continue

    // Divide and conquer
    const kSumResult = kSum(nums, i + 1, target - nums[i], k - 1)
    // Rebuild result
    for (const subResult of kSumResult) {
      res.push([nums[i], ...subResult])
    }
  }

  return res
}

/**
 * T: O(n ^ 3); S: O(n);
 */
function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b)

  return kSum(nums, 0, target, 4)
};

type SolutionFunction = (nums: number[], target: number) => number[][]

interface TestCase {
  nums: number[]
  target: number
  expected: number[][]
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    {
      nums: [1, 0, -1, 0, -2, 2],
      target: 0,
      expected: [
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1]
      ]
    },
    {
      nums: [2, 2, 2, 2, 2],
      target: 8,
      expected: [
        [2, 2, 2, 2]
      ]
    },
    {
      nums: [0, 0, 0, 0],
      target: 0,
      expected: [
        [0, 0, 0, 0]
      ]
    },
    {
      nums: [-3, -2, -1, 0, 0, 1, 2, 3],
      target: 0,
      expected: [
        [-3, -2, 2, 3],
        [-3, -1, 1, 3],
        [-3, 0, 0, 3],
        [-3, 0, 1, 2],
        [-2, -1, 0, 3],
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1]
      ]
    }
  ]

  // Helper function to normalize 2D arrays so order (outer and inner) doesn't fail comparison
  const normalize = (arr: number[][]): string[] => {
    if (!arr || !Array.isArray(arr)) return []
    return arr
      .map(sub => [...sub].sort((a, b) => a - b).join(','))
      .sort()
  }

  let passedCount = 0

  console.log('Running LeetCode 18 (4Sum) Tests...\n')

  testCases.forEach((tc, index) => {
    const start = performance.now()
    let actual: number[][] = []
    let error: string | null = null

    try {
      actual = solution(tc.nums, tc.target)
    } catch (err: any) {
      error = err.message
    }
    const end = performance.now()
    const duration = (end - start).toFixed(2)

    const normalizedExpected = JSON.stringify(normalize(tc.expected))
    const normalizedActual = JSON.stringify(normalize(actual))

    const passed = !error && normalizedExpected === normalizedActual

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: PASSED (${duration}ms)`)
    } else {
      console.log(`❌ Test Case ${index + 1}: FAILED (${duration}ms)`)
      console.log(`   Nums:     [${tc.nums.join(', ')}]`)
      console.log(`   Target:   ${tc.target}`)
      console.log(`   Expected: ${JSON.stringify(tc.expected)}`)
      console.log(`   Got:      ${error ? `Error: ${error}` : JSON.stringify(actual)}`)
      console.log('--------------------------------------------------')
    }
  })

  console.log(`\nResult: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(fourSum)
