let age = 18;
if( age >= 18){
    console.log("You are eligible to vote.");
}else{
    console.log("You are not eligible to vote.");
}

//Loops
// while loop
let count = 1;
while(count <= 5){
    console.log("Count:", count);
    ++count;
}

//do while loop
let i = 1;
do{
    console.log("Do while count:", i);
    i++;
}while(i <= 5);

//for loop
for(let i = 1; i<=5; ++i){
    console.log("Count:", i);
}

// alert("Hello");
// let name = prompt("Enter Name:");
// alert("Hello " + name);

let number = prompt("Enter Number:");
alert(20 + parseInt(number));
