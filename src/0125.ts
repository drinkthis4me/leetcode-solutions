// 125. Valid Palindrome

/**
 * Two Pointers
 * T: O(n); S: O(n);
 */
function isPalindrome(s: string): boolean {
  // Convert to lowercase and remove all non-alphanumeric characters
  const converted = s.toLowerCase().replace(/[^0-9a-z]/g, '')

  let n = converted.length
  let left = 0
  let right = n - 1

  while (left < right) {
    if (converted[left] !== converted[right]) {
      return false
    }
    left++
    right--
  }

  return true
};

/**
 * Two Pointers (Optimized)
 * T: O(n); S: O(1);
 */
function isPalindrome2(s: string): boolean {
  let left = 0
  let right = s.length - 1

  // Helper fn to check if string is alphanumeric
  const isalnum = (str: string): boolean => {
    return /[a-zA-Z0-9]/.test(str)
  }

  while (left < right) {
    // Advance pointers if the current char is not alphanumeric
    while (left < right && !isalnum(s[left]!)) {
      left++
    }
    while (left < right && !isalnum(s[right]!)) {
      right--
    }

    // Compare lower-cased characters
    if (s[left]!.toLowerCase() !== s[right]!.toLowerCase()) {
      return false
    }

    // Advance pointers
    left++
    right--
  }

  return true
};



// const s = "A man, a plan, a canal: Panama"
// const expected = true
// const s = "race a car"
// const expected = false
// const s = " "
// const expected = true
const s = "ab_a"
const expected = true

const output = isPalindrome2(s)

console.log('Input: ', s)
console.log('expected: ', expected)
console.log('output: ', output)