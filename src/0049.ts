// 49. Group Anagrams

/**
 * Hash Map
 * T: O(N * K); S: O(N * K);
 */
function groupAnagrams(strs: string[]): string[][] {
  // Character Count Array

  // "eat", "tea", and "ate" have the same character count array: 
  // [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]

  // We can use joined array value as the key for map:
  // {
  //   "1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0": ["eat", "tea", "ate"],
  //   ...
  // }

  const map = new Map<string, string[]>()

  for (const str of strs) {
    const count = new Array(26).fill(0)

    for (let i = 0; i < str.length; i++) {
      count[str.charCodeAt(i) - 'a'.charCodeAt(0)]++
    }

    // Serialize count as key
    const key = count.join(',')

    if (map.has(key)) {
      map.get(key)!.push(str)
    } else {
      map.set(key, [str])
    }
  }

  return [...map.values()]
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
const expected = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

const ans = groupAnagrams(strs)

console.log('Input: ', strs)
console.log('expected: ', expected)
console.log('answer: ', ans)
