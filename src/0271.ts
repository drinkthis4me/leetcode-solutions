// 271. Encode and Decode Strings

/**
 * Custom Delimiter: `{length}#{str}`
 * T: O(n); S: O(n);
 */
class Solution {
  // T: O(n); S: O(n);
  encode(strs: string[]): string {
    // Prepend '{str.length}#' as delimiter to each string
    // ['neet', 'code'] -> '4#neet4#code'
    return strs.map(str => `${str.length}#${str}`).join('')
  }

  // T: O(n); S: O(n);
  decode(str: string): string[] {
    // Parse length with string before '#'
    // Push substr after '#' with parsed length

    // '4#neet4#code'
    // i = 0
    // Parse char as length. Get length = 4.
    // i = 1
    // Skip '#'.
    // i = 2
    // Get substr as word: `str[2...6]`.
    // Push to result.
    // i = 7
    // Repeat process.

    // string[]
    const res: string[] = []
    // Pointer for char
    let i = 0

    while (i < str.length) {
      // Starting from `i`, parse the delimiter '{length}#'
      let j = i
      while (j < str.length && str[j] !== '#') {
        j++
      }
      const length = parseInt(str.substring(i, j), 10)

      // Starting after '#' (index j + 1), get the substr as word
      const start = j + 1
      const end = start + length
      const word = str.substring(start, end)
      // Push the parsed word to result
      res.push(word)

      // Move pointer `i` to the start of the next section
      i = end
    }

    return res
  }
}

const input = ["neet", "code", "love", "you"]

const expected = input

const solution = new Solution
const encoded = solution.encode(input)
const decoded = solution.decode(encoded)

const output = decoded

console.log('Input: ', input)
console.log('expected: ', expected)
console.log('output: ', output)