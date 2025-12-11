// 1003. Check If Word Is Valid After Substitutions

/**
 * Stack
 * T: O(n); S: O(n);
 */
function isValid(s: string): boolean {
  const stack: string[] = []

  for (const char of s) {
    if (char === 'a' || char === 'b') {
      // Always push 'a' and 'b' to stack
      stack.push(char)
    } else if (char === 'c') {
      // Check top 2 in stack

      if (stack.length < 2) {
        // Not enough character to form 'abc'
        return false
      }

      const top = stack.at(-1)
      const second = stack.at(-2)

      if (top === 'b' && second === 'a') {
        // Found 'abc'
        // Remove them from stack
        stack.pop()
        stack.pop()
      } else {
        // Not valid substr
        return false
      }
    }
  }

  // s is valid iff stack is empty
  return stack.length === 0
};

const s = "aabcbc"

const expected = true

const output = isValid(s)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('output: ', output)