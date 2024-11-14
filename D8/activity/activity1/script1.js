// Activity: Exploring Common JS Built-in Methods

// Objective: Practice using common JS built-in methods to perform various operations.

// Instructions:
// 1. Create an HTML file with a heading that says "Common JS Built-in Methods".
// 2. Create a JavaScript file and link it to the HTML file.
// 3. In the JavaScript file, you will find comments describing different tasks that need to be performed using common JS built-in methods. Your task is to write the code to complete these tasks.
// 4. The tasks to be completed are as follows:
//    a. Calculate the square root of a given number.
//    b. Generate a random number between 1 and 10.
//    c. Convert a string representation of a number to an actual number.
//    d. Check if a value is not a number.
//    e. Convert a number to a string.

// Note: Read the comments carefully to understand the requirements for each task. Use the appropriate method to accomplish the given task.

// Good luck!

// Your code implementation goes here:

// Calculate the square root of a given number
const squareRoot = (num) => {
    return num * num;
}
console.log("Square root of 3 is ",squareRoot(3));

// Generate a random number between 1 and 10
const randomNumber = (min, max) => {
  if (max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
console.log("Random number:",randomNumber(1, 10));

// Convert a string representation of a number to an actual number
const convertedStrToInt = (num) => parseInt(num);
console.log("String '143' converted to a number:",convertedStrToInt("143"));

// Check if a value is not a number
const strValue = (str) => isNaN(str);
console.log("'abcdef' is not a number?",strValue('abcdef'));

// Convert a number to a string
const convertedIntToStr = (num) => "This is a string: " + num.toString();
console.log(convertedIntToStr(123));
