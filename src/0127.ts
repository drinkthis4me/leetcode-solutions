// 127. Word Ladder

import { Queue } from '@datastructures-js/queue'

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5
// Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.

/**
 * Graph & BFS
 * T: O(n * m^2); S: O(n * m^2);
 * Where n is the length of wordList, m is word length.
 */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  // Treat each word in wordList as graph node.
  // Build an adjacency list for nodes.
  // BFS to find the shortest path.

  // Edge case: endWord not in wordList
  const wordSet = new Set(wordList)
  if (!wordSet.has(endWord)) return 0

  // Breakdown a word into patterns
  // 'ab' -> ['*b', 'a*']
  const getPatterns = (s: string): string[] => {
    const chars = s.split('')
    const res: string[] = []

    for (let i = 0; i < s.length; i++) {
      const temp = chars[i]
      chars[i] = '*'
      res.push(chars.join(''))
      chars[i] = temp
    }

    return res
  }

  // Build the adjacency list
  // Two nodes are adjacent if they share a same pattern
  const adj = new Map<string, string[]>()
  for (const word of wordSet) {
    const patterns = getPatterns(word)

    for (const pattern of patterns) {
      if (!adj.has(pattern)) {
        adj.set(pattern, [])
      }
      adj.get(pattern)!.push(word)
    }
  }

  const visited = new Set<string>([beginWord])
  const q = new Queue<string>([beginWord])
  let res = 1
  while (!q.isEmpty()) {
    const size = q.size()

    for (let i = 0; i < size; i++) {
      const word = q.pop()!

      if (word === endWord) return res

      const patterns = getPatterns(word)
      for (const pattern of patterns) {
        for (const neighbor of (adj.get(pattern) || [])) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            q.push(neighbor)
          }
        }
      }
    }

    res++
  }

  // Cannot find endWord
  return 0
};

/**
 * Bidirectional BFS
 * T: O(n * m^2); S: O(n * m^2);
 */
function ladderLength2(beginWord: string, endWord: string, wordList: string[]): number {
  // BFS from start and end to reduce visited nodes (b^d vs. b^(d/2)+b^(d/2))

  const wordSet = new Set(wordList)
  if (!wordSet.has(endWord)) return 0

  const getPatterns = (s: string): string[] => {
    const chars = s.split('')
    const res: string[] = []

    for (let i = 0; i < s.length; i++) {
      const temp = chars[i]
      chars[i] = '*'
      res.push(chars.join(''))
      chars[i] = temp
    }

    return res
  }

  const adj = new Map<string, string[]>()
  for (const word of wordSet) {
    for (const pattern of getPatterns(word)) {
      if (!adj.has(pattern)) {
        adj.set(pattern, [])
      }
      adj.get(pattern)!.push(word)
    }
  }

  let qBegin = new Queue<string>([beginWord])
  let qEnd = new Queue<string>([endWord])

  // Map of (visitedWord, steps)
  let visitedBegin = new Map<string, number>([[beginWord, 1]])
  let visitedEnd = new Map<string, number>([[endWord, 1]])

  while (!qBegin.isEmpty() && !qBegin.isEmpty()) {
    // Always expand the smaller queue to optimize search space
    // and prevent overshot
    if (qBegin.size() > qEnd.size()) {
      [qBegin, qEnd] = [qEnd, qBegin];
      [visitedBegin, visitedEnd] = [visitedEnd, visitedBegin]
    }

    const size = qBegin.size()
    for (let i = 0; i < size; i++) {
      const word = qBegin.pop()!
      const steps = visitedBegin.get(word)!

      for (const pattern of getPatterns(word)) {
        for (const neighbor of (adj.get(pattern) || [])) {
          // Check match
          if (visitedEnd.has(neighbor)) {
            return steps + visitedEnd.get(neighbor)!
          }

          // Explore neighbors
          if (!visitedBegin.has(neighbor)) {
            visitedBegin.set(neighbor, steps + 1)
            qBegin.push(neighbor)
          }
        }
      }
    }
  }

  return 0
}

/**
 * Bidirectional BFS
 * T: O(n * m^2); S: O(n * m^2);
 */
function ladderLength3(beginWord: string, endWord: string, wordList: string[]): number {
  // Loop through a-z at the wildcard position

  const wordSet = new Set(wordList)
  if (!wordSet.has(endWord)) return 0

  // Set as queue's layer
  let beginSet = new Set<string>([beginWord])
  let endSet = new Set<string>([endWord])
  const visited = new Set<string>()
  let res = 1

  while (beginSet.size !== 0 && endSet.size !== 0) {
    // Always explore the smaller set
    if (beginSet.size > endSet.size) {
      [beginSet, endSet] = [endSet, beginSet]
    }

    // Set of new words for the next layer
    const tempSet = new Set<string>()

    // BFS with the current layer
    for (const word of beginSet) {
      const chars = word.split('')

      // Generate candidates for each word
      // For each character, replace with a-z
      for (let i = 0; i < chars.length; i++) {
        for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
          const oldChar = chars[i]
          chars[i] = String.fromCharCode(c)
          const target = chars.join('')

          // Check match from the end
          if (endSet.has(target)) {
            return res + 1
          }

          // Add valid candidate to visited set and the new layer set
          if (!visited.has(target) && wordSet.has(target)) {
            tempSet.add(target)
            visited.add(target)
          }

          chars[i] = oldChar
        }
      }
    }

    // Overwrite old words with new words and move on to the next layer
    beginSet = tempSet
    res++
  }

  return 0
}

/**
 * Tester for LeetCode 127: Word Ladder
 * @param solutionFn - The function implementing the Word Ladder logic.
 */
function runTests(solutionFn: (beginWord: string, endWord: string, wordList: string[]) => number): void {
  const testCases = [
    {
      id: 1,
      beginWord: 'hit',
      endWord: 'cog',
      wordList: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'],
      expected: 5
    },
    {
      id: 2,
      beginWord: 'hit',
      endWord: 'cog',
      wordList: ['hot', 'dot', 'dog', 'lot', 'log'],
      expected: 0
    },
    {
      id: 3,
      beginWord: 'a',
      endWord: 'c',
      wordList: ['a', 'b', 'c'],
      expected: 2
    },
    {
      id: 4,
      beginWord: 'hot',
      endWord: 'dog',
      wordList: ['hot', 'dog'],
      expected: 0
    }
  ]

  let passedCount = 0

  console.log('=== Running Tests for LeetCode 127: Word Ladder ===\n')

  for (const test of testCases) {
    const { id, beginWord, endWord, wordList, expected } = test

    // Measure execution time
    const startTime = performance.now()
    const result = solutionFn(beginWord, endWord, [...wordList]) // Pass a copy to prevent mutation
    const endTime = performance.now()
    const duration = (endTime - startTime).toFixed(3)

    const passed = result === expected
    if (passed) {
      passedCount++
    }

    console.log(`Test Case ${id}: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`  - Begin Word: "${beginWord}"`)
    console.log(`  - End Word:   "${endWord}"`)
    console.log(`  - Word List:  [${wordList.map(w => `"${w}"`).join(', ')}]`)
    console.log(`  - Expected:   ${expected}`)
    console.log(`  - Received:   ${result}`)
    console.log(`  - Time:       ${duration} ms`)
    console.log('-'.repeat(50))
  }

  console.log(`\nResult: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(ladderLength3)
