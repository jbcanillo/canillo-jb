// Step 1: Declare a function named isEven that takes a number as a parameter and returns true if the number is even and false otherwise.
function isEven(num) {
  return num % 2 === 0 ? true : false;
}

// Step 2: Use a for loop to iterate from 0 to 10. Call the isEven function for each iteration and log the result to the console.
for (i = 0; i <= 10; i++) {
  let result = isEven(i);
  console.log(i + " is even? ", result);
}

// Step 3: Declare a function named multiply that takes two numbers as parameters and returns their product.
function multiply(num1, num2) {
  return num1 * num2;
}

// Step 4: Use a while loop to repeatedly prompt the user to enter two numbers and calculate their product using the multiply function. Log the result to the console. Terminate the loop when the user enters a negative number as any of the inputs.
while (1) {
  let mul1 = parseInt(prompt("Please enter 1st number:"));
  if(mul1 < 0) break;
  let mul2 = parseInt(prompt("Please enter 2nd number:"));
  if(mul2 < 0) break;
  let product = multiply(mul1, mul2);
  console.log(`The product of ${mul1} and ${mul2} is ${product}`);
}

// Step 5: Declare a function named reverseString that takes a string as a parameter and returns the reversed version of the string.
function reverseString(word) {
  return word.split("").reverse().join("");
}

// Step 6: Call the reverseString function with the string 'hello' and log the result to the console.
console.log("The reverse form of the word hello is", reverseString("hello"));

// Step 7: Declare a function named countVowels that takes a string as a parameter and returns the number of vowels in the string.
function countVowels(word) {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  let letters = word.toLowerCase().split("");
  letters.forEach(function (letter) {
    if (vowels.includes(letter)) count++;
  });
  return count;
}

// Step 8: Call the countVowels function with the string 'JavaScript' and log the result to the console.
console.log(
  'The number of vowels in "JavaScript" is ',
  countVowels("JavaScript")
);

// Step 9: Declare a function named findMax that takes an array of numbers as a parameter and returns the maximum value in the array.
function findMax(numbers) {
  let max_number = 0;
  numbers.forEach(function (number) {
    if (number > max_number) max_number = number;
  });
  return max_number;
}

// Step 10: Call the findMax function with the array [4, 9, 2, 7, 5] and log the result to the console.
console.log("The max number is ", findMax([4, 9, 2, 7, 5]));

// Step 11: Declare a function named calculateFactorial that takes a number as a parameter and returns its factorial value.
function calculateFactorial(num) {
  let factorial = 1;
  for (i = 1; i <= num; i++) {
    factorial *= i;
  }
  return factorial;
}

// Step 12: Call the calculateFactorial function with the number 5 and log the result to the console.
console.log("The factorial of 5 is ", calculateFactorial(5));

// Step 13: Declare a function named isPalindrome that takes a string as a parameter and returns true if the string is a palindrome and false otherwise.
function isPalindrome(word){
    let orig_word = word.toLowerCase();
    let reversed_word = orig_word.split('').reverse().join('');
    return (orig_word === reversed_word) ? true : false;
}

// Step 14: Call the isPalindrome function with the string 'level' and log the result to the console.
console.log('The word "level" is palidrome? ', isPalindrome('level'));

// Step 15: Declare a function named sumArray that takes an array of numbers as a parameter and returns the sum of all the numbers in the array.
function sumArray(numbers){
    let sum = 0;
    numbers.forEach(function (number) {
      sum += number;
    });
    return sum;
}

// Step 16: Call the sumArray function with the array [1, 2, 3, 4, 5] and log the result to the console.
console.log('The sum is:', sumArray([1, 2, 3, 4, 5]));

// Step 17: Declare a function named capitalizeFirstLetter that takes a string as a parameter and returns the string with the first letter capitalized.
function capitalizeFirstLetter(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Step 18: Call the capitalizeFirstLetter function with the string 'javascript' and log the result to the console.
console.log(capitalizeFirstLetter('javascript'));

// Step 19: Declare a function named filterEvenNumbers that takes an array of numbers as a parameter and returns a new array with only the even numbers.
function filterEvenNumbers(numbers){
    let even = [];
    numbers.forEach(function (number) {
      if (number % 2 === 0) even.push(number);
    });
    return even;
}

// Step 20: Call the filterEvenNumbers function with the array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] and log the result to the console.
console.log("The even numbers are:",filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
