// 2695. Array Wrapper

interface ArrayWrapperInterface {
  valueOf(): number;
  toString(): string;
}

class ArrayWrapper implements ArrayWrapperInterface {
  nums: number[] = []

  constructor(nums: number[]) {
    this.nums = nums
  }

  // Sum of nums
  valueOf(): number {
    return this.nums.reduce((acc, curr) => acc + curr, 0)
  }

  toString(): string {
    return `[${this.nums.toString()}]`
  }
};

// ============================================================================
// Test Runner Function
// ============================================================================

type ArrayWrapperConstructor = new (nums: number[]) => ArrayWrapperInterface;

function runLeetCode2695Tests(ArrayWrapper: ArrayWrapperConstructor) {
  console.log("🚀 Starting LeetCode 2695 (Array Wrapper) Tests...\n");
  let passed = 0;
  let failed = 0;

  function assert(testName: string, condition: boolean, received: any, expected: any) {
    if (condition) {
      console.log(` ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(` ❌ FAIL: ${testName}`);
      console.error(`    Expected: ${JSON.stringify(expected)}`);
      console.error(`    Received: ${JSON.stringify(received)}\n`);
      failed++;
    }
  }

  // ------------------------------------------------------------------------
  // Test Case 1: Addition of two wrappers (valueOf)
  // ------------------------------------------------------------------------
  try {
    const obj1 = new ArrayWrapper([1, 2]);
    const obj2 = new ArrayWrapper([3, 4]);
    // The '+' operator triggers valueOf() implicitly
    const result = (obj1 as any) + (obj2 as any);
    assert("Case 1: Addition [1,2] + [3,4]", result === 10, result, 10);
  } catch (e: any) {
    console.error(" ❌ FAIL: Case 1 crashed with error:", e.message);
    failed++;
  }

  // ------------------------------------------------------------------------
  // Test Case 2: String representation (toString)
  // ------------------------------------------------------------------------
  try {
    const obj = new ArrayWrapper([23, 98, 42]);
    const result = String(obj);
    assert("Case 2: String representation of [23,98,42]", result === "[23,98,42]", result, "[23,98,42]");
  } catch (e: any) {
    console.error(" ❌ FAIL: Case 2 crashed with error:", e.message);
    failed++;
  }

  // ------------------------------------------------------------------------
  // Test Case 3: Empty Arrays
  // ------------------------------------------------------------------------
  try {
    const obj1 = new ArrayWrapper([]);
    const obj2 = new ArrayWrapper([]);
    const sumResult = (obj1 as any) + (obj2 as any);
    const strResult = String(obj1);

    assert("Case 3a: Empty array addition [] + []", sumResult === 0, sumResult, 0);
    assert("Case 3b: Empty array string representation", strResult === "[]", strResult, "[]");
  } catch (e: any) {
    console.error(" ❌ FAIL: Case 3 crashed with error:", e.message);
    failed++;
  }

  // ------------------------------------------------------------------------
  // Test Case 4: Negative numbers and single elements
  // ------------------------------------------------------------------------
  try {
    const obj1 = new ArrayWrapper([-5]);
    const obj2 = new ArrayWrapper([10, -2]);
    const sumResult = (obj1 as any) + (obj2 as any);

    assert("Case 4: Addition with negative numbers [-5] + [10,-2]", sumResult === 3, sumResult, 3);
  } catch (e: any) {
    console.error(" ❌ FAIL: Case 4 crashed with error:", e.message);
    failed++;
  }

  // ------------------------------------------------------------------------
  // Summary
  // ------------------------------------------------------------------------
  console.log("\n--------------------------------------------------");
  console.log(`📊 Test Results: ${passed} Passed | ${failed} Failed`);
  console.log("--------------------------------------------------\n");

  return failed === 0;
}

runLeetCode2695Tests(ArrayWrapper);
