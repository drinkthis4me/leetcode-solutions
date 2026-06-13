// 94. Binary Tree Inorder Traversal

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
function inorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = []

  // Order: left-root-right
  const inorder = (node: TreeNode | null) => {
    if (node === null) return

    inorder(node.left)
    res.push(node.val)
    inorder(node.right)
  }

  inorder(root)

  return res
};

/**
 * Stack
 * T: O(n); S: O(n)
 */
function inorderTraversal2(root: TreeNode | null): number[] {
  const res: number[] = []

  // Edge case
  if (!root) return res

  const stack: TreeNode[] = []
  let curr: TreeNode | null = root

  while (stack.length !== 0 || curr !== null) {
    // Visit left
    while (curr !== null) {
      // Store root
      stack.push(curr)
      curr = curr.left
    }

    // Get value
    curr = stack.pop()!
    res.push(curr.val)

    // Visit right
    curr = curr.right
  }

  return res
};

/**
 * Morris Traversal (Threaded Binary Tree)
 * T: O(n); S: O(1)
 */
function inorderTraversal3(root: TreeNode | null): number[] {
  // 1. curr as root
  // 2. While curr is not null
  //    - If no left child
  //        - Add curr
  //        - Go to right
  //    - Else
  //        - In the left sub tree, make curr as the rightmost child
  //        - Got to left

  // ## Start
  //       1 (root)
  //     /   \
  //    2     3
  //   / \   /
  //  4   5 6

  // ## Left child exist
  //    2 (2. new root)
  //   / \
  //  4   5
  //       \
  //        1 (1. root as left subtree's rightmost child)
  //         \
  //          3
  //         /
  //        6

  // ## No left child. Add value
  // 4 (2. New root. No left child. Add value 4 and go right. Repeat for 2, 5, 1)
  //  \
  //   2 (1. root as left subtree's rightmost child)
  //    \
  //     5
  //      \
  //       1
  //        \
  //         3
  //        /
  //       6

  const res: number[] = []
  let curr: TreeNode | null = root
  let pre: TreeNode | null

  while (curr != null) {
    if (curr.left == null) {
      res.push(curr.val);
      curr = curr.right; // move to next right node
    } else {
      pre = curr.left;
      while (pre.right != null && pre.right !== curr) { // find rightmost
        pre = pre.right;
      }

      if (pre.right === null) {
        // establish a link back to the current node
        pre.right = curr;
        curr = curr.left;
      } else {
        // restore the tree structure
        pre.right = null;
        res.push(curr.val);
        curr = curr.right;
      }
    }
  }

  return res;
};

// Helper function to build a binary tree from a LeetCode-style array
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

// Helper function to run and log test cases
function runTest(testId: number, input: (number | null)[], expected: number[]) {
  const root = buildTree(input);
  const result = inorderTraversal3(root);

  const passed = JSON.stringify(result) === JSON.stringify(expected);

  console.log(`Test Case ${testId}: ${passed ? "✅ PASSED" : "❌ FAILED"}`);
  if (!passed) {
    console.log(`   Input:    ${JSON.stringify(input)}`);
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Got:      ${JSON.stringify(result)}`);
  }
}

// --- TEST SUITE ---
console.log("Running LeetCode 94 Tester...");
console.log("----------------------------");

// Test 1: Standard case from LeetCode
runTest(1, [1, null, 2, 3], [1, 3, 2]);

// Test 2: Empty tree
runTest(2, [], []);

// Test 3: Single node
runTest(3, [1], [1]);

// Test 4: Full balanced tree
runTest(4, [1, 2, 3, 4, 5, 6, 7], [4, 2, 5, 1, 6, 3, 7]);

// Test 5: Left-skewed tree
runTest(5, [3, 2, null, 1], [1, 2, 3]);