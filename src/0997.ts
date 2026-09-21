// 997. Find the Town Judge

// Example 1:
// Input: n = 2, trust = [[1,2]]
// Output: 2
// Example 2:
// Input: n = 3, trust = [[1,3],[2,3]]
// Output: 3
// Example 3:
// Input: n = 3, trust = [[1,3],[2,3],[3,1]]
// Output: -1

/**
 * Graph degree
 * T: O(V + E); S: O(V);
 */
function findJudge(n: number, trust: number[][]): number {
  // A judge will have:
  // - Incoming degree of n - 1
  // - Outgoing degree of 0
  // OR: delta = (incoming degree) - (outgoing degree) = n - 1

  // Edge case: only one person
  if (n === 1 && trust.length === 0) return 1

  const degreeDelta = new Array(n + 1).fill(0)

  for (const [x, y] of trust) {
    degreeDelta[x]-- // Outgoing
    degreeDelta[y]++ // Incoming
  }

  for (let i = 0; i <= n; i++) {
    if (degreeDelta[i] === n - 1) return i
  }

  return -1
};

type SolutionFunction = (n: number, trust: number[][]) => number

interface TestCase {
  n: number
  trust: number[][]
  expected: number
}

function runTests(solution: SolutionFunction): void {
  const testCases: TestCase[] = [
    {
      n: 2,
      trust: [[1, 2]],
      expected: 2
    },
    {
      n: 3,
      trust: [
        [1, 3],
        [2, 3]
      ],
      expected: 3
    },
    {
      n: 3,
      trust: [
        [1, 3],
        [2, 3],
        [3, 1]
      ],
      expected: -1
    },
    {
      n: 1,
      trust: [],
      expected: 1
    },
    {
      n: 4,
      trust: [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [4, 3]
      ],
      expected: 3
    }
  ]

  let passedCount = 0

  console.log('--- Running LeetCode 997 Tests ---\n')

  testCases.forEach((test, index) => {
    const result = solution(test.n, test.trust)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test ${index + 1}: PASSED`)
    } else {
      console.log(`❌ Test ${index + 1}: FAILED`)
      console.log(`   Input:    n = ${test.n}, trust = ${JSON.stringify(test.trust)}`)
      console.log(`   Expected: ${test.expected}`)
      console.log(`   Received: ${result}`)
    }
  })

  console.log(`\nSummary: ${passedCount} / ${testCases.length} test cases passed.`)
}

runTests(findJudge)
