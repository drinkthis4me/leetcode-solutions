// 981. Time Based Key-Value Store

class TimeMap {
  // Map(key, [[timestamp, value]]))
  // keyStore = {
  //    "foo": [[1, "bar"], [4, "bar2"]]
  // }
  keyStore: Map<string, [number, string][]>

  constructor() {
    this.keyStore = new Map();
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @return {void}
   * 
   * T: O(1); S: O(m * n);
   */
  set(key: string, value: string, timestamp: number): void {
    // Create entry for new key
    if (!this.keyStore.has(key)) {
      this.keyStore.set(key, [])
    }

    // Push timestamp-value pair
    const timeStore = this.keyStore.get(key)!
    timeStore.push([timestamp, value])
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   * 
   * T: O(log n)
   */
  get(key: string, timestamp: number): string {
    const timeStore = this.keyStore.get(key)

    // Edge Case
    if (
      !timeStore ||
      timeStore.length === 0 || // No entry
      timestamp < timeStore[0]![0] // First timestamp is grater than target 
    ) {
      return ''
    }

    // Binary search on timestamp
    let l = 0
    let r = timeStore.length - 1
    // let res = ''

    // while (l <= r) {
    //   const mid = l + Math.floor((r - l) / 2)
    //   const midTimestamp = timeStore[mid]![0]

    //   if (midTimestamp <= timestamp) {
    //     // Save the value as candidate and find the right bound
    //     res = timeStore[mid]![1]
    //     l = mid + 1
    //   } else {
    //     r = mid - 1
    //   }
    // }

    // return res

    while (l < r) {
      // Right-biased mid to avoid infinite loop
      const mid = l + Math.ceil((r - l) / 2)
      const midTimestamp = timeStore[mid]![0]

      if (midTimestamp > timestamp) {
        r = mid - 1
      } else {
        l = mid
      }
    }

    return timeStore[l]![1]
  }
}

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

function runLeetCodeTest(commands: string[], args: any[][], expected: (string | null)[]) {
  let instance: TimeMap | null = null;
  const results: (number | null)[] = [];

  commands.forEach((cmd, i) => {
    if (cmd === "TimeMap") {
      instance = new TimeMap();
      results.push(null);
    } else {
      const res = (instance as any)[cmd](...args[i] ?? []);
      results.push(res !== undefined ? res : null);
    }
  });

  // ---Print to console---
  console.log('Input:')
  console.log(commands)
  console.log(args)
  console.log('expected:')
  console.log(expected)
  console.log("Output:")
  console.log(results)
}

runLeetCodeTest(
  ["TimeMap", "set", "get", "get", "set", "get", "get"],
  [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]],
  [null, null, "bar", "bar", null, "bar2", "bar2"]

  // ["TimeMap", "set", "get", "get", "get"],
  // [[], ["key1", "value1", 10], ["key1", 1], ["key1", 10], ["key1", 11]],
  // [null, null, "", "value1", "value1"]

  // ["TimeMap", "set", "set", "get", "get", "get", "get", "get"],
  // [[], ["love", "high", 10], ["love", "low", 20], ["love", 5], ["love", 10], ["love", 15], ["love", 20], ["love", 25]],
  // [null, null, null, "", "high", "high", "low", "low"]
)
