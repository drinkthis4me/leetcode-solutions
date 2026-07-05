// 77. Combinations

/**
 * Backtrack
 * T: O(n * C(n, k)); S: O(k);
 */
function combine(n: number, k: number): number[][] {
  const res: number[][] = []
  const solution: number[] = []

  const backtrack = (i: number) => {
    if (solution.length === k) {
      res.push([...solution])
      return
    }

    // Pruning: j <= n - (k - option.length) + 1
    // This stops the loop when there are not enough elements left to fill 'option'
    const remainingNeeded = k - solution.length;
    const end = n - remainingNeeded + 1;

    for (let j = i; j <= end; j++) {
      solution.push(j)

      backtrack(j + 1)

      solution.pop()
    }
  }

  backtrack(1)

  return res
};

/**
 * Backtrack w/ Fix-size Array
 * T: O(n * C(n, k)); S: O(k);
 */
function combine2(n: number, k: number): number[][] {
  // Iterate manually to avoid recursion overhead

  const res: number[][] = []
  const solution: number[] = new Array(k).fill(0)
  let i = 0

  while (i >= 0) {
    solution[i]++

    if (solution[i] > n) {
      // Backtrack
      i--
      continue
    }

    if (i === k - 1) {
      res.push([...solution])
    } else {
      i++
      solution[i] = solution[i - 1]
    }
  }

  return res
};


/**
 * Test Runner for LeetCode 77: Combinations
 * @param solutionFn - The function to test (n: number, k: number) => number[][]
 */
function runTests(solutionFn: (n: number, k: number) => number[][]) {
  const testCases = [
    { n: 4, k: 2, expected: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]] },
    { n: 1, k: 1, expected: [[1]] },
    { n: 4, k: 4, expected: [[1, 2, 3, 4]] },
    { n: 5, k: 1, expected: [[1], [2], [3], [4], [5]] }
  ];

  console.log(`--- Starting tests for: ${solutionFn.name || 'Solution'} ---`);

  testCases.forEach(({ n, k, expected }, index) => {
    const result = solutionFn(n, k);

    // Helper to normalize results for comparison (sort inner arrays and outer array)
    const normalize = (arr: number[][]) =>
      arr.map(sub => sub.sort((a, b) => a - b))
        .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const passed = JSON.stringify(normalize(result)) === JSON.stringify(normalize(expected));

    if (passed) {
      console.log(`Test Case ${index + 1}: PASSED (n=${n}, k=${k})`);
    } else {
      console.error(`Test Case ${index + 1}: FAILED (n=${n}, k=${k})`);
      console.error(`  Expected: ${JSON.stringify(expected)}`);
      console.error(`  Received: ${JSON.stringify(result)}`);
    }
  });

  console.log('--- Tests Complete ---\n');
}

runTests(combine2);
