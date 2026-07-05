// 2726. Calculator with Method Chaining

interface CalculatorInstance {
  add(val: number): CalculatorInstance
  subtract(val: number): CalculatorInstance
  multiply(val: number): CalculatorInstance
  divide(val: number): CalculatorInstance
  power(val: number): CalculatorInstance
  getResult(): number
}

class Calculator implements CalculatorInstance {
  val: number

  constructor(value: number) {
    this.val = value
  }

  add(value: number): Calculator {
    this.val += value
    return this
  }

  subtract(value: number): Calculator {
    this.val -= value
    return this
  }

  multiply(value: number): Calculator {
    this.val *= value
    return this
  }

  divide(value: number): Calculator {
    if (value === 0) {
      throw new Error('Division by zero is not allowed')
    }
    this.val /= value
    return this
  }

  power(value: number): Calculator {
    this.val **= value
    return this
  }

  getResult(): number {
    return this.val
  }
}


// -----------------------------------------------------------------------------
// Test Runner Engine
// -----------------------------------------------------------------------------
interface TestCase {
  name: string;
  actions: ['Calculator', ...ValidAction[]];
  values: number[];
  expected: number | string; // string to handle error messages like "Division by zero is not allowed"
}

type CalculatorConstructor = new (value: number) => CalculatorInstance

type ValidAction = keyof CalculatorInstance

function runTests(CalculatorClass: CalculatorConstructor) {
  const testCases: TestCase[] = [
    {
      name: 'Example 1: Basic addition and subtraction',
      actions: ['Calculator', 'add', 'subtract', 'getResult'],
      values: [10, 5, 7],
      expected: 8
    },
    {
      name: 'Example 2: Multiplication, power, and subtraction',
      actions: ['Calculator', 'multiply', 'power', 'subtract', 'getResult'],
      values: [2, 5, 2, 2],
      expected: 98 // (2 * 5)^2 - 2 = 100 - 2 = 98
    },
    {
      name: 'Example 3: Division by zero handling',
      actions: ['Calculator', 'divide', 'getResult'],
      values: [20, 0],
      expected: 'Division by zero is not allowed'
    },
    {
      name: 'Edge Case: Chaining multiple of the same operations',
      actions: ['Calculator', 'add', 'add', 'add', 'getResult'],
      values: [0, 1, 2, 3],
      expected: 6
    },
    {
      name: 'Edge Case: Negative numbers and decimals',
      actions: ['Calculator', 'multiply', 'divide', 'getResult'],
      values: [-10, -5, 2],
      expected: 25 // (-10 * -5) / 2 = 50 / 2 = 25
    },
    {
      name: 'Edge Case: Power of 0',
      actions: ['Calculator', 'power', 'getResult'],
      values: [5, 0],
      expected: 1 // 5^0 = 1
    }
  ]

  let passedCount = 0

  console.log('🚀 Starting LeetCode 2726 Test Suite...\n')

  testCases.forEach((tc, index) => {
    let calcInstance: CalculatorInstance
    let actual: number | string = 0
    let threwError = false

    try {
      // Step 1: Initialize the class with the first value
      calcInstance = new CalculatorClass(tc.values[0]!)
      let valueIdx = 1
      
      // Step 2: Loop through operations (skipping the constructor)
      const methodsToRun = tc.actions.slice(1) as ValidAction[]
      for (const action of methodsToRun) {
        if (action === 'getResult') {
          actual = calcInstance.getResult()
        } else {
          const method = calcInstance[action] as (value: number) => CalculatorInstance
          calcInstance = method.call(calcInstance, tc.values[valueIdx])
          valueIdx++
        }
      }
    } catch (error: any) {
      threwError = true
      if (error instanceof Error) {
        actual = error.message
      } else if (typeof error === 'string') {
        actual = error
      } else {
        actual = String(error)
      }
    }

    // Verification step
    let isMatch = false
    if (threwError) {
      isMatch = actual === tc.expected
    } else if (typeof actual === 'number' && typeof tc.expected === 'number') {
      isMatch = Math.abs(actual - tc.expected) < 1e-5
    }

    if (isMatch) {
      console.log(`✅ Test ${index + 1} Passed: ${tc.name}`)
      passedCount++
    } else {
      console.error(`❌ Test ${index + 1} Failed: ${tc.name}`)
      console.error(`   Expected: ${tc.expected}`)
      console.error(`   Received: ${actual}\n`)
    }
  })

  console.log(`\n📊 Results: ${passedCount}/${testCases.length} tests passed.`)
}

runTests(Calculator)
