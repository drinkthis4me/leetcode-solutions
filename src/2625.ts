import { Stack } from '@datastructures-js/stack'

// 2625. Flatten Deeply Nested Array

type MultiDimensionalArray = (number | MultiDimensionalArray)[]

/**
 * Recursion 
 * T: O(n); S: O(n);
 */
const flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  const res: (number | MultiDimensionalArray)[] = []

  // Helper function to flatten in-place without creating intermediate arrays
  const flatten = (currentArray: MultiDimensionalArray, depth: number) => {
    for (const item of currentArray) {
      // If it's an array and we still have depth left to flatten
      if (Array.isArray(item) && depth > 0) {
        flatten(item, depth - 1)
      } else {
        res.push(item)
      }
    }
  }

  flatten(arr, n)

  return res
}

/**
 * Stack 
 * T: O(n + k); S: O(n);
 */
const flat2 = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  // Stack<[(number | MultiDimensionalArray), number]>
  // [1, [2, 3], 4], n = 1
  // stack = [[1, 1], [[2, 3], 1], [4, 1]] ->push 4 to res
  // stack = [[1, 1], [[2, 3], 1]] -> flat and push to stack
  // stack = [[1, 1], [2, 0], [3, 0]] -> push 3 to res
  // stack = [[1, 1], [2, 0]] -> push 2 to res
  // stack = [[1, 1]] -> push 1 to res
  // stack = [] -> Stack is empty Return reversed res.

  const stack = new Stack<[(number | MultiDimensionalArray), number]>()
  for (const el of arr) {
    stack.push([el, n])
  }

  const res: (number | MultiDimensionalArray)[] = []

  while (stack.size() > 0) {
    const [curr, depth] = stack.pop()!

    if (Array.isArray(curr) && depth > 0) {
      // Flat and push to stack for processing
      for (const subItem of curr) {
        stack.push([subItem, depth - 1])
      }
    } else {
      // Direct push to result
      res.push(curr)
    }
  }

  // Return reversed result
  return res.reverse()
}

// const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0
// const expected = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

// const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 1
// const expected = [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

// const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 2
// const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const arr = [1, [2, 3], 4], n = 1
const expected = [1, 2, 3, 4]

const ans = flat(arr, n)

console.log('Input: ', arr, n)
console.log('expected: ', expected)
console.log('answer: ', ans)
