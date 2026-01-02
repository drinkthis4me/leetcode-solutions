// 206. Reverse Linked List

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
 * Iterate Pointers
 * T: O(n); S: O(1);
 */
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null
  let curr: ListNode | null = head

  // prev = null; curr = 1
  // 1 -> 2
  // temp = 2
  // curr.next = prev (null)
  // prev = curr (1)
  // curr = temp (2)

  while (curr !== null) {
    // Store next node
    const temp = curr.next
    // Reverse pointers
    curr.next = prev
    // Advance pointers
    prev = curr
    curr = temp
  }

  return prev
};

// --- Tester Utilities ---

/**
 * Converts an array into a Linked List.
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
 * Converts a Linked List back into an array for easy comparison.
 */
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

/**
 * Runs a test case and logs the result.
 */
function runTest(input: number[], expected: number[]) {
  const head = arrayToList(input);
  const reversedHead = reverseList(head);
  const result = listToArray(reversedHead);

  const passed = JSON.stringify(result) === JSON.stringify(expected);

  console.log(`Input: [${input}]`);
  console.log(`Expected: [${expected}]`);
  console.log(`Result:   [${result}]`);
  console.log(passed ? "✅ Test Passed" : "❌ Test Failed");
  console.log("---");
}

// --- Running Tests ---

console.log("Running LeetCode 206: Reverse Linked List Tests...\n");

runTest([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]); // Standard case
runTest([1, 2], [2, 1]);                   // Short list
runTest([1], [1]);                         // Single node
runTest([], []);                           // Empty list
