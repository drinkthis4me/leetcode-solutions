// 155. Min Stack

/**
 * (value-minValue) pair in stack
 * T: O(1); S: O(n);
 */
class MinStack {
  // Stack stores [(Value), (Min value at the time when pushed)]
  stack: [number, number][]

  constructor() {
    this.stack = new Array()
  }

  push(val: number): void {
    const min = this.getMin()
    this.stack.push([val, Math.min(val, min)])
  }

  pop(): void {
    if (this.stack.length === 0) return
    this.stack.pop()
  }

  top(): number {
    if (this.stack.length === 0) {
      return Number.MAX_SAFE_INTEGER
    }
    return this.stack[this.stack.length - 1]![0]
  }

  getMin(): number {
    if (this.stack.length === 0) {
      return Number.MAX_SAFE_INTEGER
    }

    return this.stack[this.stack.length - 1]![1]
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */


function runLeetCodeTest(commands: string[], args: any[][], expected: (number | null)[]) {
  let instance: MinStack | null = null;
  const results: (number | null)[] = [];

  commands.forEach((cmd, i) => {
    if (cmd === "MinStack") {
      instance = new MinStack();
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

// Run the specific case
runLeetCodeTest(
  ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
  [[], [-2], [0], [-3], [], [], [], []],
  [null, null, null, null, -3, null, 0, -2]
);
