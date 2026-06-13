// 25. Reverse Nodes in k-Group

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // [1, 2, 3, 4, 5], k: 2,
  // [(1, 2), (3, 4), 5]
  // [2, 1, 4, 3, 5]

  // Reverse group by group
  // Store head and tail for the next group

  // Helper fn to get the kth node (group's tail)
  const getKthNode = (curr: ListNode | null, k: number) => {
    while (curr && k > 0) {
      curr = curr.next
      k--
    }
    return curr
  }

  const dummy = new ListNode(0, head)
  let groupPrev: ListNode | null = dummy

  while (true) {
    const kthNode = getKthNode(groupPrev, k)

    // Next group should have at least k nodes
    // Otherwise, leave it
    if (!kthNode) break

    let groupNext = kthNode.next!

    // Reverse the current group
    // groupPrev -> [curr -> ... -> kthNode] -> groupNext
    let prev: ListNode | null = kthNode.next!
    let curr: ListNode | null = groupPrev!.next!
    while (curr !== groupNext) {
      const next = curr.next as ListNode
      curr.next = prev
      prev = curr
      curr = next
    }

    // Link the reversed current group to the rest of list
    // groupPrev -> [kthNode -> ... -> curr] -> groupNext
    // curr: New tail of the group
    // kthNode: New head of the group
    const temp = groupPrev.next as ListNode
    groupPrev!.next = kthNode
    groupPrev = temp
  }

  return dummy.next
};

// --- Test Helper ---
// Convert an array to a linked list
function arrayToList(arr: number[]): ListNode | null {
  let dummy = new ListNode();
  let curr = dummy;
  for (let val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

// Convert a linked list back to an array for easy comparison
function listToArray(node: ListNode | null): number[] {
  let result: number[] = [];
  while (node) {
    result.push(node.val);
    node = node.next;
  }
  return result;
}

// --- Test Suite ---
function runTests() {
  const tests = [
    { input: [1, 2, 3, 4, 5], k: 2, expected: [2, 1, 4, 3, 5] },
    { input: [1, 2, 3, 4, 5], k: 3, expected: [3, 2, 1, 4, 5] },
    { input: [1, 2, 3, 4, 5], k: 1, expected: [1, 2, 3, 4, 5] },
    { input: [1], k: 1, expected: [1] },
    { input: [1, 2], k: 2, expected: [2, 1] },
    { input: [], k: 1, expected: [] }
  ];

  tests.forEach(({ input, k, expected }, index) => {
    const head = arrayToList(input);
    const resultHead = reverseKGroup(head, k);
    const resultArr = listToArray(resultHead);
    const passed = JSON.stringify(resultArr) === JSON.stringify(expected);

    console.log(`Test ${index + 1}: ${passed ? "✅ PASSED" : "❌ FAILED"}`);
    if (!passed) {
      console.log(`   Input: ${input}, k: ${k}`);
      console.log(`   Expected: ${expected}`);
      console.log(`   Actual:   ${resultArr}`);
    }
  });
}

runTests();