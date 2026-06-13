// 2705. Compact Object

// type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
// type Obj = Record<string, JSONValue> | Array<JSONValue>;

type JSONValue = null | boolean | number | string | JSONArray | JSONObject;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

/**
 * Recursion
 * T: O(n); S: O(Depth)
 */
function compactObject(obj: JSONValue): JSONValue {
  // Base case: if it's null or not an object, return it as-is
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Case 1: If it's an array, filter out falsy values and recursively compact the rest
  if (Array.isArray(obj)) {
    const compactedArray: JSONValue[] = [];
    for (const item of obj) {
      if (Boolean(item)) {
        compactedArray.push(compactObject(item));
      }
    }
    return compactedArray;
  }

  // Case 2: If it's a plain object, recursively compact its key-value pairs
  const compactedObj: JSONObject = {};
  for (const [key, value] of Object.entries(obj)) {
    if (Boolean(value)) {
      compactedObj[key] = compactObject(value);
    }
  }

  return compactedObj;
}

/**
 * Stack Iteration
 * T: O(n); S: O(Depth)
 */
function compactObject2(obj: JSONValue): JSONValue {
  // Quick escape for primitives or null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Initialize root container matching the input type
  const root: JSONValue = Array.isArray(obj) ? [] : {};

  const stack: [JSONValue, JSONValue][] = [[obj, root]];

  while (stack.length > 0) {
    const [currObj, newCurrObj] = stack.pop()!;

    if (Array.isArray(currObj) && Array.isArray(newCurrObj)) {
      // Safe Array Handling
      for (const val of currObj) {
        if (!val) continue;

        if (typeof val !== 'object') {
          newCurrObj.push(val);
        } else {
          const newSubObj: JSONValue = Array.isArray(val) ? [] : {};
          newCurrObj.push(newSubObj);
          stack.push([val, newSubObj]);
        }
      }
    } else if (currObj !== null && typeof currObj === 'object' && !Array.isArray(newCurrObj)) {
      // Safe Object Handling
      // Cast newCurrObj to JSONObject to allow key assignment safely
      const targetObj = newCurrObj as JSONObject;

      for (const [key, val] of Object.entries(currObj)) {
        if (!val) continue;

        if (typeof val !== 'object') {
          targetObj[key] = val;
        } else {
          const newSubObj: JSONValue = Array.isArray(val) ? [] : {};
          targetObj[key] = newSubObj;
          stack.push([val, newSubObj]);
        }
      }
    }
  }

  return root;
}

// const obj = [null, 0, false, 1]
// const expected = [1]
const obj = { "a": null, "b": [false, 1] }
const expected = { "b": [1] }
// const obj = [null, 0, 5, [0], [false, 16]]
// const expected = [5, [], [16]]


const ans = compactObject2(obj)

console.log('Input: ', obj)
console.log('expected: ', expected)
console.log('answer: ', ans)
