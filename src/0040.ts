// 40. Combination Sum II

/**
 * Backtrack & Hash Map
 * T: O(n * 2 ^ n); S: O(n);
 */
function combinationSumTwo(candidates: number[], target: number): number[][] {
  // Input: candidates = [2,5,2,1,2], target = 5
  // Output: [[1,2,2],[5]]

  const res: number[][] = []
  const solution: number[] = []

  // Hash map for (number-count)
  // { 1:1, 2:3, 5:1 }
  const map = new Map<number, number>()
  // List of unique candidate
  // [2, 5, 1]
  const nums: number[] = []
  for (const n of candidates) {
    if (!map.has(n)) {
      nums.push(n)
    }
    map.set(n, (map.get(n) || 0) + 1)
  }

  const dfs = (sum: number, i: number) => {
    if (sum === target) {
      res.push([...solution])
      return
    }
    if (sum > target || i >= nums.length) {
      return
    }

    const curr = nums[i]

    // Include curr only if count > 0
    if (map.get(curr)! > 0) {
      solution.push(curr)
      map.set(curr, map.get(curr)! - 1)
      dfs(sum + curr, i) // Stay at current index for the same number

      // Backtrack
      solution.pop()
      map.set(curr, map.get(curr)! + 1)
    }

    // Exclude curr
    dfs(sum, i + 1)
  }

  dfs(0, 0)

  return res
};

/**
 * Backtrack
 * T: O(n * 2 ^ n); S: O(n);
 */
function combinationSumTwo2(candidates: number[], target: number): number[][] {
  // Input: candidates = [2,5,2,1,2], target = 5
  // Output: [[1,2,2],[5]]

  const res: number[][] = []
  const solution: number[] = []

  const nums = [...candidates]
  nums.sort((a, b) => a - b)
  const n = nums.length

  const dfs = (sum: number, i: number) => {
    if (sum === target) {
      res.push([...solution])
      return
    }
    if (sum > target || i >= n) {
      return
    }

    const curr = nums[i]

    // Include curr
    solution.push(curr)
    dfs(sum + curr, i + 1)

    // Backtrack and skip duplicate
    // [1, 2, 2, 2, 5]
    //     i --> i
    solution.pop()
    while (
      i + 1 < n &&
      nums[i] === nums[i + 1]
    ) {
      i++
    }
    dfs(sum, i + 1)
  }

  dfs(0, 0)

  return res
};

/**
 * Backtrack (Optimized)
 * T: O(n * 2 ^ n); S: O(n);
 */
function combinationSumTwo3(candidates: number[], target: number): number[][] {
  // Skip duplicate and stop early

  const res: number[][] = []
  const solution: number[] = []

  const nums = candidates.toSorted((a, b) => a - b)
  const n = nums.length

  const dfs = (sum: number, i: number) => {
    if (sum === target) {
      res.push([...solution])
      return
    }

    for (let j = i; j < n; j++) {
      if (j > i && nums[j] === nums[j - 1]) {
        continue
      }
      if (sum + nums[j] > target) {
        break
      }

      solution.push(nums[j])
      dfs(sum + nums[j], j + 1)
      solution.pop()
    }
  }

  dfs(0, 0)

  return res
};

/**
 * Tester for LeetCode 40: Combination Sum II
 * @param solutionFn - The function to test
 */
function runTests(solutionFn: (candidates: number[], target: number) => number[][]) {
  const testCases = [
    {
      candidates: [10, 1, 2, 7, 6, 1, 5],
      target: 8,
      expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
    },
    {
      candidates: [2, 5, 2, 1, 2],
      target: 5,
      expected: [[1, 2, 2], [5]]
    },
    {
      candidates: [1, 1, 1, 1, 1],
      target: 3,
      expected: [[1, 1, 1]]
    },
    {
      candidates: [1],
      target: 1,
      expected: [[1]]
    }
  ];

  // Helper to normalize arrays for deep comparison
  const normalize = (arr: number[][]) =>
    arr.map(sub => sub.slice().sort((a, b) => a - b))
      .sort((a, b) => a.length - b.length || a[0] - b[0]);

  console.log(`--- Starting Tests for: ${solutionFn.name || 'Anonymous Function'} ---\n`);

  testCases.forEach((tc, index) => {
    const result = solutionFn([...tc.candidates], tc.target);

    const normalizedResult = JSON.stringify(normalize(result));
    const normalizedExpected = JSON.stringify(normalize(tc.expected));

    const passed = normalizedResult === normalizedExpected;

    console.log(`Test Case #${index + 1}:`);
    console.log(`  Input: [${tc.candidates}], Target: ${tc.target}`);
    console.log(`  Expected: ${JSON.stringify(tc.expected)}`);
    console.log(`  Actual:   ${JSON.stringify(result)}`);
    console.log(`  Status:   ${passed ? "✅ PASS" : "❌ FAIL"}`);
    console.log('--------------------------------------------------');
  });
}

runTests(combinationSumTwo3);
