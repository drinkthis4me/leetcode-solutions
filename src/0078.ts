// 78. Subsets

/**
 * DFS
 * O(n * 2 ^ n); S: O(n);
 */
function subsets(nums: number[]): number[][] {
  const res: number[][] = []
  const subset: number[] = []

  const dfs = (i: number) => {
    if (i >= nums.length) {
      res.push([...subset])
      return
    }

    // Go left (include)
    subset.push(nums[i])
    dfs(i + 1)
    // Go right (exclude)
    subset.pop()
    dfs(i + 1)
  }

  // Start dfs at index 0
  dfs(0)

  return res
};

/**
 * Iteration
 * O(n * 2 ^ n); S: O(n);
 */
function subsets2(nums: number[]): number[][] {
  // Start: [[]]
  // Add 1: [[], [1]]
  // Add 2: [[], [1], [2], [1, 2]]

  const res: number[][] = [[]]

  for (const n of nums) {
    const length = res.length
    for (let i = 0; i < length; i++) {
      const subset = res[i].slice()
      subset.push(n)
      res.push(subset)
    }
  }

  return res
};

/**
 * Backtrack
 * T: O(n * 2 ^ n); S: O(n);
 */
function subsets3(nums: number[]): number[][] {
  const res: number[][] = []
  const solution: number[] = []

  nums.sort((a, b) => a - b)

  const backtrack = (i: number) => {
    res.push([...solution])

    for (let j = i; j < nums.length; j++) {
      solution.push(nums[j])

      backtrack(j + 1)

      solution.pop()
    }
  }

  backtrack(0)

  return res
}

/**
 * Bit Manipulation
 * O(n * 2 ^ n); S: O(n);
 */
function subsets4(nums: number[]): number[][] {
  // nums = [a, b, c]
  // Subset could be represented in bit:
  // 000 -> []
  // 001 -> [c]
  // 010 -> [b]
  // 011 -> [b, c]
  // ...
  // 111 -> [a, b, c]

  // Total bits: 1 << n

  const res: number[][] = []
  const n = nums.length

  for (let i = 0; i < (1 << n); i++) {
    const subset: number[] = []

    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        subset.push(nums[j])
      }
    }

    res.push(subset)
  }

  return res
};

/**
 * Tester for LeetCode 78: Subsets
 * Signature: (nums: number[]) => number[][]
 */

function runTests(solutionFn: (nums: number[]) => number[][]) {
  const testCases = [
    { nums: [1, 2, 3], expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
    { nums: [0], expected: [[], [0]] },
    { nums: [], expected: [[]] }
  ];

  // Helper to normalize subsets for comparison
  const sortSubsets = (arr: number[][]): string => {
    return JSON.stringify(arr.map(sub => [...sub].sort((a, b) => a - b)).sort());
  };

  console.log(`--- Starting tests for: ${solutionFn.name || 'Anonymous Function'} ---`);

  testCases.forEach(({ nums, expected }, index) => {
    const result = solutionFn([...nums]);
    const isMatch = sortSubsets(result) === sortSubsets(expected);

    console.log(`Test Case ${index + 1}: ${JSON.stringify(nums)}`);
    console.log(`Result: ${isMatch ? "PASSED" : "FAILED"}`);

    if (!isMatch) {
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(`  Got:      ${JSON.stringify(result)}`);
    }
    console.log('---------------------------');
  });
}

runTests(subsets3);