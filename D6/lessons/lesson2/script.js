// Step1: Create an object leteral represnenting a person

//Step2 Add properties to the object
const person = {
  firstname: 'John',
  lastname: 'Doe',
  age: 25,
  hobbies: ['reading','coding','hiking'],

  greet: function(){
    console.log(`Hello, my name is ${this.firstname}` )
  }
};

const students = [
  {
    name: 'John Doe',
    age: 18,
    grade: 12
  },
  {
    name: 'Jane Smith',
    age: 17,
    grade: 11
  },
  {
    name: 'Tom Johnson',
    age: 16,
    grade: 10
  }
];

