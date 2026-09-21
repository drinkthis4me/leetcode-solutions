// 332. Reconstruct Itinerary

// Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// Output: ["JFK","MUC","LHR","SFO","SJC"]
// Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]

/**
 * Backtrack (TLE)
 * T: O(E * V); S: O(E * V)
 */
function findItinerary(tickets: string[][]): string[] {
  // Map of (source, [target, visited][])
  const adj = new Map<string, [string, boolean][]>()

  for (const [u, v] of tickets) {
    if (!adj.has(u)) {
      adj.set(u, [])
    }
    adj.get(u)!.push([v, false])
  }
  for (const neighbor of adj.values()) {
    neighbor.sort((a, b) => a[0].localeCompare(b[0]))
  }

  // Backtrack
  const START = 'JFK'
  const res: string[] = [START]
  const dfs = (curr: string, count: number): boolean => {
    if (count === 0) return true

    for (const next of adj.get(curr) || []) {
      if (next[1]) continue

      res.push(next[0])
      next[1] = true

      const finished = dfs(next[0], count - 1)
      if (finished) return true

      res.pop()
      next[1] = false
    }

    return false
  }

  dfs(START, tickets.length)

  return res
};

/**
 * Hierholzer's Algorithm (Recursion)
 * T: O(E log E); S: O(E)
 */
function findItinerary2(tickets: string[][]): string[] {
  // Eulerian path -> Hierholzer's Algorithm

  // Map of (source, target[])
  const adj = new Map<string, string[]>()
  for (const [u, v] of tickets) {
    if (!adj.has(u)) {
      adj.set(u, [])
    }
    adj.get(u)!.push(v)
  }
  // Sort z to a, so we can correctly pop the next neighbor
  for (const neighbor of adj.values()) {
    neighbor.sort((a, b) => b.localeCompare(a))
  }

  const START = 'JFK'
  const res: string[] = []

  // DFS with post-order traversal
  const dfs = (curr: string) => {
    while (adj.has(curr) && adj.get(curr)!.length > 0) {
      const next = adj.get(curr)!.pop()!

      dfs(next)
    }

    res.push(curr)
  }

  dfs(START)

  return res.reverse()
};

/**
 * Hierholzer's Algorithm (Iteration)
 * T: O(E log E); S: O(E)
 */
function findItinerary3(tickets: string[][]): string[] {
  // Map of (source, target[])
  const adj = new Map<string, string[]>()
  for (const [u, v] of tickets) {
    if (!adj.has(u)) {
      adj.set(u, [])
    }
    adj.get(u)!.push(v)
  }
  // Sort z to a, so we can correctly pop the next neighbor
  for (const neighbor of adj.values()) {
    neighbor.sort((a, b) => b.localeCompare(a))
  }

  const START = 'JFK'
  const res: string[] = []
  const stack: string[] = [START]

  // Stack with post-order traversal
  while (stack.length > 0) {
    const curr = stack[stack.length - 1]
    const destinations = adj.get(curr)!

    if (destinations && destinations.length > 0) {
      // If the current node has out-going edges, take then next edge
      const next = destinations.pop()!
      stack.push(next)
    } else {
      // Dead end or all edges exhausted
      res.push(stack.pop()!)
    }
  }

  return res.reverse()
};

/**
 * Tester for LeetCode 332: Reconstruct Itinerary
 *
 * @param solve - The solution function to test, taking tickets as input and returning the itinerary.
 */
function runTests(solve: (tickets: string[][]) => string[]): void {
  // Define test cases with inputs and expected outputs
  const testCases: { id: number, tickets: string[][], expected: string[] }[] = [
    {
      id: 1,
      tickets: [
        ['MUC', 'LHR'],
        ['JFK', 'MUC'],
        ['SFO', 'SJC'],
        ['LHR', 'SFO']
      ],
      expected: ['JFK', 'MUC', 'LHR', 'SFO', 'SJC']
    },
    {
      id: 2,
      tickets: [
        ['JFK', 'SFO'],
        ['JFK', 'ATL'],
        ['SFO', 'ATL'],
        ['ATL', 'JFK'],
        ['ATL', 'SFO']
      ],
      expected: ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO']
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 332 Tests ===')

  for (const test of testCases) {
    try {
      // Make a deep copy of tickets to prevent mutation by the solution
      const ticketsCopy = test.tickets.map(ticket => [...ticket])
      const result = solve(ticketsCopy)

      // Compare result with expected
      const isMatch =
        result.length === test.expected.length &&
        result.every((val, idx) => val === test.expected[idx])

      if (isMatch) {
        console.log(`[PASS] Test Case ${test.id}`)
        passedCount++
      } else {
        console.log(`[FAIL] Test Case ${test.id}`)
        console.log(`  Expected: ${JSON.stringify(test.expected)}`)
        console.log(`  Received: ${JSON.stringify(result)}`)
      }
    } catch (error) {
      console.log(`[ERROR] Test Case ${test.id} threw an exception:`)
      console.error(error)
    }
  }

  console.log('==================================')
  console.log(`Summary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(findItinerary3)
