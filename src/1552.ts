// 1552. Magnetic Force Between Two Balls

/**
 * Binary Search
 * T: O(n log R); S: O(1);
 */
function maxDistance(position: number[], m: number): number {
  // Maximize the min distance between two balls.

  // Search range:
  // left = 1 (two balls next to each other)
  // right = position[n - 1] - position[0] (maximum possible distance)

  // More precisely for the upper bound:
  // Maximum average gap if the balls were uniformly spread from 0 to position[n − 1].
  // right = ceil(max(position) / (m - 1)) (Optimized)

  // Helper fn
  // Check if `m` balls can be placed in `positions` with each balls have at least `midDistance` gap
  const canPlaceBalls = (minDistance: number): boolean => {
    // Place the first ball at the 1st position
    let prevBallPos = position[0]!
    let ballsPlaced = 1

    // Place the rest of `m - 1` balls
    for (
      let i = 1;
      i < position.length && ballsPlaced < m;
      i++
    ) {
      // Place the current ball at the current position if distance is enough
      const currPos = position[i]!
      if ((currPos - prevBallPos) >= minDistance) {
        ballsPlaced++
        prevBallPos = currPos
      }
      // Otherwise try the next position
    }

    // Check if all balls are placed
    return ballsPlaced === m
  }

  // Sort the position array for binary search
  position.sort((a, b) => a - b)

  // Binary search to find the min distance (force)
  let left = 1
  let right = Math.ceil(position[position.length - 1]! / (m - 1))
  let ans = 0
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    if (canPlaceBalls(mid)) {
      // `mid` is a possible min distance
      // Find a larger distance.
      ans = mid
      left = mid + 1
    } else {
      // Find a smaller distance.
      right = mid - 1
    }
  }

  return ans
};

const position = [1, 2, 3, 4, 7], m = 3
const expected = 3
// const position = [5, 4, 3, 2, 1, 1000000000], m = 2
// const expected = 999999999

const answer = maxDistance(position, m)

console.log('Input: ', position, m)
console.log('expected: ', expected)
console.log('answer: ', answer)
