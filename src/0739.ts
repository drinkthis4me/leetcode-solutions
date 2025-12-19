// 739. Daily Temperatures

/**
 * Monotonic Decreasing Stack
 * T: O(n); S: O(n);
 */
function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length

  // Stack to store temperature index
  const stack: number[] = []
  // Result array with default 0 day
  const res: number[] = new Array(n).fill(0)

  for (let i = 0; i < temperatures.length; i++) {
    const t = temperatures[i]!

    // Check warmer with top of the stack
    while (
      stack.length > 0 &&
      t > temperatures[stack[stack.length - 1]!]!
    ) {
      // Pop the top of stack to get previous temp.
      const top = stack.pop()!

      // Calculate waiting days
      res[top] = i - top
    }

    // Push current temperature index to stack and await a warmer day
    stack.push(i)
  }

  return res
};

/**
 * DP - Jump Table
 * T: O(n); S: O(1);
 */
function dailyTemperatures2(temperatures: number[]): number[] {
  const n = temperatures.length;
  // Result array with default 0 waiting day
  const res: number[] = new Array(n).fill(0);

  // Last day will always wait zero day 
  // Iterate backwards from the second-to-last day
  for (let i = n - 2; i >= 0; i--) {
    // Index of the day we check against. Starting from the next day.
    let j = i + 1;

    // Find a warmer day
    while (j < n && temperatures[j]! <= temperatures[i]!) {
      // If `res[j]` is 0, it means day 'j' never found a warmer day.
      // Since `temperatures[i] >= temperatures[j]`, day `i` won't find one either.
      if (res[j] === 0) {
        j = n;
        break;
      }

      // "THE JUMP"
      // Instead of checking `j + 1`, we jump directly to the next warmer day than day `j`.
      // We already calculated this in previous iteration.

      // [20, 20, 20, 20, 30]
      // [?, 3, 2, 1, 0]
      // i = 0
      // j = 1 + 3 = 4
      j += res[j]!;
    }

    // `temps[j] > temps[i]` if `j` is within boundary
    // Calculate diff as waiting days
    if (j < n) {
      res[i] = j - i;
    }
  }

  return res;
};

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
const expected = [1, 1, 4, 2, 1, 1, 0, 0]
// const temperatures = [30, 40, 50, 60]
// const expected = [1, 1, 1, 0]
// const temperatures = [30, 60, 90]
// const expected = [1, 1, 0]

const ans = dailyTemperatures2(temperatures)

console.log('Input: ', temperatures)
console.log('expected: ', expected)
console.log('answer: ', ans)
