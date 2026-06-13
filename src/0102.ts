// 102. Binary Tree Level Order Traversal

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
 * BFS w/ Queue
 */
function levelOrder(root: TreeNode | null): number[][] {
  const res: number[][] = []

  if (root === null) return res

  // Queue that stores TreeNode-levelIndex pair
  const q = new Queue<TreeNode>()
  q.enqueue(root)

  while (q.size() > 0) {
    const currentLevel: number[] = []

    // Current level's length == Queue's length
    const n = q.size()
    for (let i = 0; i < n; i++) {
      const node = q.dequeue()!

      currentLevel.push(node.val)

      if (node.left) {
        q.enqueue(node.left)
      }
      if (node.right) {
        q.enqueue(node.right)
      }
    }

    res.push(currentLevel)
  }

  return res
};

/**
 * Builds a binary tree from a LeetCode-style array (level-order representation).
 */
function buildTree(array: (number | null)[]): TreeNode | null {
  if (array.length === 0 || array[0] === null) return null;

  const root = new TreeNode(array[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < array.length) {
    const current = queue.shift()!;

    // Process left child
    if (array[i] !== null && array[i] !== undefined) {
      current.left = new TreeNode(array[i]!);
      queue.push(current.left);
    }
    i++;

    // Process right child
    if (i < array.length && array[i] !== null && array[i] !== undefined) {
      current.right = new TreeNode(array[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

/**
 * Deep equality helper to verify if two 2D arrays match.
 */
function arraysEqual(a: number[][], b: number[][]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// Test Runner Suite

function runTests() {
  const testCases = [
    {
      name: "Standard balanced tree",
      input: [3, 9, 20, null, null, 15, 7],
      expected: [[3], [9, 20], [15, 7]]
    },
    {
      name: "Single node tree",
      input: [1],
      expected: [[1]]
    },
    {
      name: "Empty tree",
      input: [],
      expected: []
    },
    {
      name: "Unbalanced left-skewed tree",
      input: [1, 2, null, 3, null, 4],
      expected: [[1], [2], [3], [4]]
    }
  ];

  console.log("--- Running LeetCode 102 Tests ---");

  testCases.forEach((tc, index) => {
    const root = buildTree(tc.input);
    const actual = levelOrder(root);
    const passed = arraysEqual(actual, tc.expected);

    if (passed) {
      console.log(`✅ Test ${index + 1} Passed: ${tc.name}`);
    } else {
      console.error(`❌ Test ${index + 1} Failed: ${tc.name}`);
      console.error(`   Expected: ${JSON.stringify(tc.expected)}`);
      console.error(`   Actual:   ${JSON.stringify(actual)}`);
    }
  });
}

// Execute the tests
runTests();