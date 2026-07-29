// 211. Design Add and Search Words Data Structure
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

class TrieNode {
  children: Array<TrieNode | null> = new Array(26).fill(null)
  isEnd = false
}

class WordDictionary {
  root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  /**
   * T:O(n); S:O(t + n)
   * where t is the total TrieNodes
   */
  addWord(word: string): void {
    let curr = this.root

    for (const c of word) {
      const i = this.getIndex(c)
      if (curr.children[i] === null) {
        curr.children[i] = new TrieNode()
      }
      curr = curr.children[i]
    }

    curr.isEnd = true
  }

  /**
   * T:O(n); S:O(t + n)
   */
  search(word: string): boolean {
    return this.dfs(word, this.root)
  }

  dfs(word: string, root: TrieNode): boolean {
    for (let i = 0; i < word.length; i++) {
      const c = word[i]

      if (c === '.') {
        // Recursively search all children with the suffix
        for (const child of root.children) {
          if (child !== null && this.dfs(word.slice(i + 1), child)) {
            return true
          }
        }
        // All children null/false. Word not found.
        return false
      } else {
        // Search current root's children
        // And move to next node
        const i = this.getIndex(c)
        if (root.children[i] === null) return false
        root = root.children[i]
      }
    }

    // Prefix exist. Check if this prefix is a word.
    return root.isEnd
  }

  getIndex(c: string): number {
    return c.charCodeAt(0) - 'a'.charCodeAt(0)
  }
}

/**
 * Test Runner
 */

type Command = 'WordDictionary' | 'addWord' | 'search'

interface TestCase {
  id: number
  commands: Command[]
  args: string[][]
  expected: (boolean | null)[]
}

interface WordDictionaryOperations {
  addWord(word: string): void
  search(word: string): boolean
}

export function runTests(WordDictionaryConstructor: new () => WordDictionaryOperations): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      commands: ['WordDictionary', 'addWord', 'addWord', 'addWord', 'search', 'search', 'search', 'search'],
      args: [[], ['bad'], ['dad'], ['mad'], ['pad'], ['bad'], ['.ad'], ['b..']],
      expected: [null, null, null, null, false, true, true, true]
    },
    {
      id: 2,
      commands: ['WordDictionary', 'addWord', 'search', 'search'],
      args: [[], ['a'], ['.'], ['a']],
      expected: [null, null, true, true]
    },
    {
      id: 3,
      commands: ['WordDictionary', 'addWord', 'addWord', 'search', 'search', 'search'],
      args: [[], ['at'], ['and'], ['a'], ['.at'], ['an.']],
      expected: [null, null, null, false, false, true]
    }
  ]

  let passedCount = 0

  testCases.forEach(({ id, commands, args, expected }) => {
    let instance: WordDictionaryOperations | null = null
    let success = true
    const results: (boolean | null)[] = []

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i]
      const arg = args[i][0]

      let res: boolean | null = null

      if (cmd === 'WordDictionary') {
        instance = new WordDictionaryConstructor()
        res = null
      } else if (cmd === 'addWord') {
        if (instance) {
          instance.addWord(arg)
        }
        res = null
      } else if (cmd === 'search') {
        if (instance) {
          res = instance.search(arg)
        }
      }

      results.push(res)
    }

    // Compare results with expected outputs
    for (let i = 0; i < expected.length; i++) {
      if (results[i] !== expected[i]) {
        success = false
        break
      }
    }

    if (success) {
      passedCount++
      console.log(`Test Case ${id}: PASSED`)
    } else {
      console.log(`Test Case ${id}: FAILED`)
      console.log('  Commands:  ', commands)
      console.log('  Arguments: ', args)
      console.log('  Expected:  ', expected)
      console.log('  Received:  ', results)
    }
  })

  console.log(`\nSummary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(WordDictionary)
