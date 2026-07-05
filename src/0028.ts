// 28. Find the Index of the First Occurrence in a String

/**
 * Brute Force
 * T: O(m * n); S: O(1);
 */
function strStr(haystack: string, needle: string): number {
  const m = haystack.length
  const n = needle.length

  // Edge Case
  if (m === 0 || m < n) return -1
  if (n === 0) return 0

  // Search target: haystack
  // Search range: [0, m - n]
  // Pointer i: haystack index
  for (let i = 0; i <= m - n; i++) {
    // Pointer j: needle index
    let j = 0
    while (j < n) {
      if (haystack[i + j] !== needle[j]) {
        // Current haystack doesn't match
        // Move to next haystack
        break
      }
      j++
    }

    // Make sure full needle match
    if (j === n) return i
  }

  return -1
};

/**
 * KMP Algorithm
 * T: O(m + n); S: O(needle size);
 */
function strStr2(haystack: string, needle: string): number {
  const m = haystack.length
  const n = needle.length

  // Edge Case
  if (m === 0 || m < n) return -1
  if (n === 0) return 0

  // Helper to build LPS ("longest proper prefix which is also suffix) array
  // Example for PS:
  // 'aa' -> 2; 'aba' -> 1; 'aaba' -> 1; 'aabaa' -> 2;
  const getLPSArray = (s: string): number[] => {
    const n = s.length
    const lps = new Array(n).fill(0)
    let prevLength = 0
    let i = 1

    while (i < n) {
      if (s[i] === s[prevLength]) {
        // Match found
        prevLength++
        lps[i] = prevLength
        i++
      } else {
        // No match
        if (prevLength !== 0) {
          // Fallback to the previous value
          prevLength = lps[prevLength - 1]
        } else {
          // Reset and move to next char
          lps[i] = 0
          i++
        }
      }
    }

    return lps
  }

  // KMP search function
  const lps = getLPSArray(needle)
  let i = 0 // Pointer for haystack
  let j = 0 // Pointer for needle

  while (i < m) {
    if (haystack[i] === needle[j]) {
      i++
      j++
    }

    if (j === n) {
      // All matched. Return starting index.
      return i - j
    } else if (i < m && haystack[i] !== needle[j]) {
      // Mismatch after j
      if (j !== 0) {
        // Shift to next lps
        j = lps[j - 1]!
      } else {
        i++
      }
    }
  }

  return -1
};

/**
 * Boyer-Moore algorithm
 * Average T: O(m / n); Worst-case T: O(m * n);
 * S: O(k) (Size of the alphabet);
 */
function strStr3(haystack: string, needle: string): number {
  const m = haystack.length
  const n = needle.length

  // Edge Case
  if (m === 0 || m < n) return -1
  if (n === 0) return 0

  // Pre-compute the bad char (last occurring char) table for needle
  const map = new Map<string, number>()
  for (let i = 0; i < n; i++) {
    map.set(needle[i]!, i)
  }

  let i = 0 // Pointer for haystack
  while (i <= m - n) {
    let j = n - 1 // Pointer for needle, from back.

    while (j >= 0 && haystack[i + j] === needle[j]) {
      j--
    }

    if (j < 0) {
      return i
    }

    // Mismatch at i + j
    const mismatch = haystack[i + j]!
    const badCharIdx = map.get(mismatch)

    // Calculate shift
    const shift = badCharIdx !== undefined
      ? Math.max(1, j - badCharIdx) // standard shift. At least 1.
      : j + 1 // Mismatch doesn't exist in needle

    i += shift
  }

  return -1
};

/**
 * Z-Algorithm
 * T: O(m + n); S: O(m + n);
 */
function strStr4(haystack: string, needle: string): number {
  const m = haystack.length
  const n = needle.length

  // Edge Case
  if (m === 0 || m < n) return -1
  if (n === 0) return 0

  // Pre-compute z-array
  const zFunction = (s: string): number[] => {
    const n = s.length
    const z = new Array(n).fill(0)

    let l = 0
    let r = 0

    // Start at index 1 since z[0] = 0
    for (let i = 1; i < n; i++) {
      if (i <= r) {
        // Reuse the previous computed value
        z[i] = Math.min(r - i + 1, z[i - l])
      }

      while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
        z[i]++
      }

      if (i + z[i] - 1 > r) {
        l = i
        r = i + z[i] - 1
      }
    }

    return z
  }

  // Main search function
  const combined = needle + '|' + haystack
  const z = zFunction(combined)

  for (let i = n + 1; i < combined.length; i++) {
    if (z[i] === n) {
      return i - n - 1
    }
  }

  return -1
};

/**
 * Rabin-Karp Algorithm (Rolling Hash)
 * T: O(m + n), worst case O(m * n)
 * S: O(n);
 */
function strStr5(haystack: string, needle: string): number {
  const m = haystack.length
  const n = needle.length

  // Edge Case
  if (m === 0 || m < n) return -1
  if (n === 0) return 0

  // A prime number for the base
  const base = 101
  // A large prime for the modulus to prevent overflow
  const mod = 1e9 + 7
  // High-order digit multiplier (h = pow(base, n -1) % mode)
  let h = 1
  for (let i = 0; i < n - 1; i++) {
    h = (h * base) % mod
  }

  let needleHash = 0
  let haystackHash = 0

  // Calculate hash value for the first window
  for (let i = 0; i < n; i++) {
    needleHash = (needleHash * base + needle.charCodeAt(i)) % mod
    haystackHash = (haystackHash * base + haystack.charCodeAt(i)) % mod
  }

  // Slide the window over the haystack
  for (let i = 0; i <= m - n; i++) {
    // Hash matched. Verify characters. (Could be hash collision)
    if (haystackHash === needleHash) {
      if (haystack.substring(i, i + n) === needle) return i
    }

    // Next window
    if (i < m - n) {
      haystackHash = (
        base * haystackHash - haystack.charCodeAt(i) * h + haystack.charCodeAt(i + n)
      ) % mod

      // Convert negative hash to positive
      if (haystackHash < 0) {
        haystackHash += mod
      }
    }
  }

  return -1

};

/**
 * Test Runner
 */
function runTests() {
  const tests = [
    {
      name: 'Standard',
      haystack: 'sadbutsad',
      needle: 'sad',
      expected: 0
    },
    {
      name: 'Not Found',
      haystack: 'leetcode',
      needle: 'leeto',
      expected: -1
    },
    {
      name: 'Empty needle',
      haystack: 'leetcode',
      needle: '',
      expected: 0
    },
    {
      name: 'Empty haystack and long needle',
      haystack: '',
      needle: 'leetcode',
      expected: -1
    },
    {
      name: 'Empty haystack and needle',
      haystack: '',
      needle: '',
      expected: -1
    },

  ]

  tests.forEach(({ name, haystack, needle, expected }) => {
    const result = strStr5(haystack, needle)
    console.log(`[${result === expected ? 'PASS' : 'FAIL'}] ${name}`)
    if (result !== expected) {
      console.log(`   Expected ${expected}, got ${result}`)
    }
  })
}

runTests()