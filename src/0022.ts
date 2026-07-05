// 22. Generate Parentheses

/**
 * DFS & Append String
 * T: O(4 ^ n / (n ^ (1/2))); S: O(n);
 */
function generateParenthesis2(n: number): string[] {
  const res: string[] = []

  const dfs = (str: string, open: number, close: number) => {
    if (str.length === 2 * n) {
      res.push(str)
      return
    }

    if (open < n) {
      dfs(str + '(', open + 1, close)
    }

    if (open > close) {
      dfs(str + ')', open, close + 1)
    }
  }

  dfs('', 0, 0)

  return res
};

/**
 * Backtrack
 * T: O(4 ^ n / (n ^ (1/2))); S: O(n);
 */
function generateParenthesis(n: number): string[] {
  // Store option in an array to reduce memory usage

  const res: string[] = []
  const solution: string[] = []

  const backtrack = (open: number, close: number) => {
    if (solution.length === 2 * n) {
      res.push(solution.join(''))
      return
    }

    if (open < n) {
      solution.push('(')
      backtrack(open + 1, close)
      solution.pop()
    }

    if (open > close) {
      solution.push(')')
      backtrack(open, close + 1)
      solution.pop()
    }
  }

  backtrack(0, 0)

  return res
};

/**
 * DP (Bottom-up)
 * T/S: O(4 ^ n / (n ^ (1/2)));
 */
function generateParenthesis3(n: number): string[] {
  // n pairs: '(' + left + ')' + right
  // left is valid pairs with i count
  // right is valid pairs with j count
  // i + j = n - 1
  // i ranges from [0, n-1]

  // dp[i] will store all valid combinations for i pairs
  const dp: string[][] = Array.from({ length: n + 1 }, () => []);

  // Base case: 0 pairs is an empty string
  dp[0] = [""];

  for (let i = 1; i <= n; i++) {
    // To form i pairs, we fix one '(' and one ')'
    // This leaves i-1 pairs to be distributed between the two sets
    // i-1 = leftCount + rightCount
    for (let leftCount = 0; leftCount < i; leftCount++) {
      const rightCount = i - 1 - leftCount;

      const leftOptions = dp[leftCount];
      const rightOptions = dp[rightCount];

      for (const left of leftOptions) {
        for (const right of rightOptions) {
          dp[i].push(`(${left})${right}`);
        }
      }
    }
  }

  return dp[n];
}

/**
 * Tester for LeetCode 22: Generate Parentheses
 * @param fn The function to test (takes number n, returns string[])
 */
function runTests(fn: (n: number) => string[]) {
  const testCases = [
    { n: 1, expected: ["()"] },
    { n: 2, expected: ["(())", "()()"] },
    { n: 3, expected: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
    { n: 0, expected: [""] }
  ];

  console.log(`--- Testing function: ${fn.name || "anonymous"} ---`);

  testCases.forEach(({ n, expected }, index) => {
    const result = fn(n);

    // Sort both arrays to ensure order-independent comparison
    const sortedResult = [...result].sort();
    const sortedExpected = [...expected].sort();

    const passed = JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);

    if (passed) {
      console.log(`Test Case ${index + 1} (n=${n}): PASSED`);
    } else {
      console.error(`Test Case ${index + 1} (n=${n}): FAILED`);
      console.error(`  Expected: ${JSON.stringify(sortedExpected)}`);
      console.error(`  Received: ${JSON.stringify(sortedResult)}`);
    }
  });
  console.log("------------------------------------------\n");
}

runTests(generateParenthesis2);
