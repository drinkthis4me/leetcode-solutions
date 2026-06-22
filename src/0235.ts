// 235. Lowest Common Ancestor of a Binary Search Tree

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
 * T: O(height); S: O(height);
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (root === null || p === null || q === null) return null

  // Base case: 
  //  - Current node is the split point of two nodes.
  // Recursion:
  //  - Both values are smaller than current value -> Both nodes are in left subtree.
  //  - Both values are larger than current value -> Both nodes are in right subtree.

  if (root.val > p.val && root.val > q.val) {
    // Check root.left
    return lowestCommonAncestor(root.left, p, q)
  }
  else if (root.val < p.val && root.val < p.val) {
    // Check root.right
    return lowestCommonAncestor(root.right, p, q)
  } else {
    // Current node is the LCA
    return root
  }
};

/**
 * Iteration
 * T: O(height); S: O(1);
 */
function lowestCommonAncestor2(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (root === null || p === null || q === null) return null

  // Manually traverse without recursion

  let curr: TreeNode | null = root

  while (curr !== null) {
    if (curr.val > p.val && curr.val > q.val) {
      curr = curr.left
    }
    else if (curr.val < p.val && curr.val < q.val) {
      curr = curr.right
    }
    else {
      return curr
    }
  }

  return null
};

// --- TEST RUNNER ---
interface TestCase {
  name: string;
  root: TreeNode | null;
  p: TreeNode;
  q: TreeNode;
  expected: number;
}

const testCases: TestCase[] = [
  {
    name: "Standard LCA in middle",
    root: new TreeNode(6, new TreeNode(2, new TreeNode(0), new TreeNode(4, new TreeNode(3), new TreeNode(5))), new TreeNode(8, new TreeNode(7), new TreeNode(9))),
    p: new TreeNode(2),
    q: new TreeNode(8),
    expected: 6
  },
  {
    name: "LCA is one of the nodes",
    root: new TreeNode(6, new TreeNode(2, new TreeNode(0), new TreeNode(4)), new TreeNode(8)),
    p: new TreeNode(2),
    q: new TreeNode(4),
    expected: 2
  }
];

function runTests() {
  testCases.forEach(({ name, root, p, q, expected }) => {
    const result = lowestCommonAncestor2(root, p, q);
    const passed = result?.val === expected;
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}`);
    if (!passed) console.log(`   Expected: ${expected}, Got: ${result?.val}`);
  });
}

runTests();