// 144. Binary Tree Preorder Traversal

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
 * Recursion
 * T: O(n); S: O(height)
 */
function preorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = []

  const preorder = (node: TreeNode | null): void => {
    if (node === null) return

    // root - left - right
    res.push(node.val)
    preorder(node.left)
    preorder(node.right)
  }

  preorder(root)

  return res
};

/**
 * Stack
 * T: O(n); S: O(n)
 */
function preorderTraversal2(root: TreeNode | null): number[] {
  const res: number[] = []

  if (root === null) return res

  const stack: TreeNode[] = [root]

  while (stack.length > 0) {
    const top = stack.pop()!

    res.push(top.val)
    if (top.right) {
      stack.push(top.right)
    }
    if (top.left) {
      stack.push(top.left)
    }
  }

  return res
};

// Helper function to build a tree from a LeetCode-style array (Level Order)
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift()!;

    // Process left child
    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]!);
      queue.push(current.left);
    }
    i++;

    // Process right child
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

// Helper function to run and log test cases
function runTests() {
  const testCases = [
    {
      name: "LeetCode Example 1",
      input: [1, null, 2, 3],
      expected: [1, 2, 3]
    },
    {
      name: "Empty Tree (Your original edge case)",
      input: [],
      expected: []
    },
    {
      name: "Single Node Tree",
      input: [1],
      expected: [1]
    },
    {
      name: "Perfect Binary Tree",
      input: [1, 2, 3, 4, 5, 6, 7],
      expected: [1, 2, 4, 5, 3, 6, 7]
    }
  ];

  console.log("--- Running Preorder Traversal Tests ---\n");

  testCases.forEach(({ name, input, expected }) => {
    const tree = buildTree(input);
    const result = preorderTraversal2(tree);

    const passed = JSON.stringify(result) === JSON.stringify(expected);

    console.log(`Test: ${name}`);
    console.log(`Input Array:  ${JSON.stringify(input)}`);
    console.log(`Expected:     ${JSON.stringify(expected)}`);
    console.log(`Got:          ${JSON.stringify(result)}`);
    console.log(passed ? "✅ PASSED" : "❌ FAILED");
    console.log("---------------------------------------");
  });
}

// Execute the tester
runTests();