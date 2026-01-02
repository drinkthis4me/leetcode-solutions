// 21. Merge Two Sorted Lists

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
 * T: O(n + m); S: O(1)
 */
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let dummy = new ListNode()
  // Store original head for answer
  let head = dummy

  while (list1 && list2) {
    // Compare current values
    if (list1.val <= list2.val) {
      // Assign smaller to result
      dummy.next = list1
      // Advance pointers
      list1 = list1.next
    } else {
      dummy.next = list2
      list2 = list2.next
    }
    dummy = dummy.next
  }

  // Assign the rest of nodes to the end of result
  if (list1) {
    dummy.next = list1
  }
  if (list2) {
    dummy.next = list2
  }

  return head.next
};

/**
 * Recursion
 * T: O(n + m); S: O(n + m)
 */
function mergeTwoLists2(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // If one list is empty, return the other list
  if (list1 === null) {
    return list2
  }
  if (list2 === null) {
    return list1
  }
  // Compare head values of `list1` and `list2`
  if (list1.val <= list2.val) {
    // Set `list1.next` to the merged result
    list1.next = mergeTwoLists2(list1.next, list2)
    // Return the current head
    return list1
  } else {
    list2.next = mergeTwoLists2(list1, list2.next)
    // Return the current head
    return list2
  }
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
function runTest(input: [number[], number[]], expected: number[]) {
  const list1ToList = arrayToList(input[0]);
  const list2ToList = arrayToList(input[1]);
  const mergedList = mergeTwoLists(list1ToList, list2ToList);
  const result = listToArray(mergedList);

  const passed = JSON.stringify(result) === JSON.stringify(expected);

  console.log(`Input: [[${input[0]}], [${input[1]}]]`);
  console.log(`Expected: [${expected}]`);
  console.log(`Result:   [${result}]`);
  console.log(passed ? "✅ Test Passed" : "❌ Test Failed");
  console.log("---");
}

// --- Running Tests ---

console.log("Running LeetCode 206: Reverse Linked List Tests...\n");

runTest([[1, 2, 4], [1, 3, 4]], [1, 1, 2, 3, 4, 4]);
runTest([[], []], []);
runTest([[], [0]], [0]);
