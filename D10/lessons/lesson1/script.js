// // Object Literals
// const circle = {
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1
//     },
//     draw: () => {
//         console.log('draw');
//     }
// };
// circle.draw();

// //Factory Function
// function createCircle(radius){
//     return {
//         radius,
//         draw: ()=> {
//             console.log('draw');
//         }
//     }
// }
// const circle2 = createCircle(1);
// circle2.draw();

// //Constructor Function
// function Circle(radius){
//     console.log(this);
//     this.radius = radius;
//     this.draw = ()=>{
//         console.log('draw');
//     }
// }
// const another = new Circle(1);
// Circle.call({},1); //is equivalent to above line
// Circle.apply({},[1,2,3]);

// const Circle1 = new Function('radius',`
//     this.radius = radius;
//     this.draw = ()=>{
//      console.log('draw');
//     }
//     `);
// const circle3 = new Circle1(10);

// let x = { value: 10};
// let y = x;
// x.value = 20;

// //Value Types
// let number = 10;
// function increase(number){
//     number++;
// }
// increase(number);
// console.log(number);

// //Objects/Reference Types
// let obj = { value: 10};
// function increase2(obj){
//     obj.value++;
// }
// increase2(obj);
// console.log(obj);

// circle3.location = {x:1};
// circle3['location'] = {x:1};//same as above line

// delete circle3.location;

// for (let key in circle3){
//     if( typeof circle3[key] !== 'function')
//     console.log(key, circle3[key]);
// }

// const keys = Object.keys(circle3);
// console.log(keys);

// if('radius' in circle3)
//     console.log('Circle has a radius!');

// function CircleX(radius){
//     this.radius = radius;
//     let defaultLocation = {x:0, y:0};
//     this.getDefaultLocation = () =>{
//        return defaultLocation;
//     }
//     this.draw = () => {
//         console.log('draw');
//     }
//     Object.defineProperty(this,'defaultLocation', {
//         get: function(){
//             return defaultLocation;
//         },
//         set: function(){
//             if(!value.x || !value.y)
//                 throw new Error('Invalid location.')
//             defaultLocation = value;
//         }
//     });
// }

// const circlex = new CircleX(10);
// circlex.getDefaultLocation = 1;

function Stopwatch() {
  let startTime,
    endTime,
    running,
    duration = 0;
  this.start = () => {
    if (running) throw new Error("Stop watch is already running!");
    running = true;
    startTime = new Date();
  };

  this.stop = () => {
    if (!running) throw new Error("Stopwatch is not yet started!");
    running = false;
    endTime = new Date();
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = () => {
    startTime = null;
    endTime = null;
    running = false;
    duration = 0;
  };

  Object.defineProperty(this, "duration", {
    get: () => duration,
  });
}

const sw = new Stopwatch();
// sw.start();
