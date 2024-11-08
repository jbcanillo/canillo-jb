// Variables
let name = "John";
name = 'Paul';
const temp = 100;

//Outputting Variables
console.log(name);
console.log(temp);

// Basic Syntax
let x = 5;
let y = 10;
let sum = x + y;
console.log(sum);

// Primitive types: These are the most basic data types in JavaScript:
// Number: Represents numeric values. For example, 5, 3.14, -10.
// String: Represents textual data enclosed in single ('') or double ("") quotes. For example, "Hello", 'JavaScript'.
// Boolean: Represents either true or false (logical values)
// Null: Represents the intentional absence of any object value.
// Undefined: Represents an uninitialized or missing value.

//Primitive data types
let boy = "Julian"; //string
let age = 25; //number
let isStudent = true; //boolean
let car = null; //null
let city;

//Outputting Data types
console.log("Type of name:"+boy, typeof name);
console.log("Type of age:", typeof age);
console.log("Type of isStudent:", typeof isStudent);
console.log("Type of car:", typeof car);
console.log("Type of city:", typeof city);

// Operators and Expressions
// Arithmetic Operators

let a = 5;
let b = 2;
let sums = a + b;
console.log("Sum:", sum)

let difference = a - b;
console.log("Difference:", difference);

let product = a * b;
console.log("Product:", product);

let quotient = a / b;
console.log("Quotient:", quotient);

let remainder = a % b;
console.log("Remainder:", remainder);

// Assignment operator
let c = 10;
let d = 5;
c += d;
console.log("c:",c)

c -= d;
console.log("c:",c)

c *= d;
console.log("c:",c)

c /= d;
console.log("c:",c)

// Comparison Operators
let p = 3;
let q = 6;

console.log("p > q:", p > q);
console.log("p < q:", p < q);
console.log("p >= q:", p >= q);
console.log("p <= q:", p <= q);
console.log("p == q:", p == q);
console.log("p === q:", p === q);
console.log("p !== q:", p !== q);

//Logical Operators
let sunny = true;
let warm = false;
console.log("True and False:", sunny && warm);
console.log("True and True:", sunny && sunny);
console.log("True or True:", sunny || warm);
console.log("Not True:", !sunny);