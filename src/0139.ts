// 139. Word Break

// Input: s = "leetcode", wordDict = ["leet","code"]
// Output: true
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: false

/**
 * Brute Force
 *
 */
function wordBreak(s: string, wordDict: string[]): boolean {
  const n = s.length

  const dfs = (i: number): boolean => {
    if (i >= n) return true

    for (const word of wordDict) {
      if (
        i + word.length <= n &&
        s.substring(i, i + word.length) === word
      ) {
        // s[i..x] matches with a word. Move to next i (x + 1).
        if (dfs(i + word.length)) return true
      }
    }

    // No match at i
    return false
  }

  return dfs(0)
};

/**
 * Hash Set
 *
 */
function wordBreak2(s: string, wordDict: string[]): boolean {
  // Find every substring in a set for O(1) lookup

  const n = s.length
  const set = new Set<string>(wordDict)

  const dfs = (i: number): boolean => {
    if (i >= n) return true

    for (let j = i; j < n; j++) {
      if (set.has(s.substring(i, j + 1))) {
        if (dfs(j + 1)) {
          return true
        }
      }
    }

    return false
  }

  return dfs(0)
};

/**
 * DP (Top-down)
 * T: O(n^2 * m); S: O(n + w);
 * where n = length of s; m = max length word in wordDict; w = total words in wordDict
 */
function wordBreak3(s: string, wordDict: string[]): boolean {
  const n = s.length

  const wordSet = new Set(wordDict)
  const memo: Array<null | boolean> = new Array(n).fill(null)

  const dfs = (i: number): boolean => {
    if (i >= n) {
      return true
    }

    if (memo[i] !== null) {
      return memo[i]
    }

    for (let j = i; j < n; j++) {
      const currWord = s.slice(i, j + 1)

      if (wordSet.has(currWord) && dfs(j + 1)) {
        memo[i] = true
        return true
      }
    }

    memo[i] = false
    return false
  }

  return dfs(0)
};

/**
 * DP (Bottom-up)
 * :T O(n^2 * m); S: O(n + w)
 * where n = length of s; m = max length word in wordDict; w = total words in wordDict
 */
function wordBreak4(s: string, wordDict: string[]): boolean {
  const n = s.length

  const wordSet = new Set(wordDict)
  const dp = new Array(n + 1).fill(false)

  // Starts from the back and ask whether suffix s[i...n-1] can be broken into words.

  // Empty suffix always true
  dp[n] = true

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      const currWord = s.slice(i, j + 1)

      // Check current word s[i...j]
      // and suffix s[j+1...n-1]
      if (wordSet.has(currWord) && dp[j + 1]) {
        dp[i] = true
        break
      }
    }
  }

  return dp[0]

  // // Left to right approach
  // dp[0] = true
  // for (let i = 1; i <= n; i++) {
  //   for (let j = 0; j < i; j++) {
  //     const currWord = s.slice(j, i)
  //     // Check prefix s[0...j-1]
  //     // and the substring s[j...i-1]
  //     if (dp[j] && wordSet.has(currWord)) {
  //       dp[i] = true
  //       break
  //     }
  //   }
  // }
  // return dp[n]
};

// Tester for LeetCode 139: Word Break
// Accepts a wordBreak function implementation as a parameter.

type WordBreakFunction = (s: string, wordDict: string[]) => boolean

interface TestCase {
  id: number
  s: string
  wordDict: string[]
  expected: boolean
}

function runTests(solution: WordBreakFunction): void {
  const testCases: TestCase[] = [
    {
      id: 1,
      s: 'leetcode',
      wordDict: ['leet', 'code'],
      expected: true
    },
    {
      id: 2,
      s: 'applepenapple',
      wordDict: ['apple', 'pen'],
      expected: true
    },
    {
      id: 3,
      s: 'catsandog',
      wordDict: ['cats', 'dog', 'sand', 'and', 'cat'],
      expected: false
    },
    {
      id: 4,
      s: 'a',
      wordDict: ['b'],
      expected: false
    },
    {
      id: 5,
      s: 'cars',
      wordDict: ['car', 'ca', 'rs'],
      expected: true
    }
  ]

  let passedCount = 0

  console.log('========================================')
  console.log('Running Test Cases for LeetCode 139: Word Break')
  console.log('========================================\n')

  for (const test of testCases) {
    const { id, s, wordDict, expected } = test
    const result = solution(s, wordDict)
    const passed = result === expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${id}`)
    } else {
      console.log(`[FAIL] Test Case ${id}`)
      console.log(`  - Input s:        "${s}"`)
      console.log(`  - Input wordDict: ${JSON.stringify(wordDict)}`)
      console.log(`  - Expected:       ${expected}`)
      console.log(`  - Received:       ${result}`)
    }
  }

  console.log('\n========================================')
  console.log(`Results: ${passedCount}/${testCases.length} test cases passed.`)
  console.log('========================================')
}

runTests(wordBreak4)
