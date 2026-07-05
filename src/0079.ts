// 79. Word Search

/**
 * Backtrack w/ Hash Set
 * T: O(m * n * 3 ^ L): S: O(m * n + L);
 * m, n for board size. L for word length.
 */
function exist(board: string[][], word: string): boolean {
  const m = board.length
  const n = board[0].length

  // Set of [row, column]
  const hashSet = new Set<string>()
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

  let res = false

  const getCellKey = (r: number, c: number): string => {
    return `${r}-${c}`
  }

  const backtrack = (r: number, c: number, i: number) => {
    const cellKey = getCellKey(r, c)

    if (
      res ||
      hashSet.has(cellKey) ||
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      board[r][c] !== word[i]
    ) {
      return
    }

    if (i === word.length - 1) {
      res = true
      return
    }

    hashSet.add(cellKey)

    for (const [dx, dy] of directions) {
      const newR = r + dx
      const newC = c + dy

      backtrack(newR, newC, i + 1)
    }

    hashSet.delete(cellKey)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (res) break
      backtrack(i, j, 0)
    }
  }

  return res
};

/**
 * Backtrack (Optimized)
 * T: O(m * n * 3 ^ L): S: O(L);
 */
function exist2(board: string[][], word: string): boolean {
  // Mark visited cell in-place
  // Backtrack returns boolean
  // Reverse word if first character frequency is greater than the last

  const m = board.length
  const n = board[0].length

  let countFirst = 0
  let countLast = 0
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) countFirst++
      if (board[r][c] === word[word.length - 1]) countLast++
    }
  }
  if (countFirst > countLast) {
    word = word.split('').reverse().join('')
  }

  const backtrack = (r: number, c: number, i: number): boolean => {
    if (i === word.length) {
      return true
    }

    if (
      r < 0 ||
      r >= m ||
      c < 0 ||
      c >= n ||
      board[r][c] !== word[i] // check "not matched" and "not revisited"
    ) {
      return false
    }

    board[r][c] = '#'

    const found =
      backtrack(r + 1, c, i + 1) ||
      backtrack(r - 1, c, i + 1) ||
      backtrack(r, c + 1, i + 1) ||
      backtrack(r, c - 1, i + 1)

    board[r][c] = word[i]

    return found
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) return true
    }
  }

  return false
};

/**
 * Tester for LeetCode 79: Word Search
 * 
 * @param solve - The function to test.
 * Expected signature: (board: string[][], word: string) => boolean
 */
function testWordSearch(solve: (board: string[][], word: string) => boolean) {
  const testCases = [
    {
      board: [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ],
      word: 'ABCCED',
      expected: true
    },
    {
      board: [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ],
      word: 'SEE',
      expected: true
    },
    {
      board: [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ],
      word: 'ABCB',
      expected: false
    },
    {
      board: [['a']],
      word: 'a',
      expected: true
    },
    {
      board: [['a', 'b'], ['c', 'd']],
      word: 'abcd',
      expected: false
    }
  ]

  console.log(`Running tests for: ${solve.name || 'Anonymous Function'}\n`)

  testCases.forEach((tc, index) => {
    const result = solve(tc.board, tc.word)
    const passed = result === tc.expected

    console.log(`Test Case #${index + 1}:`)
    console.log(`  Word: "${tc.word}"`)
    console.log(`  Expected: ${tc.expected}, Got: ${result}`)
    console.log(`  Status: ${passed ? '✅ PASSED' : '❌ FAILED'}`)
    console.log('-----------------------------------')
  })
}

testWordSearch(exist2)
