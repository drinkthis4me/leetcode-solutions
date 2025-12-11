// 1021. Remove Outermost Parentheses

/**
 * Count Primitives
 * T: O(n); S: O(n);
 */
function removeOuterParentheses(s: string): string {
  // Count the depth of parentheses:
  // Increase the count if encounter '('.
  // Decrease the count if encounter ')'.

  // The outer most opening parentheses: count 0 -> 1.
  // The outer most closing parentheses: count 1 -> 0.
  // Others should be added to result.

  // "(()())(())"
  //  1212101210
  // result = "()()()"

  // "()()"
  //  1010
  // result = ""

  // "((()))"
  //  123210
  // result = "(())"

  let result: string[] = []
  // Count of primitives
  let openCount = 0

  for (const char of s) {
    if (char === '(') {
      if (openCount > 0) {
        // Add inner parenthesis to result
        result.push(char)
      }
      // Increment open count
      openCount++
    }

    if (char === ')') {
      if (openCount > 1) {
        // Add inner parenthesis to result
        result.push(char)
      }
      // Decrement open count
      openCount--
    }
  }

  return result.join('')
};

const s = "(()())(())"

const expected = "()()()"

const output = removeOuterParentheses(s)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('output: ', output)