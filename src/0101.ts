// 101. Symmetric Tree

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
 * Recursion
 * T: O(n); S: O(height);
 */
function isSymmetric(root: TreeNode | null): boolean {
  if (root === null) return true

  const check = (n1: TreeNode | null, n2: TreeNode | null): boolean => {
    // Base case
    if (n1 === null && n2 === null) return true
    if (n1 === null || n2 === null) return false
    if (n1.val !== n2.val) return false

    return check(n1.left, n2.right) && check(n1.right, n2.left)
  }

  return check(root.left, root.right)
};

/**
 * Iteration: BFS w/ queue
 * T: O(n); S: O(width);
 */
function isSymmetric2(root: TreeNode | null): boolean {
  if (root === null) return true

  const q = new Queue<TreeNode | null>([root.left, root.right])

  while (q.size() > 0) {
    // Get top 2 and compare
    const n1 = q.dequeue()!
    const n2 = q.dequeue()!

    if (n1 === null && n2 === null) continue
    if (n1 === null || n2 === null) return false
    if (n1.val !== n2.val) return false

    // Enqueue children
    // (first pair)
    q.enqueue(n1.left)
    q.enqueue(n2.right)
    // (second pair)
    q.enqueue(n1.right)
    q.enqueue(n2.left)
  }

  return true
};

// --- Test Helper ---
function createTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const curr = queue.shift()!;

    // Left child
    if (arr[i] !== null) {
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

// --- Tester Runner ---
function runTests() {
  const testCases = [
    {
      name: "Symmetric Tree",
      array: [1, 2, 2, 3, 4, 4, 3],
      expected: true
    },
    {
      name: "Asymmetric Tree (Values mismatch)",
      array: [1, 2, 2, null, 3, null, 3],
      expected: false
    },
    {
      name: "Empty Tree",
      array: [],
      expected: true
    },
    {
      name: "Single Node Tree",
      array: [1],
      expected: true
    },
    {
      name: "Asymmetric Outer Subtrees",
      array: [1, 2, 2, 3, null, null, 4],
      expected: false
    }
  ];

  console.log("=== RUNNING LEETCODE 101 TESTS ===\n");

  testCases.forEach((tc, idx) => {
    const treeRootRecursive = createTree(tc.array);

    const result = isSymmetric2(treeRootRecursive);

    const resultPassed = result === tc.expected;

    console.log(`Test Case #${idx + 1}: ${tc.name}`);
    console.log(`Input Array: [${tc.array.join(", ")}]`);
    console.log(`Result: ${result} (${resultPassed ? "PASSED" : "FAILED"})`);
    console.log("---------------------------------------");
  });
}

runTests();