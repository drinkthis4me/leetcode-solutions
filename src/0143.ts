// 143. Reorder List
import { Deque } from '@datastructures-js/deque'

/**
 * Definition for singly-linked list.
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}
/**
 Do not return anything, modify head in-place instead.
 */


/**
 * Reverse And Merge
 * T: O(n); S: O(1);
 */
function reorderList(head: ListNode | null): void {
  // Before: 0 -> 1 -> ... -> (n - 1) -> n
  // After: 0 -> n -> 1 -> (n - 1) -> 2 -> (n - 2) -> ...

  // Even (first): 0 -> 1 -> 2 -> 3 -> ...
  // Odd (second): n -> (n - 1) -> (n - 2) -> ...

  // Split original into two half.
  // Merge two halves by interleaving nodes:
  // - The first half will be the even nodes.
  // - The reversed second half will be the odd nodes.

  // Edge Case
  // List with 0, 1, or 2 nodes don't need to be reordered
  if (!head?.next?.next) return

  // Get the middle node
  // When `fast` reaches the end, `slow` will be the last node of the first half.
  let slow: ListNode | null = head
  let fast: ListNode | null = head!.next
  while (fast?.next != null) {
    slow = slow!.next
    fast = fast.next.next
  }

  // Reverse the second half (starting at `slow.next`)
  let second: ListNode | null = slow!.next
  let prev: ListNode | null = slow!.next = null // Disconnect first and second half
  while (second !== null) {
    const temp = second.next
    second.next = prev
    prev = second
    second = temp
  }
  // `prev` is now the head of the second half
  second = prev

  // Interleave the two halves
  // f0 -> f1
  // s0 -> s1
  // f0 -> s0 -> f1
  let first: ListNode | null = head
  while (second !== null) {
    const temp1: ListNode | null = first!.next
    const temp2 = second.next

    // Reorder
    first!.next = second
    second.next = temp1

    // Advance pointers
    first = temp1
    second = temp2
  }
};

/**
 * Deque
 * T: O(n); S: O(n);
 */
function reorderList2(head: ListNode | null): void {
  // Push nodes to deque
  // Pull nodes from both ends (front and back) to reassemble them.

  // Edge Case
  // List with 0, 1, or 2 nodes don't need to be reordered
  if (!head?.next?.next) return

  const deque = new Deque<ListNode>()
  // Push all nodes except the head into the deque
  // First node will always be the original `head`
  let curr: ListNode | null = head.next
  while (curr) {
    deque.pushBack(curr)
    curr = curr.next
  }

  // Alternate popping from back and front
  curr = head
  let isPopBack = true
  while (!deque.isEmpty()) {
    if (isPopBack) {
      curr.next = deque.popBack()!
    } else {
      curr.next = deque.popFront()!
    }
    // Advance pointer
    curr = curr.next
    // Alternate popping order
    isPopBack = !isPopBack
  }

  // Terminate list to prevent cycle
  curr.next = null
};

/**
 * ListNode in Array
 * T: O(n); S: O(n);
 */
function reorderList3(head: ListNode | null): void {
  // Copy list to array
  // Interleave nodes from front and back

  // Edge Case
  // List with 0, 1, or 2 nodes don't need to be reordered
  if (!head?.next?.next) return

  // Array to store list
  const nodes: ListNode[] = []
  let curr: ListNode | null = head
  while (curr) {
    nodes.push(curr)
    curr = curr.next
  }

  // One pointer at the start; one pointer at the end
  // Reorder the nodes
  let l = 0
  let r = nodes.length - 1
  while (l < r) {
    nodes[l]!.next = nodes[r]!
    l++

    // Handle odd nodes at middle
    if (l === r) break

    nodes[r]!.next = nodes[l]!
    r--
  }
  // Terminate the list to prevent cycles
  nodes[l]!.next = null
};

/**
 * Recursion
 * T: O(n); S: O(n);
 */
function reorderList4(head: ListNode | null): void {
  // Pairing nodes from the front and back during the recursion unwind phase

  // Edge Case
  // List with 0, 1, or 2 nodes don't need to be reordered
  if (!head?.next?.next) return

  // Recursion helper fn
  const recursion = (root: ListNode | null, curr: ListNode | null): ListNode | null => {
    if (curr === null) return root

    // Pass root down, but update it based on what the deeper call returns
    root = recursion(root, curr.next);

    // If we've already finished (reached the middle), stop processing
    if (root === null) return null;

    let tmp: ListNode | null = null;
    if (root === curr || root.next === curr) {
      // Middle reached: terminate the list
      curr.next = null;
    } else {
      // Interleave: root -> cur -> tmp
      tmp = root.next;
      root.next = curr;
      curr.next = tmp;
    }

    return tmp; // Return the new 'root' for the next stack frame
  }

  recursion(head, head.next)
};

// --- Test Utilities ---

/**
 * Helper: Converts an array to a linked list
 */
function arrayToList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

/**
 * Helper: Converts a linked list back to an array for verification
 */
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

/**
 * Tester Function
 */
function runTests(reorderList: (head: ListNode | null) => void) {
  const testCases = [
    {
      input: [1, 2, 3, 4],
      expected: [1, 4, 2, 3]
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [1, 5, 2, 4, 3]
    },
    {
      input: [],
      expected: []
    },
    {
      input: [1],
      expected: [1]
    },
    {
      input: [1, 2],
      expected: [1, 2]
    }
  ];

  testCases.forEach(({ input, expected }, index) => {
    const head = arrayToList(input);
    reorderList(head);
    const result = listToArray(head);

    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`);
    if (!passed) {
      console.log(`   Input:    ${JSON.stringify(input)}`);
      console.log(`   Expected: ${JSON.stringify(expected)}`);
      console.log(`   Actual:   ${JSON.stringify(result)}`);
    }
  });
}

runTests(reorderList);