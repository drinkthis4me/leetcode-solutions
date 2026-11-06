// 735. Asteroid Collision

// We are given an array asteroids of integers representing asteroids in a row. The indices of the asteroid in the array represent their relative position in space.
//
// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.
//
// Find out the state of the asteroids after all collisions.If two asteroids meet, the smaller one will explode.If both are the same size, both will explode.Two asteroids moving in the same direction will never meet.
//
// Example 1:
// Input: asteroids = [5,10,-5]
// Output: [5,10]
// Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
//
// Example 2:
// Input: asteroids = [8,-8]
// Output: []
// Explanation: The 8 and -8 collide exploding each other.
//
// Example 3:
// Input: asteroids = [10,2,-5]
// Output: [10]
// Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
//
// Example 4:
// Input: asteroids = [3,5,-6,2,-1,4]
// Output: [-6,2,4]
// Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 destroys -1. Since 2 and 4 are both moving right, they never collide.

/**
 * Stack
 * T: O(n); S: O(n);
 */
function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = []

  for (const curr of asteroids) {
    let destroyed = false

    // Handle collision
    while (
      stack.length > 0 &&
      stack.at(-1)! > 0 &&
      curr < 0
    ) {
      const top = stack.at(-1)!
      const currSize = -curr

      if (top < currSize) {
        // Top is smaller -> Destroy top and continue checking top
        stack.pop()
        continue
      } else if (top === currSize) {
        // Both size equal -> Destroy both
        stack.pop()
      }

      // Current <= Top -> Mark destroyed and break
      destroyed = true
      break
    }

    // Add current to stack if not destroyed
    if (!destroyed) {
      stack.push(curr)
    }
  }

  return stack
};

interface TestCase {
  name: string
  input: number[]
  expected: number[]
}

function runTests(solution: (asteroids: number[]) => number[]): void {
  const testCases: TestCase[] = [
    {
      name: 'Example 1: Basic collision',
      input: [5, 10, -5],
      expected: [5, 10]
    },
    {
      name: 'Example 2: Equal size mutual destruction',
      input: [8, -8],
      expected: []
    },
    {
      name: 'Example 3: Larger left-moving asteroid',
      input: [10, 2, -5],
      expected: [10]
    },
    {
      name: 'No collisions (all moving right)',
      input: [1, 2, 3, 4],
      expected: [1, 2, 3, 4]
    },
    {
      name: 'No collisions (all moving left)',
      input: [-2, -1, -3, -4],
      expected: [-2, -1, -3, -4]
    },
    {
      name: 'Chain reaction survival',
      input: [-2, -1, 1, 2],
      expected: [-2, -1, 1, 2]
    },
    {
      name: 'Smaller right asteroid destroyed',
      input: [5, -2],
      expected: [5]
    },
    {
      name: 'Multiple collisions against left-moving asteroids',
      input: [1, 1, -2, -2],
      expected: [-2, -2]
    }
  ]

  let passedCount = 0

  console.log('=========================================')
  console.log('Running Tests for LeetCode 735: Asteroid Collision')
  console.log('=========================================\n')

  testCases.forEach((tc, index) => {
    // Pass a shallow copy to prevent the solution from mutating the original test input
    const inputCopy = [...tc.input]
    const actual = solution(inputCopy)

    const passed = JSON.stringify(actual) === JSON.stringify(tc.expected)

    if (passed) {
      passedCount++
      console.log(`✅ Test ${index + 1}: ${tc.name} - PASSED`)
    } else {
      console.log(`❌ Test ${index + 1}: ${tc.name} - FAILED`)
      console.log(`   Input:    ${JSON.stringify(tc.input)}`)
      console.log(`   Expected: ${JSON.stringify(tc.expected)}`)
      console.log(`   Got:      ${JSON.stringify(actual)}`)
      console.log('-----------------------------------------')
    }
  })

  console.log('\n=========================================')
  console.log(`Summary: ${passedCount}/${testCases.length} tests passed.`)
  console.log('=========================================')
}

runTests(asteroidCollision)
