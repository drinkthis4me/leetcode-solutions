// 124. Binary Tree Maximum Path Sum

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

// Brute force: For every node, total sum = sum(node.val + Max left path sum + Max right path sum)  

/**
 * DFS
 * T: O(n); S: O(n);
 */
function maxPathSum(root: TreeNode | null): number {
  // Global max so far 
  // (start with -Inf for single tree node with negative value)
  let max = -Infinity

  const dfs = (node: TreeNode | null): number => {
    // Base case
    if (node === null) return 0

    const leftSum = Math.max(dfs(node.left), 0)
    const rightSum = Math.max(dfs(node.right), 0)

    // Case 1: Max path when current node is the top.
    // Update global max: current node + both branches
    max = Math.max(max, node.val + leftSum + rightSum)

    // Case 2: Max path is through this node.
    // Return to parent the best branch (left path, right path, or none)
    return node.val + Math.max(leftSum, rightSum, 0)
  }

  dfs(root)

  return max
};

// --- Helper ---
function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (!nodes.length) return null;
  const root = new TreeNode(nodes[0] as number);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < nodes.length) {
    const curr = queue.shift()!;
    if (nodes[i] !== null) {
      curr.left = new TreeNode(nodes[i] as number);
      queue.push(curr.left);
    }
    i++;
    if (i < nodes.length && nodes[i] !== null) {
      curr.right = new TreeNode(nodes[i] as number);
      queue.push(curr.right);
    }
    i++;
  }
  return root;
}

// --- The Test Suite ---
function runTests(maxPathSumFn: (root: TreeNode | null) => number) {
  const testCases = [
    { input: [1, 2, 3], expected: 6 },
    { input: [-10, 9, 20, null, null, 15, 7], expected: 42 },
    { input: [1, -2, 3], expected: 4 },
    { input: [-3], expected: -3 },
    { input: [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], expected: 48 }
  ];

  testCases.forEach(({ input, expected }, index) => {
    const root = buildTree(input);
    const result = maxPathSumFn(root);
    console.log(`Test ${index + 1}: ${result === expected ? "PASSED" : "FAILED"}`);
    if (result !== expected) {
      console.log(`   Expected ${expected}, but got ${result}`);
    }
  });
}

runTests(maxPathSum)