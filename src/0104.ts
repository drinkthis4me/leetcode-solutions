// 104. Maximum Depth of Binary Tree

import { Queue } from "@datastructures-js/queue"

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
 * BFS
 * T: O(n); S: O(height);
 */
function maxDepth(root: TreeNode | null): number {
  let depth = 0

  if (root === null) return depth

  const q = new Queue<TreeNode>([root])

  while (q.size() > 0) {
    depth++

    const n = q.size()
    for (let i = 0; i < n; i++) {
      const top = q.dequeue()!
      if (top.left) {
        q.enqueue(top.left)
      }
      if (top.right) {
        q.enqueue(top.right)
      }
    }
  }

  return depth
};

/**
 * DFS
 * T: O(n); S: O(w);
 */
function maxDepth2(root: TreeNode | null): number {
  if (root === null) return 0

  let max = 0
  // Stack to store TreeNode-depth pair
  const stack: [TreeNode, number][] = [[root, 1]]

  while (stack.length > 0) {
    const [node, depth] = stack.pop()!

    max = Math.max(max, depth)

    if (node.left !== null) {
      stack.push([node.left, depth + 1])
    }
    if (node.right !== null) {
      stack.push([node.right, depth + 1])
    }
  }

  return max
};

/**
 * Recursion Top-down
 * T: O(n); S: O(height);
 */
function maxDepth3(root: TreeNode | null): number {
  const findDepth = (node: TreeNode | null, depth: number): number => {
    // Base case: null and depth 0
    if (node === null) return depth

    return Math.max(
      findDepth(node.left, depth + 1),
      findDepth(node.right, depth + 1)
    )
  }

  // 
  return findDepth(root, 0)
};

/**
 * Recursion Bottom-up
 * T: O(n); S: O(height);
 */
function maxDepth4(root: TreeNode | null): number {
  if (root === null) return 0

  return Math.max(
    maxDepth4(root.left),
    maxDepth4(root.right)
  ) + 1 // Plus the current depth
};

function buildTree(array: (number | null)[]): TreeNode | null {
  if (array.length === 0 || array[0] === null) return null;

  const root = new TreeNode(array[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < array.length) {
    const current = queue.shift()!;

    // Left child
    if (i < array.length && array[i] !== null) {
      current.left = new TreeNode(array[i]!);
      queue.push(current.left);
    }
    i++;

    // Right child
    if (i < array.length && array[i] !== null) {
      current.right = new TreeNode(array[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

// 4. Test Runner
function runTests() {
  const testCases = [
    {
      input: [3, 9, 20, null, null, 15, 7],
      expected: 3,
      description: "Standard balanced tree"
    },
    {
      input: [1, null, 2],
      expected: 2,
      description: "Skewed tree (right child only)"
    },
    {
      input: [],
      expected: 0,
      description: "Empty tree"
    },
    {
      input: [0],
      expected: 1,
      description: "Single node tree"
    }
  ];

  console.log("--- Running LeetCode 104 Tests --- \n");

  testCases.forEach((tc, index) => {
    const tree = buildTree(tc.input);
    const result = maxDepth2(tree);
    const passed = result === tc.expected;

    console.log(`Test ${index + 1}: ${tc.description}`);
    console.log(`Input:    [${tc.input.join(", ")}]`);
    console.log(`Expected: ${tc.expected}`);
    console.log(`Result:   ${result}`);
    console.log(`Status:   ${passed ? "✅ PASSED" : "❌ FAILED"}`);
    console.log("-----------------------------------");
  });
}

// Execute the tests
runTests();