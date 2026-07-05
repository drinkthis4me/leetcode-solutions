// 46. Permutations

/**
 * Backtrack
 * T: O(n * n!); S: O(n * n!) 
 */
function permute(nums: number[]): number[][] {
  const n = nums.length
  const picked = new Array(n).fill(false)
  const res: number[][] = []
  const solution: number[] = []

  const backtrack = () => {
    if (solution.length === n) {
      res.push([...solution])
      return
    }

    // Permutation doesn't count [1, 2] [2, 1] as duplicate
    // Need to check every element
    for (let i = 0; i < n; i++) {
      if (picked[i]) continue

      solution.push(nums[i])
      picked[i] = true

      backtrack()

      solution.pop()
      picked[i] = false
    }
  }

  backtrack()

  return res
};

/**
 * Backtrack w/ Bit Mask
 * T: O(n * n!); S: O(n * n!) 
 */
function permute2(nums: number[]): number[][] {
  const n = nums.length
  const res: number[][] = []
  const solution: number[] = []

  // Pass the updated mask as param
  const backtrack = (mask: number) => {
    if (solution.length === n) {
      res.push([...solution])
      return
    }

    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) continue

      solution.push(nums[i])

      backtrack(mask | (1 << i))

      solution.pop()
    }
  }

  backtrack(0)

  return res
};

/**
 * Backtrack w/ Swap In-place
 * T: O(n * n!); S: O(n) 
 */
function permute3(nums: number[]): number[][] {
  const n = nums.length
  const res: number[][] = []

  // Swap at i with every other number
  // [1, 2, 3]
  // backtrack(0)
  // [1, 2, 3] -> 1 is fixed in backtrack(1)
  // [2, 1, 3] -> 2 is fixed in backtrack(1)
  // [3, 2, 1] -> 2 is fixed in backtrack(1)

  const backtrack = (i: number) => {
    if (i === n) {
      res.push([...nums])
      return
    }

    for (let j = i; j < n; j++) {
      [nums[j], nums[i]] = [nums[i], nums[j]];

      backtrack(i + 1);

      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }

  backtrack(0)

  return res
};

/**
 * Tester for LeetCode 46: Permutations
 * @param solution The function to test (number[]) => number[][]
 */
function runTests(solution: (nums: number[]) => number[][]) {
  const testCases = [
    { input: [1, 2, 3], expectedCount: 6 },
    { input: [0, 1], expectedCount: 2 },
    { input: [1], expectedCount: 1 },
    { input: [], expectedCount: 1 } // Permutation of empty is [[]]
  ];

  /**
* Validates if the result contains all unique permutations
*/
  function validatePermutations(input: number[], result: number[][], expectedCount: number): boolean {
    if (result.length !== expectedCount) return false;

    const seen = new Set<string>();
    for (const p of result) {
      if (p.length !== input.length) return false;

      // Check if all elements in p are present in input (basic constraint check)
      const sortedP = [...p].sort((a, b) => a - b);
      const sortedInput = [...input].sort((a, b) => a - b);

      for (let i = 0; i < sortedP.length; i++) {
        if (sortedP[i] !== sortedInput[i]) return false;
      }

      seen.add(p.join(","));
    }

    return seen.size === expectedCount;
  }


  console.log(`--- Testing: ${solution.name || "Anonymous Function"} ---`);

  testCases.forEach(({ input, expectedCount }, index) => {
    const result = solution([...input]);

    // Validation logic
    const passed = validatePermutations(input, result, expectedCount);

    console.log(`Test Case ${index + 1}: Input [${input}]`);
    console.log(`  Expected ${expectedCount} permutations, got ${result.length}`);
    console.log(`  Status: ${passed ? "PASSED" : "FAILED"}`);
    if (!passed) {
      console.log(`  Result: ${JSON.stringify(result)}`);
    }
  });
  console.log("------------------------------------------\n");
}

runTests(permute3);
