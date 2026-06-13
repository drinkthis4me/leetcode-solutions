// 100. Same Tree

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

/**
 * DFS w/ Recursion
 * T: O(n); S: O(n) 
 */
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true

  if (p === null || q === null || p.val !== q.val) return false

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};

/**
 * DFS w/ Stack
 * T: O(n); S: O(n) 
 */
function isSameTree2(p: TreeNode | null, q: TreeNode | null): boolean {
  const stack: (TreeNode | null)[][] = [[p, q]]

  while (stack.length > 0) {
    const [n1, n2] = stack.pop()!;

    if (n1 === null && n2 === null) continue

    if (n1 === null || n2 === null) return false

    if (n1!.val !== n2!.val) return false

    stack.push([n1!.left, n2!.left])
    stack.push([n1!.right, n2!.right])
  }

  return true
};

/**
 * Builds a binary tree from a LeetCode array representation (level-order).
 */
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift()!;

    // Left child
    if (i < arr.length && arr[i] !== null) {
      curr.left = new TreeNode(arr[i]!);
      queue.push(curr.left);
    }
    i++;

    // Right child
    if (i < arr.length && arr[i] !== null) {
      curr.right = new TreeNode(arr[i]!);
      queue.push(curr.right);
    }
    i++;
  }

  return root;
}

interface TestCase {
  input: {
    p: (number | null)[]
    q: (number | null)[]
  };
  expected: boolean;
  description: string;
}

// --- TEST SUITE ---
const testCases: TestCase[] = [
  {
    input: { p: [1, 2, 3], q: [1, 2, 3] },
    expected: true,
    description: "Same Tree"
  },
  {
    input: { p: [1, 2], q: [1, null, 2] },
    expected: false,
    description: "Diff Tree Nodes"
  },
  {
    input: { p: [1, 2, 1], q: [1, 1, 2] },
    expected: false,
    description: "Tree With Diff Values"
  },
]

function runTests() {
  console.log("=== Running LeetCode 543 Tester ===\n");
  let passedCount = 0;

  testCases.forEach((tc, index) => {
    const p = buildTree(tc.input.p);
    const q = buildTree(tc.input.q);
    const result = isSameTree2(p, q);
    const passed = result === tc.expected;

    if (passed) {
      passedCount++;
      console.log(`✅ Test ${index + 1} Passed: ${tc.description}`);
    } else {
      console.log(`❌ Test ${index + 1} Failed: ${tc.description}`);
      console.log(`   Input array:  ${JSON.stringify(tc.input)}`);
      console.log(`   Expected:     ${tc.expected}`);
      console.log(`   Got:          ${result}\n`);
    }
  });

  console.log(`\n=== Results: ${passedCount}/${testCases.length} Passed ===`);
}

// Execute the tests
runTests();