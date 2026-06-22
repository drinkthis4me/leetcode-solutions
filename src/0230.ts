// 230. Kth Smallest Element in a BST

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
 * T: O(n); S: O(n);
 */
function kthSmallest(root: TreeNode | null, k: number): number {
  let res = root?.val || -1

  // In-order traversal to find the values in order
  const dfs = (node: TreeNode | null): void => {
    // Base case
    if (node === null) return

    // Go left
    dfs(node.left)

    // Check root
    k--
    if (k === 0) {
      // Result found
      res = node.val
      return
    }

    // Go right
    dfs(node.right)
  }

  dfs(root)

  return res
};

/**
 * DFS w/ Stack
 * T: O(n); S: O(n);
 */
function kthSmallest2(root: TreeNode | null, k: number): number {
  if (root === null) return -1

  const stack: TreeNode[] = []
  let curr: TreeNode | null = root

  while (stack.length > 0 || curr !== null) {
    // Go left
    while (curr !== null) {
      stack.push(curr)
      curr = curr.left
    }

    // Check current root
    curr = stack.pop()!
    k--
    if (k === 0) {
      // Found
      return curr.val
    }

    // Go right    
    curr = curr.right
  }

  return -1
};

/**
 * Morris Traversal
 * T: O(n); S: O(1);
 */
function kthSmallest3(root: TreeNode | null, k: number): number {
  let curr: TreeNode | null = root

  // Morris Traversal visits nodes in-order and with O(1) space

  while (curr !== null) {
    if (curr.left === null) {
      // Check left child
      k--
      if (k === 0) return curr.val
      // Go right
      curr = curr.right
    } else {
      // Find the in-order predecessor 
      // In the left subtree, go as right as possible.
      let pre = curr.left
      while (pre.right !== null && pre.right !== curr) {
        pre = pre.right
      }

      if (pre.right === null) {
        // New left subtree: create thread

        pre.right = curr // Make it the new top of the tree
        curr = curr.left // Move to the new top
      } else {
        // Thread already exists
        // Remove thread. (Restore the tree structure.)
        pre.right = null
        k--
        if (k === 0) return curr.val
        curr = curr.right
      }
    }
  }

  return -1
};

// --- Helper ---
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0] as number);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < arr.length) {
    const curr = queue.shift()!;
    if (i < arr.length && arr[i] !== null) {
      curr.left = new TreeNode(arr[i] as number);
      queue.push(curr.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      curr.right = new TreeNode(arr[i] as number);
      queue.push(curr.right);
    }
    i++;
  }
  return root;
}

// --- Tester ---
function runTests() {
  const testCases = [
    { root: [3, 1, 4, null, 2], k: 1, expected: 1 },
    { root: [5, 3, 6, 2, 4, null, null, 1], k: 3, expected: 3 }
  ];

  testCases.forEach(({ root, k, expected }, index) => {
    const treeRoot = buildTree(root);
    const result = kthSmallest3(treeRoot, k);

    if (result === expected) {
      console.log(`Test Case ${index + 1}: PASSED`);
    } else {
      console.error(
        `Test Case ${index + 1}: FAILED. Expected ${expected}, got ${result}`
      );
    }
  });
}

runTests();