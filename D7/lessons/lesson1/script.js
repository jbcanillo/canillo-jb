//Accessing elements by ID
//<h1 id="heading">Welcome to DOM Manipulation</h1>
const heading = document.getElementById('heading');
console.log(heading);

//Accessing elements by Class
const text = document.getElementsByClassName('text');
console.log(text);

//Accessing elements by Tagname
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs);

//Accessubg elements by query selector
const heading2 = document.querySelector('#heading');
console.log(heading2);

//Accessubg elements by query selector
const list_items = document.querySelectorAll('#list li');
console.log(list_items);

//Modifying element content using textContent
const first_paragraph = text[0];
first_paragraph.textContent = "This is an updated paragraph";

//Modifying element attributes using setAttribute
const list_item = list_items[0];
list_item.setAttribute('class','highlight');

//Modifying element styles using the style property
const button = document.querySelector('#btn');
button.style.backgroundColor = 'blue';
button.style.color = 'white';

//Creating new elements dynamically
const new_paragraph = document.createElement('p');
new_paragraph.textContent = 'This is a new paragraph';
const container = document.querySelector('.container');
container.appendChild(new_paragraph);

//Removing elements dynamically
const second_list_item = list_items[1];
second_list_item.remove();
