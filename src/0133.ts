// 133. Clone Graph

import { Queue } from '@datastructures-js/queue'

/**
  Definition for _Node.
 */
class _Node {
  val: number
  neighbors: _Node[]

  constructor(val?: number, neighbors?: _Node[]) {
    this.val = (val === undefined ? 0 : val)
    this.neighbors = (neighbors === undefined ? [] : neighbors)
  }
}

/**
 * DFS
 * T: O(n + e); S: O(n);
 * where e is the edges of graph
 */
function cloneGraph(node: _Node | null): _Node | null {
  if (node === null) return null

  const cloneNodes = new Map<number, _Node>()

  const dfs = (node: _Node): _Node => {
    if (cloneNodes.has(node.val)) {
      return cloneNodes.get(node.val)!
    }

    const curr = new _Node(node.val)
    cloneNodes.set(curr.val, curr)

    for (const neighbor of node.neighbors) {
      curr.neighbors.push(dfs(neighbor))
    }

    return curr
  }

  return dfs(node)
};

/**
 * BFS
 * T: O(n + e); S: O(n);
 */
function cloneGraph2(node: _Node | null): _Node | null {
  if (node === null) return null

  const cloneNodes = new Map<number, _Node>()
  cloneNodes.set(node.val, new _Node(node.val))

  const q = new Queue<_Node>([node])

  while (!q.isEmpty()) {
    const node = q.pop()!
    const clone = cloneNodes.get(node.val)!

    for (const neighbor of node.neighbors) {
      if (!cloneNodes.has(neighbor.val)) {
        cloneNodes.set(neighbor.val, new _Node(neighbor.val))
        q.push(neighbor)
      }
      clone.neighbors.push(cloneNodes.get(neighbor.val)!)
    }
  }

  return cloneNodes.get(node.val)!
};

/**
 * Test Runner
 */
function runTests(solution: (node: _Node | null) => _Node | null): void {
  // Helper function to convert an adjacency list to a graph (returns the first node)
  function createGraph(adjList: number[][]): _Node | null {
    if (adjList.length === 0) return null

    const nodes: Map<number, _Node> = new Map()

    // Create all nodes first
    for (let i = 1; i <= adjList.length; i++) {
      nodes.set(i, new _Node(i))
    }

    // Populate neighbors
    for (let i = 0; i < adjList.length; i++) {
      const currNode = nodes.get(i + 1)!
      for (const neighborVal of adjList[i]) {
        currNode.neighbors.push(nodes.get(neighborVal)!)
      }
    }

    return nodes.get(1)!
  }

  // Helper function to convert a graph back to an adjacency list for comparison
  function graphToAdjList(node: _Node | null): number[][] {
    if (!node) return []

    const visited: Map<number, _Node> = new Map()
    const queue: _Node[] = [node]
    visited.set(node.val, node)

    // BFS to collect all nodes
    while (queue.length > 0) {
      const curr = queue.shift()!
      for (const neighbor of curr.neighbors) {
        if (!visited.has(neighbor.val)) {
          visited.set(neighbor.val, neighbor)
          queue.push(neighbor)
        }
      }
    }

    const adjList: number[][] = []
    const sortedVals = Array.from(visited.keys()).sort((a, b) => a - b)

    for (const val of sortedVals) {
      const curr = visited.get(val)!
      const neighborVals = curr.neighbors.map(n => n.val).sort((a, b) => a - b)
      adjList.push(neighborVals)
    }

    return adjList
  }

  // Helper function to ensure deep cloning and that it's a separate memory reference
  function verifyDeepCopy(original: _Node | null, cloned: _Node | null): boolean {
    if (!original && !cloned) return true
    if (!original || !cloned) return false

    const originalVisited = new Set<_Node>()
    const clonedVisited = new Set<_Node>()

    const queue: [_Node, _Node][] = [[original, cloned]]
    originalVisited.add(original)
    clonedVisited.add(cloned)

    while (queue.length > 0) {
      const [origNode, cloneNode] = queue.shift()!

      // Ensure values match and they are different object references
      if (origNode.val !== cloneNode.val || origNode === cloneNode) {
        return false
      }

      if (origNode.neighbors.length !== cloneNode.neighbors.length) {
        return false
      }

      for (let i = 0; i < origNode.neighbors.length; i++) {
        const origNeighbor = origNode.neighbors[i]
        const cloneNeighbor = cloneNode.neighbors[i]

        // Ensure neighbors are also different object references
        if (origNeighbor === cloneNeighbor) {
          return false
        }

        if (!originalVisited.has(origNeighbor)) {
          originalVisited.add(origNeighbor)
          clonedVisited.add(cloneNeighbor)
          queue.push([origNeighbor, cloneNeighbor])
        }
      }
    }

    return true
  }

  const testCases: { id: number, input: number[][] }[] = [
    {
      id: 1,
      input: [[2, 4], [1, 3], [2, 4], [1, 3]]
    },
    {
      id: 2,
      input: [[]]
    },
    {
      id: 3,
      input: []
    },
    {
      id: 4,
      input: [[2], [1]]
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 133 Tests ===\n')

  for (const { id, input } of testCases) {
    const originalGraph = createGraph(input)
    const clonedGraph = solution(originalGraph)

    const isStructureValid = graphToAdjList(clonedGraph).toString() === input.toString()
    const isDeepCopy = verifyDeepCopy(originalGraph, clonedGraph)

    const passed = isStructureValid && isDeepCopy

    if (passed) {
      passedCount++
      console.log(`Test Case ${id}: PASSED`)
    } else {
      console.log(`Test Case ${id}: FAILED`)
      console.log('  - Input (Adj List):', input)
      console.log('  - Output (Adj List):', graphToAdjList(clonedGraph))
      console.log(`  - Valid Structure: ${isStructureValid}`)
      console.log(`  - Is Deep Copy: ${isDeepCopy}`)
    }
  }

  console.log(`\nResult: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(cloneGraph)
