// 146. LRU Cache

class DLLNode {
  key: number;
  val: number;
  prev: DLLNode | null = null;
  next: DLLNode | null = null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

/**
 * Double Linked List & Hash Map
 */
class LRUCache {
  capacity: number
  map: Map<number, DLLNode>
  head: DLLNode
  tail: DLLNode

  constructor(capacity: number) {
    this.capacity = capacity
    this.map = new Map()
    this.head = new DLLNode(0, 0)
    this.tail = new DLLNode(0, 0)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  // Remove target node
  private remove(target: DLLNode): void {
    // Before: prev -> target -> next
    // After:  prev -> next
    target.prev!.next = target.next
    target.next!.prev = target.prev
  }

  // Insert at tail
  // This marks the node as recently used
  private insert(node: DLLNode): void {
    // Before: prev -> tail
    // After:  prev -> node -> tail
    const prev = this.tail.prev!
    prev.next = node
    node.next = this.tail
    this.tail.prev = node
    node.prev = prev
  }

  // T: O(1); S: O(1);
  get(key: number): number {
    if (!this.map.has(key)) return -1

    const node = this.map.get(key)!
    this.remove(node)
    this.insert(node)

    return node.val
  }

  // T: O(1); S: O(1);
  put(key: number, value: number): void {
    // Remove old if exists
    if (this.map.has(key)) {
      this.remove(this.map.get(key)!)
    }

    // Insert new node
    const newNode = new DLLNode(key, value)
    this.map.set(key, newNode)
    this.insert(newNode)

    // Maintain capacity
    if (this.map.size > this.capacity) {
      const LRU = this.head.next!
      this.remove(LRU)
      this.map.delete(LRU.key)
    }
  }
}

// Test
function runLeetCodeStyleTest(commands: string[], values: number[][]) {
  let lru: LRUCache | null = null;
  const output: (number | null)[] = [];

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "LRUCache") {
      lru = new LRUCache(values[i]![0]!);
      output.push(null);
    } else if (commands[i] === "put") {
      lru?.put(values[i]![0]!, values[i]![1]!);
      output.push(null);
    } else if (commands[i] === "get") {
      output.push(lru?.get(values[i]![0]!) ?? -1);
    }
  }
  return output;
}

const result = runLeetCodeStyleTest(
  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
);
console.log('Expected:')
console.log([null, null, null, 1, null, -1, null, -1, 3, 4])
console.log("Dynamic Test Result:")
console.log(result)