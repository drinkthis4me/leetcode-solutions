// 39. Combination Sum

/**
 * DFS Backtracking
 * T: O(2 t / m); S: O(t / m);
 * t for target, m for min value in candidate
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = []
  const solution: number[] = []

  // nums = [2, 3, 5], target = 8
  const dfs = (target: number, i: number) => {
    // Base case
    if (target === 0) {
      // Target reached
      res.push([...solution])
      return
    }
    if (target < 0 || i >= candidates.length) {
      // Failed: discard
      return
    }

    // Include at i 
    const curr = candidates[i]
    solution.push(curr)
    // Stay at i because curr may be reused
    dfs(target - curr, i)

    // Exclude at i (backtrack)
    solution.pop()
    dfs(target, i + 1)
  }

  dfs(target, 0)

  return res
};

/**
 * DFS Backtracking (Optimized)
 * T: O(2 t / m); S: O(t / m);
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  // Try the smaller first
  // Stop early when leftover < current candidate

  // nums = [2, 3, 5], target = 8
  // option = [2, 2]
  // Leftover is 2.
  // A new 3 would fail to reach the target, so 5 would fail too.

  const nums = candidates.toSorted((a, b) => a - b)

  const res: number[][] = []
  const solution: number[] = []

  const dfs = (sum: number, i: number) => {
    // Base case
    if (sum === target) {
      res.push([...solution])
    }

    for (let j = i; j < nums.length; j++) {
      const curr = nums[j]
      const newSum = sum + curr
      if (newSum > target) {
        // The rest of nums are too large
        return
      }

      solution.push(nums[j])
      dfs(newSum, j)

      // Backtrack
      solution.pop()
    }
  }

  dfs(0, 0)

  return res
};

/**
 * Type definition for the LeetCode 39 solution function.
 */
type CombinationSumFn = (candidates: number[], target: number) => number[][];


/**
 * Runs a suite of test cases against the provided solution function.
 */
function runTests(solution: CombinationSumFn) {
  const testCases = [
    {
      candidates: [2, 3, 6, 7],
      target: 7,
      expected: [[2, 2, 3], [7]]
    },
    {
      candidates: [2, 3, 5],
      target: 8,
      expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
    },
    {
      candidates: [2],
      target: 1,
      expected: []
    },
    {
      candidates: [1],
      target: 1,
      expected: [[1]]
    },
    {
      candidates: [1],
      target: 2,
      expected: [[1, 1]]
    }
  ];

  /**
   * Utility to compare two arrays of arrays (order-insensitive).
   */
  function areResultsEqual(res1: number[][], res2: number[][]): boolean {
    if (res1.length !== res2.length) return false;

    const serialize = (arr: number[]) => [...arr].sort((a, b) => a - b).join(',');
    const sortedRes1 = res1.map(serialize).sort();
    const sortedRes2 = res2.map(serialize).sort();

    return sortedRes1.every((val, idx) => val === sortedRes2[idx]);
  }

  console.log(`--- Testing Solution: ${solution.name || 'Anonymous Function'} ---`);

  testCases.forEach((tc, index) => {
    const start = performance.now();
    const result = solution(tc.candidates, tc.target);
    const end = performance.now();

    const passed = areResultsEqual(result, tc.expected);

    console.log(
      `Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'} ` +
      `(${(end - start).toFixed(4)}ms)`
    );

    if (!passed) {
      console.error(`  Input: [${tc.candidates}] target=${tc.target}`);
      console.error(`  Expected: ${JSON.stringify(tc.expected)}`);
      console.error(`  Received: ${JSON.stringify(result)}`);
    }
  });
  console.log('\n');
}

runTests(combinationSum2);
