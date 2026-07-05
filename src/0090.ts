// 90. Subsets II

/**
 * Backtrack
 * T: O(n * 2 ^ n); S: O(n);
 */
function subsetsWithDup(nums: number[]): number[][] {
  const n = nums.length
  const res: number[][] = []
  const solution: number[] = []

  nums.sort((a, b) => a - b)

  const backtrack = (i: number) => {
    res.push([...solution])

    for (let j = i; j < n; j++) {
      if (j > i && nums[j] === nums[j - 1]) continue

      solution.push(nums[j])
      backtrack(j + 1)
      solution.pop()
    }
  }

  backtrack(0)

  return res
};

/**
 * Iteration
 * T: O(n * 2 ^ n); S: O(n);
 */
function subsetsWithDup2(nums: number[]): number[][] {
  const n = nums.length
  const res: number[][] = [[]]
  let endIdx = 0

  nums.sort((a, b) => a - b)

  for (let i = 0; i < n; i++) {
    // If current number is duplicate,
    // only add to subsets created in the last iteration
    const startIdx = (i > 0 && nums[i] === nums[i - 1])
      ? endIdx
      : 0

    endIdx = res.length
    for (let j = startIdx; j < endIdx; j++) {
      const subset = [...res[j], nums[i]]

      res.push(subset)
    }
  }

  return res
}

/**
 * Test Runner for LeetCode 90: Subsets II
 * @param solutionFn - The function to test
 */
function runTests(solutionFn: (nums: number[]) => number[][]) {
  const testCases = [
    {
      name: 'Example 1: Standard input',
      nums: [1, 2, 2],
      expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
    },
    {
      name: 'Example 2: Single element',
      nums: [0],
      expected: [[], [0]]
    },
    {
      name: 'Empty input',
      nums: [],
      expected: [[]]
    },
    {
      name: 'All duplicates',
      nums: [4, 4, 4],
      expected: [[], [4], [4, 4], [4, 4, 4]]
    }
  ]

  /**
* Helper to compare two sets of subsets regardless of order.
* Sorts subsets internally to ensure deep comparison works.
*/
  function compareSubsets(result: number[][], expected: number[][]): boolean {
    if (result.length !== expected.length) return false

    const serialize = (arr: number[][]) =>
      arr.map(sub => [...sub].sort((a, b) => a - b).join(',')).sort().join('|')

    return serialize(result) === serialize(expected)
  }


  console.log(`--- Running Tests for: ${solutionFn.name} ---`)

  for (const { name, nums, expected } of testCases) {
    const result = solutionFn(nums)
    const passed = compareSubsets(result, expected)

    console.log(`${passed ? '✅' : '❌'} ${name}`)
    if (!passed) {
      console.log(`   Input:    [${nums}]`)
      console.log(`   Expected: ${JSON.stringify(expected)}`)
      console.log(`   Received: ${JSON.stringify(result)}`)
    }
  }
  console.log('')
}


runTests(subsetsWithDup2)
