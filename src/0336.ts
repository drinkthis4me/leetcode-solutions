// 336. Palindrome Pairs

// Input: words = ["abcd","dcba","lls","s","sssll"]
// Output: [[0,1],[1,0],[3,2],[2,4]]
// Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]

/**
 * Brute Force (TLE)
 * T: O(n^2 * k); S: O(1);
 * Where k is max length of a word
 */
function palindromePairs(words: string[]): number[][] {
  const n = words.length
  const res: number[][] = []

  const isPalindrome = (str: string): boolean => {
    let l = 0
    let r = str.length - 1

    while (l <= r) {
      if (str[l] !== str[r]) return false
      l++
      r--
    }

    return true
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j === i) continue

      const curr = words[i] + words[j]
      if (isPalindrome(curr)) {
        res.push([i, j])
      }
    }
  }

  return res
};

/**
 * Trie  (TLE)
 * T: O(n * k^2); S: O(n * k^2);
 */
function palindromePairs2(words: string[]): number[][] {
  // word[i] + word[j] is palindrome.
  // Then: word[i] == word[j].reverse()
  // We can put every reversed word into a Trie as word[j]
  // then for each word[i], check if word[i] exists as prefix.

  const isPalindrome = (str: string, l: number, r: number) => {
    while (l < r) {
      if (str[l++] !== str[r--]) return false
    }
    return true
  }

  class TrieNode {
    children: Array<TrieNode | null> = new Array(26).fill(null)
    suffixList: Array<number> = []
    wordIndex = -1
  }

  class Trie {
    root: TrieNode

    constructor() {
      this.root = new TrieNode()
    }

    insert(word: string, index: number) {
      let curr = this.root

      for (let i = word.length - 1; i >= 0; i--) {
        const charIdx = word[i].charCodeAt(0) - 'a'.charCodeAt(0)

        if (curr.children[charIdx] === null) {
          curr.children[charIdx] = new TrieNode()
        }

        if (isPalindrome(word, 0, i)) {
          curr.suffixList.push(index)
        }

        curr = curr.children[charIdx]
      }

      curr.suffixList.push(index)
      curr.wordIndex = index
    }

    search(word: string, i: number): number[][] {
      let curr = this.root
      const res: number[][] = []

      for (let j = 0; j < word.length; j++) {
        // Case 1: The current node represents a compete word,
        // and the remaining part of word[j...end] is palindrome.
        if (
          curr.wordIndex !== -1 &&
          curr.wordIndex !== i &&
          isPalindrome(word, j, word.length - 1)
        ) {
          res.push([i, curr.wordIndex])
        }

        const charIdx = word[j].charCodeAt(0) - 'a'.charCodeAt(0)
        if (curr.children[charIdx] === null) {
          return res
        }
        curr = curr.children[charIdx]
      }

      // Case 2: Any words deeper in the Trie with valid suffix
      for (const j of curr.suffixList) {
        if (j !== i) {
          res.push([i, j])
        }
      }

      return res
    }
  }

  const n = words.length

  const trie = new Trie()
  for (let i = 0; i < n; i++) {
    trie.insert(words[i], i)
  }

  const results: number[][] = []
  for (let i = 0; i < n; i++) {
    const res = trie.search(words[i], i)
    results.push(...res)
  }

  return results
};

/**
 * Hash Map
 * T: O(n * k^2); S: O(n * k);
 */
function palindromePairs3(words: string[]): number[][] {
  // Case 0: Empty string
  //    '' + any string -> valid pair
  // Case 1: Reversed prefix
  //    word = left_part + right_part
  //    if left_part is palindrome, and reversed right_part is in Hash Map
  //        [reversed_right, word] -> valid pair
  // Case 1: Reversed suffix
  //    word = left_part + right_part
  //    if right_part is palindrome, and reversed left_part is in Hash Map
  //      [word, reversed_right] -> valid pair

  const isPalindrome = (s: string, l: number, r: number): boolean => {
    while (l < r) {
      if (s[l++] !== s[r--]) return false
    }
    return true
  }

  const toReversed = (s: string): string => {
    return s.split('').reverse().join('')
  }

  // Map of reversed words
  const map = new Map<string, number>()
  for (let i = 0; i < words.length; i++) {
    map.set(toReversed(words[i]), i)
  }

  const res: number[][] = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]

    // Case 0
    if (
      map.has('') &&
      map.get('') !== i &&
      isPalindrome(word, 0, word.length - 1)
    ) {
      res.push([i, map.get('')!])
    }

    // Split word into left_part and right_part
    // Partition point range: [1, word.length]
    for (let j = 1; j <= word.length; j++) {
      const left = word.slice(0, j)
      const right = word.slice(j)

      // Case 1
      if (
        map.has(right) &&
        map.get(right) !== i &&
        isPalindrome(left, 0, left.length - 1)
      ) {
        res.push([map.get(right)!, i])
      }

      // Case 2
      if (
        map.has(left) &&
        map.get(left) !== i &&
        isPalindrome(right, 0, right.length - 1)
      ) {
        res.push([i, map.get(left)!])
      }
    }
  }

  return res
}

/**
 * Test Runner
 */
function runTests(solution: (words: string[]) => number[][]): void {
  const testCases = [
    {
      input: ['abcd', 'dcba', 'lls', 's', 'sssll'],
      expected: [[0, 1], [1, 0], [3, 2], [2, 4]]
    },
    {
      input: ['bat', 'tab', 'cat'],
      expected: [[0, 1], [1, 0]]
    },
    {
      input: ['a', ''],
      expected: [[0, 1], [1, 0]]
    },
    {
      input: ['a', 'b', 'c', 'ab', 'ac'],
      expected: [[1, 3], [2, 4], [3, 0], [4, 0]]
    }
  ]

  // Helper function to normalize and compare 2D arrays (order independent for pairs)
  const normalizePairs = (pairs: number[][]): string[] => {
    return pairs
      .map(pair => pair.join(','))
      .sort()
  }

  let passedCount = 0

  testCases.forEach((test, index) => {
    try {
      const result = solution(test.input)

      // Normalize both expected and actual results for reliable comparison
      const normalizedResult = JSON.stringify(normalizePairs(result))
      const normalizedExpected = JSON.stringify(normalizePairs(test.expected))

      if (normalizedResult === normalizedExpected) {
        console.log(`Test Case ${index + 1}: PASSED`)
        passedCount++
      } else {
        console.log(`Test Case ${index + 1}: FAILED`)
        console.log(`  Input:    ${JSON.stringify(test.input)}`)
        console.log(`  Expected: ${JSON.stringify(test.expected)}`)
        console.log(`  Received: ${JSON.stringify(result)}`)
      }
    } catch (error) {
      console.log(`Test Case ${index + 1}: ERROR`)
      console.log(`  Input: ${JSON.stringify(test.input)}`)
      console.log(`  Error: ${error instanceof Error ? error.message : error}`)
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(palindromePairs3)
