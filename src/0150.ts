// 150. Evaluate Reverse Polish Notation
import { Stack } from '@datastructures-js/stack';

/**
 * Stack
 * T: O(n); S: O(n);
 */
function evalRPN(tokens: string[]): number {
  // Stack for operand awaiting processing
  // const stack: number[] = []
  const stack = new Stack<number>()

  for (const token of tokens) {
    switch (token) {
      case '+': {
        // Get the top 2 element from stack and calculate
        const num2 = stack.pop()!
        const num1 = stack.pop()!
        stack.push(num1 + num2)
        break;
      }
      case '-': {
        // Get the top 2 element from stack and calculate
        const num2 = stack.pop()!
        const num1 = stack.pop()!
        stack.push(num1 - num2)
        break;
      }
      case '*': {
        // Get the top 2 element from stack and calculate
        const num2 = stack.pop()!
        const num1 = stack.pop()!
        stack.push(num1 * num2)
        break;
      }
      case '/': {
        // Get the top 2 element from stack and calculate
        const num2 = stack.pop()!
        const num1 = stack.pop()!
        // Truncate toward zero
        stack.push(Math.trunc(num1 / num2))
        break;
      }

      default:
        // Token is an operand (0 ~ 9)
        // Push to stack for processing
        stack.push(parseInt(token, 10))
        break;
    }
  }

  return stack.peek()!
}

const tokens = ["2", "1", "+", "3", "*"]
const expected = 9
// const tokens = ["4", "13", "5", "/", "+"]
// const expected = 6
// const tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// const expected = 22

const res = evalRPN(tokens)

console.log('Input: ', tokens)
console.log('expected: ', expected)
console.log('output: ', res)