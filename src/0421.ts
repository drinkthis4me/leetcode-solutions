// 421. Maximum XOR of Two Numbers in an Array

/**
 * Brute Force
 * T: O(n^2); S: O(1);
 */
function findMaximumXOR(nums: number[]): number {
  const n = nums.length
  let max = 0

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      max = Math.max(max, nums[i] ^ nums[j])
    }
  }

  return max
};

/**
 * Trie (TLE)
 * T: O(n); S: O(n);
 */
function findMaximumXOR2(nums: number[]): number {
  // For a known a, we can calculate b such that a^b = max
  // a = 1011
  // b = 0100 (Theoretical best option)
  // max = 1111 (15 in base 10)

  // To find actual b, we can iterate candidate bits from left to right
  // so that the XOR value is as close to max as possible. (Greedy searching)
  // Let's say candidates are: [0101, 0111, 1111].
  // 1st bit: 0 -> choose first and second.
  // 2st bit: 1 -> choose first and second.
  // 3rd bit: 0 -> choose first.
  // 4th bit: 0 -> only the first candidate left.
  // Therefore, b = 0101. max = 1011^0101 = 1110

  // Notice that both first and second candidate starts with bit '01'.
  // To avoid repeating work, we can put all candidates in a Trie.
  // This way, searching 0100 only takes O(n) time.

  // Define Trie
  class TrieNode {
    children: Array<TrieNode | null>

    constructor() {
      this.children = [null, null] // 0 or 1 at curr bit
    }
  }

  class Trie {
    root: TrieNode

    constructor() {
      this.root = new TrieNode()
    }

    insert(num: number): void {
      let curr = this.root
      // Insert number into Trie bit by bit, from left to right
      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1
        if (curr.children[bit] === null) {
          curr.children[bit] = new TrieNode()
        }
        curr = curr.children[bit]
      }
    }

    getMaxXor(num: number): number {
      let curr = this.root
      let max = 0

      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1
        const target = 1 - bit // Opposite bit to maximize XOR

        if (curr.children[target] !== null) {
          max |= (1 << i)
          curr = curr.children[target]
        } else {
          // Force to take the same way
          curr = curr.children[bit]!
        }
      }
      return max
    }
  }

  const trie = new Trie()
  for (const n of nums) {
    trie.insert(n)
  }

  let res = 0
  for (const n of nums) {
    res = Math.max(res, trie.getMaxXor(n))
  }

  return res
};

/**
 * Trie Flatten into Array
 * T: O(n); S: O(n);
 */
function findMaximumXOR3(nums: number[]): number {
  let maxNum = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxNum) maxNum = nums[i]
  }
  if (maxNum === 0) return 0

  // Find the most significant bit set in the array
  const maxBit = 31 - Math.clz32(maxNum)

  // Flatten Trie using parallel arrays for performance
  // trie[nodeIndex][0] -> left child index, trie[nodeIndex][1] -> right child index
  const trie: number[][] = [[0, 0]]
  let nextNodeId = 1

  // Insert numbers into Trie
  for (let i = 0; i < nums.length; i++) {
    let curr = 0
    const num = nums[i]
    for (let b = maxBit; b >= 0; b--) {
      const bit = (num >> b) & 1
      if (trie[curr][bit] === 0) {
        trie[curr][bit] = nextNodeId
        trie[nextNodeId++] = [0, 0]
      }
      curr = trie[curr][bit]
    }
  }

  let maxResult = 0

  for (let i = 0; i < nums.length; i++) {
    let curr = 0
    let currentXor = 0
    const num = nums[i]

    // Get the maximum XOR value for this a = nums[i]
    for (let b = maxBit; b >= 0; b--) {
      const bit = (num >> b) & 1
      const toggledBit = 1 - bit

      if (trie[curr][toggledBit] !== 0) {
        currentXor |= (1 << b)
        curr = trie[curr][toggledBit]
      } else {
        curr = trie[curr][bit]
      }
    }

    if (currentXor > maxResult) {
      maxResult = currentXor
    }
  }

  return maxResult
};

/**
 * Hash Set
 * T: O(n); S: O(n);
 */
function findMaximumXOR4(nums: number[]): number {
  let max = 0
  let mask = 0

  for (let i = 31; i >= 0; i--) {
    // Get max prefix
    mask = mask | (1 << i)
    const set = new Set<number>()

    // Add candidates with matching prefix to hash set
    for (let i = 0; i < nums.length; i++) {
      set.add(nums[i] & mask)
    }

    // Greedy search: guess optimal is tmp
    const tmp = max | (1 << i)

    // XOR property: A XOR B = C; A XOR C = B
    // prefix1 XOR prefix2 = tmp (Guessed)
    // prefix1 XOR tmp = prefix2 (Possible solution found)
    for (const prefix of set) {
      if (set.has(tmp ^ prefix)) {
        max = tmp
        break
      }
    }
  }

  return max
}

/**
 * Test Runner
 */
function runTests(solution: (nums: number[]) => number): void {
  const testCases: { nums: number[], expected: number }[] = [
    {
      nums: [3, 10, 5, 25, 2, 8],
      expected: 28
    },
    {
      nums: [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70],
      expected: 127
    },
    {
      nums: [0],
      expected: 0
    },
    {
      nums: [2, 4],
      expected: 6
    },
    {
      nums: [8, 10, 2],
      expected: 10
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    // Clone array to prevent mutations from affecting subsequent tests
    const input = [...test.nums]
    const result = solution(input)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`[PASS] Test Case ${index + 1}`)
    } else {
      console.log(`[FAIL] Test Case ${index + 1}`)
      console.log(`  Input:    [${test.nums.join(', ')}]`)
      console.log(`  Expected: ${test.expected}`)
      console.log(`  Received: ${result}`)
    }
  })

  console.log(`\nResult: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(findMaximumXOR4)
