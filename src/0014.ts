// 14. Longest Common Prefix

// Input: strs = ["flower","flow","flight"]
// Output: "fl"

// Input: strs = ["dog","racecar","car"]
// Output: ""

/**
 * Horizontal Scanning
 * T: O(m * n); S: O(1);
 */
function longestCommonPrefix(strs: string[]): string {
  // Edge case
  if (!strs || strs.length === 0) return ''

  let prefix = strs[0]

  for (let i = 1; i < strs.length; i++) {
    // While the current string does NOT start with the prefix, shorten it
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1)

      // Optimization: if prefix becomes empty, no common prefix exists
      if (prefix === '') return ''
    }
  }

  return prefix
};

/**
 * Vertical Scanning
 * T: O(m * n); S: O(1);
 */
function longestCommonPrefix2(strs: string[]): string {
  // Edge case
  if (!strs || strs.length === 0) return ''

  // Comparing every string's character at index i against the first string
  const first = strs[0]
  for (let i = 0; i < first.length; i++) {
    const char = first[i]

    for (let j = 1; j < strs.length; j++) {
      // Stop if shorter string or mismatch found
      if (i === strs[j].length || strs[j][i] !== char) {
        return first.slice(0, i)
      }
    }
  }

  // Complete the checks
  // The first string is the longest common prefix
  return first
};

/**
 * Sorting
 * T: O(mn * log m); S: O(1);
 */
function longestCommonPrefix3(strs: string[]): string {
  // Edge case
  if (!strs || strs.length === 0) return ''

  strs.sort()

  const first = strs[0]
  const last = strs[strs.length - 1]
  const minLength = Math.min(first.length, last.length)

  for (let i = 0; i < minLength; i++) {
    if (first[i] !== last[i]) {
      return first.slice(0, i)
    }
  }

  return first
};

/**
 * Trie
 * T: O(mn); S: O(n);
 */
function longestCommonPrefix4(strs: string[]): string {
  // Edge case
  if (!strs || strs.length === 0) return ''

  class TrieNode {
    children: Map<string, TrieNode> = new Map()
    isEnd: boolean = false
  }

  // Build the Trie
  const root = new TrieNode()
  for (const str of strs) {
    let curr = root
    for (const char of str) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode())
      }
      curr = curr.children.get(char)!
    }
    curr.isEnd = true
  }

  // Find the longest common prefix in trie
  let prefix = ''
  let currNode = root
  while (true) {
    // Stop if words diverge or reach end of word
    if (currNode.children.size !== 1 || currNode.isEnd) {
      break
    }

    // Grab the first (and in this case, only) [key, value] pair from map
    for (const [c, node] of currNode.children) {
      prefix += c
      currNode = node
      break
    }
  }

  return prefix
};

interface TestCase {
  input: string[]
  expected: string
}

function runTests(solution: (strs: string[]) => string): void {
  const testCases: TestCase[] = [
    { input: ['flower', 'flow', 'flight'], expected: 'fl' },
    { input: ['dog', 'racecar', 'car'], expected: '' },
    { input: ['interspecies', 'interstellar', 'interstate'], expected: 'inters' },
    { input: ['throne', 'throne'], expected: 'throne' },
    { input: ['a'], expected: 'a' },
    { input: ['', 'b'], expected: '' }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    const result = solution(test.input)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test Case ${index + 1}: Passed`)
    } else {
      console.log(`❌ Test Case ${index + 1}: Failed`)
      console.log(`   Input:    ${JSON.stringify(test.input)}`)
      console.log(`   Expected: "${test.expected}"`)
      console.log(`   Received: "${result}"`)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(longestCommonPrefix2)
