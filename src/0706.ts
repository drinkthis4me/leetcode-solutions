// 706. Design HashMap

/**
 * Array
 */
class MyHashMap {
  BUCKET_SIZE = 10 ** 6 + 1
  buckets: Array<number>

  constructor() {
    this.buckets = new Array(this.BUCKET_SIZE).fill(-1)
  }

  put(key: number, value: number): void {
    this.buckets[key] = value
  }

  get(key: number): number {
    return this.buckets[key]
  }

  remove(key: number): void {
    this.buckets[key] = -1
  }
}

/**
 * Array of Arrays
 */
class MyHashMap2 {
  BUCKET_SIZE = 10 ** 4
  buckets: [number, number][][]

  constructor() {
    this.buckets = Array.from({ length: this.BUCKET_SIZE }, () => [])
  }

  put(key: number, value: number): void {
    const idx = this._hash(key)
    const bucket = this.buckets[idx]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value
        return
      }
    }

    bucket.push([key, value])
  }

  get(key: number): number {
    const idx = this._hash(key)
    const bucket = this.buckets[idx]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1]
      }
    }

    return -1
  }

  remove(key: number): void {
    const idx = this._hash(key)
    const bucket = this.buckets[idx]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1)
        return
      }
    }
  }

  _hash(key: number): number {
    return key % this.BUCKET_SIZE
  }
}

/**
 * Linked List
 */
class ListNode {
  key: number
  val: number
  next: ListNode | null

  constructor(key = -1, val = -1, next = null) {
    this.key = key
    this.val = val
    this.next = next
  }
}
class MyHashMap3 {
  BUCKET_SIZE = 10 ** 4
  buckets: Array<ListNode>

  constructor() {
    this.buckets = Array.from({ length: this.BUCKET_SIZE }, () => new ListNode())
  }

  put(key: number, value: number) {
    const idx = this._hash(key)
    let curr = this.buckets[idx]

    while (curr.next) {
      if (curr.next.key === key) {
        curr.next.val = value
        return
      }
      curr = curr.next
    }
    curr.next = new ListNode(key, value)
  }

  get(key: number) {
    const idx = this._hash(key)
    let curr = this.buckets[idx]

    while (curr.next) {
      if (curr.next.key === key) {
        return curr.next.val
      }
      curr = curr.next
    }
    return -1
  }

  remove(key: number) {
    const idx = this._hash(key)
    let curr = this.buckets[idx]

    while (curr.next) {
      if (curr.next.key === key) {
        curr.next = curr.next.next
        return
      }
      curr = curr.next
    }
  }

  _hash(key: number): number {
    return key % this.BUCKET_SIZE
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */

// Define the interface for the HashMap class structure
interface IHashMap {
  put(key: number, value: number): void
  get(key: number): number
  remove(key: number): void
}

// Define a constructor type for the HashMap class
type HashMapConstructor = new () => IHashMap

function runTests(MyHashMapClass: HashMapConstructor): void {
  // Define multiple test cases following LeetCode's input format
  const testCases = [
    {
      name: 'Basic Operations & Updates',
      actions: ['MyHashMap', 'put', 'put', 'get', 'get', 'put', 'get', 'remove', 'get'],
      args: [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]],
      expected: [null, null, null, 1, -1, null, 1, null, -1]
    },
    {
      name: 'Overwrite & Re-add Keys',
      actions: ['MyHashMap', 'put', 'get', 'put', 'get', 'remove', 'get'],
      args: [[], [10, 20], [10], [10, 30], [10], [10], [10]],
      expected: [null, null, 20, null, 30, null, -1]
    },
    {
      name: 'Get and Remove on Empty/Missing Keys',
      actions: ['MyHashMap', 'get', 'remove', 'get'],
      args: [[], [5], [5], [5]],
      expected: [null, -1, null, -1]
    }
  ]

  let passedCount = 0

  testCases.forEach((test, index) => {
    const { name, actions, args, expected } = test
    let map: IHashMap | null = null
    const results: (number | null)[] = []

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i]
      const arg = args[i]

      if (action === 'MyHashMap') {
        map = new MyHashMapClass()
        results.push(null)
      } else if (map) {
        if (action === 'put') {
          map.put(arg[0], arg[1])
          results.push(null)
        } else if (action === 'get') {
          results.push(map.get(arg[0]))
        } else if (action === 'remove') {
          map.remove(arg[0])
          results.push(null)
        }
      }
    }

    // Compare results with expected output
    const isPassed = JSON.stringify(results) === JSON.stringify(expected)
    if (isPassed) {
      passedCount++
      console.log(`[PASS] Test Case ${index + 1}: ${name}`)
    } else {
      console.log(`[FAIL] Test Case ${index + 1}: ${name}`)
      console.log(`  Expected: ${JSON.stringify(expected)}`)
      console.log(`  Received: ${JSON.stringify(results)}`)
    }
  })

  console.log(`\nTest Summary: ${passedCount}/${testCases.length} test cases passed.`)
}

runTests(MyHashMap3)
