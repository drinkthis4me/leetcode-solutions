// 297. Serialize and Deserialize Binary Tree

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

interface ICodec {
  serialize(root: TreeNode | null): string
  deserialize(data: string): TreeNode | null
}

/**
 * DFS (pre-order)
 * T: O(n); S: O(n);
 */
class Codec implements ICodec {
  /*
  * Encodes a tree to a single string.
  */
  serialize(root: TreeNode | null): string {
    const res: string[] = []
    this.dfsSerialize(root, res)
    return res.join(',')
  }
  dfsSerialize(node: TreeNode | null, res: string[]): void {
    if (node === null) {
      res.push('N')
      return
    }
    res.push(node.val.toString())
    this.dfsSerialize(node.left, res)
    this.dfsSerialize(node.right, res)
  }

  /*
  * Decodes your encoded data to tree.
  */
  deserialize(data: string): TreeNode | null {
    const values = data.split(',')
    const pointer = { i: 0 }
    return this.dfsDeserialize(values, pointer)
  }
  dfsDeserialize(values: string[], pointer: { i: number }): TreeNode | null {
    const curr = values[pointer.i]!
    if (curr === 'N') {
      pointer.i++
      return null
    }
    const node = new TreeNode(parseInt(curr, 10))
    pointer.i++
    node.left = this.dfsDeserialize(values, pointer)
    node.right = this.dfsDeserialize(values, pointer)
    return node
  }
}

/**
 * BFS (level-order)
 * T: O(n); S: O(n);
 */
class Codec2 implements ICodec {
  /*
  * Encodes a tree to a single string.
  */
  serialize(root: TreeNode | null): string {
    if (root === null) return 'N'
    const q = new Queue<TreeNode | null>([root])
    let res: (number | 'N')[] = []

    while (!q.isEmpty()) {
      const node = q.pop()!

      if (node === null) {
        res.push('N')
      } else {
        res.push(node.val)
        q.push(node.left)
        q.push(node.right)
      }
    }

    return res.join(',')
  }

  /*
  * Decodes your encoded data to tree.
  */
  deserialize(data: string): TreeNode | null {
    const values = data.split(',')

    if (values[0] === 'N') return null

    const root = new TreeNode(parseInt(values[0]!, 10))
    const q = new Queue([root])
    let i = 1 // Pointer to `values`

    while (!q.isEmpty()) {
      const node = q.pop()!

      if (values[i] !== 'N') {
        const leftNode = new TreeNode(parseInt(values[i]!, 10))
        node.left = leftNode
        q.push(leftNode)
      }
      i++

      if (values[i] !== 'N') {
        const rightNode = new TreeNode(parseInt(values[i]!, 10))
        node.right = rightNode
        q.push(rightNode)
      }
      i++
    }

    return root
  }
}

/**
 * Test Runner with automated iteration
 */
function runAllTests(CodecClass: new () => ICodec) {
  // Define an array of test scenarios
  const testCases: { name: string; root: TreeNode | null }[] = [
    {
      name: "Standard Tree [1,2,3,null,null,4,5]",
      root: new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)))
    },
    {
      name: "Empty Tree []",
      root: null
    },
    {
      name: "Single Node [1]",
      root: new TreeNode(1)
    },
    {
      name: "Left-Skewed Tree [1,2,null,3]",
      root: new TreeNode(1, new TreeNode(2, new TreeNode(3), null), null)
    },
    {
      name: "Tree with Negative Values [1,-2,3]",
      root: new TreeNode(1, new TreeNode(-2), new TreeNode(3))
    }
  ];

  /**
   * Utility to compare two trees for structural and value equality.
   */
  function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  console.log("--- Starting LeetCode 297 Test Suite ---\n");

  const codec = new CodecClass();
  testCases.forEach((tc) => {
    const serialized = codec.serialize(tc.root);
    const deserialized = codec.deserialize(serialized);

    const passed = isSameTree(tc.root, deserialized);

    console.log(`[${passed ? "PASSED" : "FAILED"}] ${tc.name}`);
    if (!passed) {
      console.log(`  Input:      ${JSON.stringify(tc.root)}`);
      console.log(`  Serialized: ${serialized}`);
    }
  });

  console.log("\n--- Testing Complete ---");
}

// Execute the suite
runAllTests(Codec2);