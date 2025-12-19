// 20. Valid Parentheses

/**
 * Stack
 * T: O(n); S: O(n);
 */
function isValid(s: string): boolean {
  // Stack to store unprocessed open brackets
  const stack: string[] = []
  // Map for bracket pairs
  const brackets = new Map<string, string>()
  brackets.set('(', ')')
  brackets.set('{', '}')
  brackets.set('[', ']')

  for (const c of s) {
    if (brackets.has(c)) {
      // Push open bracket to await processing
      stack.push(c)
    } else {
      // Check if top of the stack matches with current closing bracket
      const top = stack.pop()

      if (
        !top || // Cannot find open bracket
        brackets.get(top) !== c // Opening does not match with closing
      ) {
        return false
      }
    }
  }

  // Check all characters are processed
  return stack.length === 0
};

// const s = "()"
// const expected = true
// const s = "()[]{}"
// const expected = true
// const s = "(]"
// const expected = false
// const s = "([])"
// const expected = true
// const s = "([)]"
// const expected = false
// const s = "))"
// const expected = false
const s = "(("
const expected = false

const ans = isValid(s)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('answer: ', ans)
