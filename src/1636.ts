// 1636. Sort Array by Increasing Frequency

// nums = [2,3,1,3,2]
// res = [1,3,3,2,2]

/**
 * Custom Sort w/ Hash Map
 * T: O(n log n); S: O(n);
 */
function frequencySort(nums: number[]): number[] {
  // Frequency map of num-count
  const map = new Map<number, number>()
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }

  nums.sort((a, b) => {
    const aFreq = map.get(a)!
    const bFreq = map.get(b)!

    return aFreq !== bFreq ?
      aFreq - bFreq :
      b - a
  })

  return nums
};

/**
 * Custom Sort w/ Fixed Array
 * T: O(n log n); S: O(n);
 */
function frequencySort2(nums: number[]): number[] {
  // Frequency array for num -100 to 100
  const freq = new Int32Array(201)
  for (const num of nums) {
    freq[num + 100]++
  }

  nums.sort((a, b) => {
    const aFreq = freq[a + 100]
    const bFreq = freq[b + 100]

    return aFreq !== bFreq ?
      aFreq - bFreq :
      b - a
  })

  return nums
};

/**
 * Test runner for LeetCode 1636: Sort Array by Increasing Frequency
 * @param solution - The function to be tested
 */
function runTests(solution: (nums: number[]) => number[]): void {
  const testCases = [
    {
      input: [1, 1, 2, 2, 2, 3],
      expected: [3, 1, 1, 2, 2, 2],
      description: 'Example 1: Multiple frequencies'
    },
    {
      input: [2, 3, 1, 3, 2],
      expected: [1, 3, 3, 2, 2],
      description: 'Example 2: Tie-breaking by descending order'
    },
    {
      input: [-1, 1, -6, 4, 5, -6, 1, 4, 1],
      expected: [5, -1, 4, 4, -6, -6, 1, 1, 1],
      description: 'Example 3: Including negative numbers'
    }
  ]

  testCases.forEach(({ input, expected, description }, index) => {
    // Create a copy to avoid mutating the test case input
    const result = solution([...input])

    // Simple array equality check
    const passed = JSON.stringify(result) === JSON.stringify(expected)

    console.log(`Test Case ${index + 1}: ${description}`)
    console.log(`  Input:    [${input.join(', ')}]`)
    console.log(`  Expected: [${expected.join(', ')}]`)
    console.log(`  Result:   [${result.join(', ')}]`)
    console.log(`  Status:   ${passed ? 'PASSED' : 'FAILED'}`)
    console.log('-----------------------------------------')
  })
}

runTests(frequencySort2)
