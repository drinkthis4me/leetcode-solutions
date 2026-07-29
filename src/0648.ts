// 648. Replace Words

// Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
// Output: "the cat was rat by the bat"
// Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
// Output: "a a b c"

/**
 * Hash Set (TLE)
 * T: O(n * m^2); S:O(n * m);
 */
function replaceWords(dictionary: string[], sentence: string): string {
  const dictSet = new Set(dictionary)
  const words = sentence.split(' ')

  const getRoot = (word: string): string => {
    let root = ''
    for (const c of word) {
      root += c
      if (dictSet.has(root)) break
    }
    return root
  }

  for (let i = 0; i < words.length; i++) {
    words[i] = getRoot(words[i])
  }

  return words.join(' ')
};

/**
 * Trie
 * T: O(n * m); S:O(n * m);
 */
function replaceWords2(dictionary: string[], sentence: string): string {
  class TrieNode {
    children: Array<TrieNode | null> = new Array(26).fill(null)
    isEnd = false

    constructor() {}
  }

  class Trie {
    trieRoot = new TrieNode()

    constructor() {}

    insert(word: string): void {
      let curr = this.trieRoot
      for (const c of word) {
        const i = c.charCodeAt(0) - 'a'.charCodeAt(0)
        if (!curr.children[i]) {
          curr.children[i] = new TrieNode()
        }
        curr = curr.children[i]
      }
      curr.isEnd = true
    }

    shortestRoot(word: string): string {
      let curr = this.trieRoot

      for (let i = 0; i < word.length; i++) {
        const trieIdx = word[i].charCodeAt(0) - 'a'.charCodeAt(0)

        // No root in the trie
        if (curr.children[trieIdx] === null) {
          return word
        }

        curr = curr.children[trieIdx]

        // Take the shortest root
        if (curr.isEnd) {
          return word.substring(0, i + 1)
        }
      }

      return word
    }
  }

  const t = new Trie()
  for (const w of dictionary) {
    t.insert(w)
  }

  const words = sentence.split(' ')
  for (let i = 0; i < words.length; i++) {
    words[i] = t.shortestRoot(words[i])
  }

  return words.join(' ')
};

interface TestCase {
  id: number
  dictionary: string[]
  sentence: string
  expected: string
}

function runTests(solution: (dictionary: string[], sentence: string) => string): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      dictionary: ['cat', 'bat', 'rat'],
      sentence: 'the cattle was rattled by the battery',
      expected: 'the cat was rat by the bat'
    },
    {
      id: 2,
      dictionary: ['a', 'b', 'c'],
      sentence: 'aadsfasf absbs bbab cadsfafs',
      expected: 'a a b c'
    },
    {
      id: 3,
      dictionary: ['catt', 'cat', 'bat', 'rat'],
      sentence: 'the cattle was rattled by the battery',
      expected: 'the cat was rat by the bat'
    },
    {
      id: 4,
      dictionary: ['a', 'aa', 'aaa', 'aaaa'],
      sentence: 'a a a a a a a a a b a aba',
      expected: 'a a a a a a a a a b a a'
    },
    {
      id: 5,
      dictionary: ['lon', 'lonely'],
      sentence: 'the lonely person walked alone',
      expected: 'the lon person walked alone'
    }
  ]

  let passedCount = 0

  console.log('=== Running LeetCode 648: Replace Words Tests ===\n')

  for (const test of testCases) {
    const startTime = performance.now()
    const actual = solution(test.dictionary, test.sentence)
    const endTime = performance.now()

    const passed = actual === test.expected
    if (passed) passedCount++

    console.log(`Test Case ${test.id}: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log(`  Dictionary: ${JSON.stringify(test.dictionary)}`)
    console.log(`  Sentence:   "${test.sentence}"`)
    console.log(`  Expected:   "${test.expected}"`)
    console.log(`  Actual:     "${actual}"`)
    console.log(`  Time:       ${(endTime - startTime).toFixed(3)} ms`)
    console.log('-'.repeat(50))
  }

  console.log(`\nResult: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(replaceWords2)
