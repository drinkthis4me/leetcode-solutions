// 881. Boats to Save People

// 2 passengers per boat.
// Example 1:
// Input: people = [1,2], limit = 3
// Output: 1
// Explanation: 1 boat (1, 2)
//
// Example 2:
// Input: people = [3,2,2,1], limit = 3
// Output: 3
// Explanation: 3 boats (1, 2), (2) and (3)
//
// Example 3:
// Input: people = [3,5,3,4], limit = 5
// Output: 4
// Explanation: 4 boats (3), (3), (4), (5)

/**
 * Sorting & Two Pointer
 * T: O(n log n); S: O(1);
 */
function numRescueBoats(people: number[], limit: number): number {
  // Sort the people by weight.
  // Two pointer: one at the start; one at the end.
  // Always board the heavier one (left one if sort in desc).
  // Try to fit the lighter one (right one)
  // Advance pointers if boarded.

  const n = people.length

  if (n === 1) return 1

  people.sort((a, b) => b - a)

  let l = 0
  let r = n - 1
  let count = 0

  while (l <= r) {
    // Default to boarding the left passenger
    const currW = people[l]
    l++
    count++

    // Try to board the right passenger
    if (currW + people[r] <= limit) {
      r--
    }
  }

  return count
};

/**
 * Counting Sort
 * T: O(n + limit); S: O(limit);
 */
function numRescueBoats2(people: number[], limit: number): number {
  if (people.length === 1) return 1

  // Sort people by weight count
  const buckets = new Array(limit + 1).fill(0)
  for (const person of people) {
    buckets[person]++
  }

  let l = 0
  let r = buckets.length - 1
  let count = 0

  while (l <= r) {
    // Move pointer to the next candidate
    while (l <= r && buckets[l] <= 0) {
      l++
    }
    while (l <= r && buckets[r] <= 0) {
      r--
    }

    // All passengers boarded
    if (l > r) break

    // Board the heavy passenger
    count++
    buckets[r]--
    // Try to board the light passenger
    if (l + r <= limit) {
      buckets[l]--
    }
  }

  return count
};

interface TestCase {
  people: number[]
  limit: number
  expected: number
}

/**
 * Runs test cases for LeetCode 881: Boats to Save People
 * @param solution - The function that solves the problem
 */
function runTests(solution: (people: number[], limit: number) => number): void {
  const testCases: TestCase[] = [
    {
      people: [1, 2],
      limit: 3,
      expected: 1
    },
    {
      people: [3, 2, 2, 1],
      limit: 3,
      expected: 3
    },
    {
      people: [3, 5, 3, 4],
      limit: 5,
      expected: 4
    },
    {
      people: [1, 2, 3, 4, 5],
      limit: 5,
      expected: 3
    },
    {
      people: [5, 1, 4, 2],
      limit: 6,
      expected: 2
    }
  ]

  let passedCount = 0

  console.log('=========================================')
  console.log('Running Tests for LeetCode 881')
  console.log('=========================================\n')

  testCases.forEach((test, index) => {
    // Pass a copy of the array to prevent mutation issues if the solution modifies the input array
    const inputPeople = [...test.people]
    const result = solution(inputPeople, test.limit)
    const passed = result === test.expected

    if (passed) {
      passedCount++
      console.log(`✅ Test ${index + 1}: Passed`)
    } else {
      console.log(`❌ Test ${index + 1}: Failed`)
      console.log(`   - Input    : people = [${test.people.join(', ')}], limit = ${test.limit}`)
      console.log(`   - Expected : ${test.expected}`)
      console.log(`   - Received : ${result}`)
    }
  })

  console.log('\n=========================================')
  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
  console.log('=========================================')
}

runTests(numRescueBoats2)
