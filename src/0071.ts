// 71. Simplify Path

// You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to transform this absolute path into its simplified canonical path.
//
// The rules of a Unix-style file system are as follows:
//
//     A single period '.' represents the current directory.
//     A double period '..' represents the previous/parent directory.
//     Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
//     Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names.
//
// The simplified canonical path should follow these rules:
//
//     The path must start with a single slash '/'.
//     Directories within the path must be separated by exactly one slash '/'.
//     The path must not end with a slash '/', unless it is the root directory.
//     The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
//
// Return the simplified canonical path.
//
// Example 1:
// Input: path = "/home/"
// Output: "/home"
// Explanation:
// The trailing slash should be removed.
//
// Example 2:
// Input: path = "/home//foo/"
// Output: "/home/foo"
// Explanation:
// Multiple consecutive slashes are replaced by a single one.
//
// Example 3:
// Input: path = "/home/user/Documents/../Pictures"
// Output: "/home/user/Pictures"
// Explanation:
// A double period ".." refers to the directory up a level (the parent directory).
//
// Example 4:
// Input: path = "/../"
// Output: "/"
// Explanation:
// Going one level up from the root directory is not possible.
//
// Example 5:
// Input: path = "/.../a/../b/c/../d/./"
// Output: "/.../b/d"
// Explanation:
// "..." is a valid name for a directory in this problem.

/**
 * Stack
 * T:O(n); S: O(n);
 */
function simplifyPath(path: string): string {
  const pathArr = path.split('/')

  // Stack to store valid name
  const simplified: string[] = []

  for (const el of pathArr) {
    if (el.length === 0 || el === '.') continue

    if (el === '..') {
      simplified.pop()
      continue
    }

    simplified.push(el)
  }

  return '/' + simplified.join('/')
}

interface TestCase {
  input: string
  expected: string
}

type SimplifyPathFunction = (path: string) => string

function runTests(solution: SimplifyPathFunction): void {
  const testCases: TestCase[] = [
    { input: '/home/', expected: '/home' },
    { input: '/home//foo/', expected: '/home/foo' },
    { input: '/home/user/Documents/../Pictures', expected: '/home/user/Pictures' },
    { input: '/../', expected: '/' },
    { input: '/.../a/../b/c/./d/.', expected: '/.../b/c/d' },
    { input: '/', expected: '/' },
    { input: '/a/./b/../../c/', expected: '/c' }
  ]

  let passedCount = 0

  console.log('Running tests for LeetCode 71: Simplify Path...\n')

  testCases.forEach((test, index) => {
    try {
      const actual = solution(test.input)
      const passed = actual === test.expected

      if (passed) {
        passedCount++
        console.log(`✅ Test ${index + 1}: PASSED`)
        console.log(`   Input:    "${test.input}"`)
        console.log(`   Output:   "${actual}"\n`)
      } else {
        console.log(`❌ Test ${index + 1}: FAILED`)
        console.log(`   Input:    "${test.input}"`)
        console.log(`   Expected: "${test.expected}"`)
        console.log(`   Actual:   "${actual}"\n`)
      }
    } catch (error) {
      console.log(`❌ Test ${index + 1}: ERROR (Threw exception)`)
      console.log(`   Input:    "${test.input}"`)
      console.log(`   Error:    ${error}\n`)
    }
  })

  console.log('-----------------------------------')
  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(simplifyPath)
