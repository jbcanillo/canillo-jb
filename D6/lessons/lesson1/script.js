// Introduction to arrays

// Creatting an array
let fruits = ["apple", "bannana", "orange"];

// Accessing Array elements
console.log("First Fruit:", fruits[0]);
console.log("Second Fruit:", fruits[1]);
console.log("Third Fruit:", fruits[2]);

// Topic: Modifying Arrays
fruits[1] = "grape";
fruits.push("strawberry");
console.log("Pushed Array:", fruits);
fruits.pop(); // Removes the last element
console.log("Modified Array:", fruits);

//Array Iteration
let numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Array forEach method
let colors = ['red','green','blue'];
colors.forEach(
    function(color){
        console.log(color)
    }
);

// Methods and Properties
// length
console.log('Array Length:', numbers.length);4
// indexOf
console.log('Index of 3:', numbers.indexOf(3));
// includes
console.log('Includes 5:', numbers.includes(5));
//join
console.log('Joined Array:', numbers.join(' - '));
//slice
let splicedArray = numbers.slice(1,4);
console.log('Spliced Array:', splicedArray);
