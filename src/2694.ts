// 2694. Event Emitter

type Callback = (...args: any[]) => any
type Subscription = {
  unsubscribe: () => void
}

class EventEmitter {

  events: Map<string, Map<Subscription, Callback>> = new Map()

  subscribe(eventName: string, callback: Callback): Subscription {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Map())
    }

    const sub: Subscription = {
      unsubscribe: () => {
        const callbackMap = this.events.get(eventName)
        if (callbackMap) {
          callbackMap.delete(sub)
          // Remove event to prevent memory leak
          if (callbackMap.size === 0) {
            this.events.delete(eventName)
          }
        }
      }
    }

    // Store the subscription as obj ref key to callback map
    this.events.get(eventName)!.set(sub, callback)

    return sub
  }

  emit(eventName: string, args: any[] = []): any[] {
    if (!this.events.has(eventName)) {
      return []
    }

    const callbackMap = this.events.get(eventName)!
    const result = []
    for (const cb of callbackMap.values()) {
      result.push(cb(...args))
    }
    return result
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */


function runTests(): void {
  console.log('🚀 Starting TypeScript EventEmitter Tests...\n')
  let passed = 0
  let failed = 0

  function assert(condition: boolean, message: string): void {
    if (condition) {
      console.log(`✅ PASSED: ${message}`)
      passed++
    } else {
      console.error(`❌ FAILED: ${message}`)
      failed++
    }
  }

  // -------------------------------------------------------------
  // Test Case 1: Single subscription and emission
  // -------------------------------------------------------------
  try {
    const emitter = new EventEmitter()
    let count = 0
    emitter.subscribe('firstEvent', () => { count++ })

    emitter.emit('firstEvent')
    assert(count === 1, 'Should call the callback once when event is emitted')

    emitter.emit('firstEvent')
    assert(count === 2, 'Should call the callback a second time on second emit')
  } catch (e: any) {
    console.error('❌ FAILED: Test Case 1 crashed with error:', e.message)
    failed++
  }

  // -------------------------------------------------------------
  // Test Case 2: Passing arguments to callbacks
  // -------------------------------------------------------------
  try {
    const emitter = new EventEmitter()
    const result: string[] = []
    emitter.subscribe('greet', (name: any, age: any) => {
      result.push(`Hello ${name}, age ${age}`)
    })

    emitter.emit('greet', ['Alice', 25])
    assert(result[0] === 'Hello Alice, age 25', 'Should correctly pass arguments to the callback')
  } catch (e: any) {
    console.error('❌ FAILED: Test Case 2 crashed with error:', e.message)
    failed++
  }

  // -------------------------------------------------------------
  // Test Case 3: Multiple subscriptions to the same event
  // -------------------------------------------------------------
  try {
    const emitter = new EventEmitter()
    let sum = 0

    emitter.subscribe('add', (x: any) => { sum += x })
    emitter.subscribe('add', (x: any) => { sum += (x * 2) })

    const outputs = emitter.emit('add', [5]) // 5 + 10 = 15
    assert(sum === 15, 'Both callbacks should execute in order of subscription')
    assert(Array.isArray(outputs) && outputs.length === 2, 'emit() should return an array of results from all callbacks')
  } catch (e: any) {
    console.error('❌ FAILED: Test Case 3 crashed with error:', e.message)
    failed++
  }

  // -------------------------------------------------------------
  // Test Case 4: Unsubscribe functionality
  // -------------------------------------------------------------
  try {
    const emitter = new EventEmitter()
    let count = 0
    const cb = () => { count++ }

    const sub = emitter.subscribe('click', cb)
    emitter.emit('click') // count = 1

    sub.unsubscribe()
    emitter.emit('click') // count should still be 1

    assert(count === 1, 'Callback should not execute after unsubscribe is called')
  } catch (e: any) {
    console.error('❌ FAILED: Test Case 4 crashed with error:', e.message)
    failed++
  }

  // -------------------------------------------------------------
  // Test Case 5: Emitting an event with no subscribers
  // -------------------------------------------------------------
  try {
    const emitter = new EventEmitter()
    const outputs = emitter.emit('nonExistentEvent', [1, 2, 3])

    assert(Array.isArray(outputs) && outputs.length === 0, 'Emitting an event with no subscribers should return an empty array')
  } catch (e: any) {
    console.error('❌ FAILED: Test Case 5 crashed with error:', e.message)
    failed++
  }

  // -------------------------------------------------------------
  // Test Case 6: Unsubscribing one of multiple identical callbacks
  // -------------------------------------------------------------
  try {
    const emitter = new EventEmitter()
    let count = 0
    const cb = () => { count++ }

    const sub1 = emitter.subscribe('test', cb)
    const sub2 = emitter.subscribe('test', cb)

    sub1.unsubscribe()
    emitter.emit('test')

    assert(count === 1, 'Only one instance of the callback should be removed; the other should still run')
  } catch (e: any) {
    console.error('❌ FAILED: Test Case 6 crashed with error:', e.message)
    failed++
  }

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n--- TEST SUMMARY ---')
  console.log(`Total Passed: ${passed}`)
  console.log(`Total Failed: ${failed}`)
  if (failed === 0) {
    console.log('🎉 All tests passed successfully!')
  } else {
    console.log('⚠️ Fix the failing tests before submitting to LeetCode.')
  }
}

// Execute the test runner
runTests()
