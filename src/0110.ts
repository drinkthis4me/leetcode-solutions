// 110. Balanced Binary Tree

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
 * T: O(n); S: O(height) 
 */
function isBalanced(root: TreeNode | null): boolean {

  // Recursion fn
  //  - If balanced, return max tree height.
  //  - Else return -1
  const dfs = (node: TreeNode | null): number => {
    if (node === null) return 0

    const leftHeight = dfs(node.left)
    if (leftHeight === -1) return -1 // Left subtree is already unbalanced

    const rightHeight = dfs(node.right)
    if (rightHeight === -1) return -1 // Right subtree is already unbalanced

    const diff = Math.abs(leftHeight - rightHeight)
    if (diff > 1) return -1  // Check balance for this node

    return Math.max(leftHeight, rightHeight) + 1
  }

  return dfs(root) !== -1
};

/**
 * DFS w/ Stack
 * T: O(n); S: O(n) 
 */
function isBalanced2(root: TreeNode | null): boolean {
  if (root === null) return true

  // Map to store max subtree height
  const map = new Map<TreeNode | null, number>()
  const stack: TreeNode[] = []
  let curr: TreeNode | null = root
  let lastVisited: TreeNode | null = null

  // Process nodes in post-order (bottom-up)
  while (curr !== null || stack.length > 0) {
    // Traverse as left as possible
    if (curr !== null) {
      stack.push(curr)
      curr = curr.left
    } else {
      // Peak the top. Only pop when children are processed.
      let node = stack.at(-1)!;

      if (node.right !== null && node.right !== lastVisited) {
        // Traverse to unvisited right child
        curr = node.right
      } else {
        // Both children are processed
        node = stack.pop()!;

        // Check balance condition
        const leftH = map.get(node.left) ?? 0
        const rightH = map.get(node.right) ?? 0

        if (
          leftH === -1 ||
          rightH === -1 ||
          Math.abs(leftH - rightH) > 1
        ) {
          map.set(node, -1)
        } else {
          map.set(node, Math.max(leftH, rightH) + 1)
        }

        // Mark node as visited
        lastVisited = node
      }
    }
  }

  return map.get(root) !== -1;
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
  input: (number | null)[];
  expected: boolean;
  description: string;
}

// --- TEST SUITE ---
const testCases: TestCase[] = [
  {
    input: [],
    expected: true,
    description: "Empty Tree"
  },
  {
    input: [1],
    expected: true,
    description: "Single Node"
  },
  {
    input: [1, 2, 2, 3, 3, 3, 3],
    expected: true,
    description: "Perfectly Balanced"
  },
  {
    input: [1, 2, 3, 4, 5],
    expected: true,
    description: "Slightly Unbalanced"
  },
  {
    input: [1, 2, null, 3, null, 4, null],
    expected: false,
    description: "Unbalanced (Root)"
  },
  {
    input: [1, 2, null, 3, null, 4],
    expected: false,
    description: "Skewed Tree"
  },
  {
    input: [1, 2, 3, 4, null, null, 5],
    expected: true,
    description: "Balanced Deep Tree"
  },
];

function runTests() {
  console.log("=== Running LeetCode 543 Tester ===\n");
  let passedCount = 0;

  testCases.forEach((tc, index) => {
    const tree = buildTree(tc.input);
    const result = isBalanced2(tree);
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