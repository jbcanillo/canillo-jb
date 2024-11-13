//Accessing parent, child, and sibling elements using DOM traversal methods

//Access the parent element of a specific element
const container = document.querySelector('#container');
console.log(container.parentNode);

//Access the child elements of a specific element
const paragraphs = container.children;
console.log(paragraphs)

//Access the first child element
const first_paragraph = container.firstElementChild;
console.log(first_paragraph);

//Access the next sibling element
const second_paragraph = first_paragraph.nextElementSibling;
console.log(second_paragraph);

//Navigating the DOM tree using properties like parentNode, children, and nextSibling
console.log(second_paragraph.parentNode);

//Access the child elements of a specific element using children property
const content_div = document.querySelector('.content');
const nested_paragraph = content_div.children[0];
console.log(nested_paragraph);

// Access the previous sibling element using previousSibling property
console.log(nested_paragraph.previousSibling); // Output: #text (line break)

// Access the next sibling element using nextSibling property
console.log(nested_paragraph.nextSibling); // Output: null
