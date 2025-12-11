// 856. Score of Parentheses

/**
 * Count Nested Depth
 * T: O(n); S: O(1);
 */
function scoreOfParentheses(s: string): number {
  // Each nested "(" contributes `2 ^ depth` to score

  // input: (()(()))
  // index: 01234567
  // score = 0
  // depth = 0

  // i = 0
  // score = 0; depth = 1
  // i = 1
  // score = 0; depth = 1 + 1 = 2
  // i = 2
  // Encounter closing ")", currentScore = 2 ^ 1
  // score = 0 + 2 = 2
  // depth = 2 - 1 = 1
  // i = 3
  // score = 2; depth = 1 + 1 = 2
  // i = 4
  // score = 2; depth = 2 + 1 = 3
  // i = 5
  // Encounter closing ")", currentScore = 2 ^ 2
  // score = 2 + 4 = 6
  // depth = 3 - 1 = 2
  // i = 6
  // score = 6; depth = 2 - 1 = 1
  // i = 7
  // score = 6; depth = 1 - 1 = 0

  let score = 0
  // Keep track of nested depth
  let depth = 0

  for (let i = 0; i < s.length; i++) {
    const char = s[i]

    if (char === '(') {
      // Increase `depth`
      depth++
    } else { // `char === ')'
      // Decrease `depth`
      depth--

      // Whenever a "()" pair meet, calculate the score.
      // Notice `depth` is corrected first.
      if (s[i - 1] === '(') {
        // score += 2 ** depth
        score += (1 << depth) // bit shift for `2^n`
      }
    }
  }

  return score
};

const s = "(()(()))"

const expected = 6

const output = scoreOfParentheses(s)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('output: ', output)