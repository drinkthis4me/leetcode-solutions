// 853. Car Fleet

/**
 * Stack (implicitly)
 * T: O(n log n); S: O(n);
 */
function carFleet(target: number, position: number[], speed: number[]): number {
  // target = 12
  // position = [10, 8, 0, 5, 3]
  // speed = [2, 4, 1, 1, 3]

  // sorted position = [10, 8, 5, 3, 0]
  // speed based on sorted position = [2, 4, 1, 3, 0]

  // (Time to reach target) = (target - position[i]) / speed[i]
  // times = [1, 1, 7, 3, 12]

  // Two cars will form a fleet iff (time of car ahead) >= (time of car behind)
  // [(1, 1), (7, 3), (12)] -> 3 fleets

  // Edge Case
  if (position.length === 0) return 0

  // Combine `position` and `speed`
  interface Car {
    // position[i]
    pos: number
    // Time to reach target: `(target - position[i]) / speed[i]`
    time: number
  }
  const cars: Car[] = position.map((pos, idx) => ({
    pos,
    time: (target - pos) / speed[idx]!
  }))

  // Sort by position in descending order
  cars.sort((a, b) => b.pos - a.pos)

  // Count of car fleets
  let fleets = 0
  // Max time so far (implicit stack)
  let maxTime = 0

  for (const car of cars) {
    if (car.time > maxTime) {
      fleets++
      maxTime = car.time
    }
  }

  return fleets
};

const target = 12, position = [10, 8, 0, 5, 3], speed = [2, 4, 1, 1, 3]
const expected = 3
// const target = 10, position = [3], speed = [3]
// const expected = 1
// const target = 100, position = [0, 2, 4], speed = [4, 2, 1]
// const expected = 1
// const target = 10, position = [2, 4], speed = [3, 2]
// const expected = 1

const ans = carFleet(target, position, speed)

console.log('Input: ', target, position, speed)
console.log('expected: ', expected)
console.log('answer: ', ans)
