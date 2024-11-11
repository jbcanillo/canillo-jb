// Step 1: Create an array called 'students' with three objects representing student information.
// Each student object should have properties: 'name', 'age', and 'grade'.
const students = [
  {
    name: "John Doe",
    age: 18,
    grade: 12,
  },
  {
    name: "Jane Smith",
    age: 17,
    grade: 11,
  },
  {
    name: "Tom Johnson",
    age: 16,
    grade: 10,
  },
];

// Step 2: Access the name of the second student in the 'students' array and log it to the console.
console.log("2nd Student:", students[1].name);

// Step 3: Add a new student object to the 'students' array.
// The new student should have properties: 'name', 'age', and 'grade'.
const new_student = {
  name: "Anna White",
  age: 15,
  grade: 9,
};
students.push(new_student);

// Step 4: Loop through the 'students' array and log each student's name and grade to the console.
students.forEach(function (student) {
  console.log(
    `Student Name: ${student.name} | Student Grade: ${student.grade}`
  );
});

// Step 5: Create an object called 'book' with properties 'title', 'author', and 'year'.
const book = {
  title: "The Holy Bible",
  author: "God",
  year: "1200 BCE",
  getSummary: function () {
    return `The title of the book is ${book.title} and the author is ${book.author} and the year it was published is ${book.year}.`;
  },
};

// Step 6: Access the title of the 'book' object and log it to the console.
console.log("Title of the book:", book.title);

// Step 7: Update the 'year' property of the 'book' object to 1930.
book.year = "1930";

// Step 8: Create a method called 'getSummary' for the 'book' object.
// The method should return a string summarizing the book's title, author, and year.

// Step 9: Call the 'getSummary' method of the 'book' object and log the result to the console.
console.log(book.getSummary());

// Step 10: Create an array called 'library' and add the 'book' object to it.
let library = [];
library.push(book);

// Step 11: Log the 'library' array to the console to verify the book is stored in the array.
console.log(`The library has ${library.length} book:`,library);

// Step 12: Create an object called 'car' with properties 'brand', 'model', and 'year'.
const car = {
    brand: 'Ferrari',
    model: 'F80',
    year: '1990',
    startEngine: function(){
        console.log(`${this.brand + " " +  this.model}'s engine is starting.`);
    }
};

// Step 13: Access the 'model' property of the 'car' object and log it to the console.
console.log(`The model of the car is ${car.model}.`);

// Step 14: Update the 'year' property of the 'car' object to 2023.
car.year = '2023';

// Step 15: Create a method called 'startEngine' for the 'car' object.
// The method should log a message to the console indicating that the car's engine is starting.

// Step 16: Call the 'startEngine' method of the 'car' object.
car.startEngine();

// Step 17: Create an array called 'garage' and add the 'car' object to it.
const garage = [];
garage.push(car);

// Step 18: Log the 'garage' array to the console to verify the car is stored in the array.
console.log(`The garage has ${garage.length} car:`,garage);

// Step 19: Create an object called 'person' with properties 'name', 'age', and 'city'.
const person = {
    name: 'Mike Arnolds',
    age: '23',
    city: 'Los Angeles'
};

// Step 20: Access the 'age' property of the 'person' object and log it to the console.
console.log(`The age of the person is ${person.age}.`);