/* Handling events involves responding to user interactions, such as clicks, submissions, and keypresses, on web pages. By registering event listeners, you can execute specific actions or functions when an event occurs. 
Additionally, understanding the event object and its properties allows you to access information related to the event. Event delegation is a technique that optimizes event handling by assigning a single event listener to a parent element instead of attaching listeners to multiple child element
*/

//Registering event listeners to respond to user interactions
const button = document.querySelector('#btn');
button.addEventListener('click',handleClick);
function handleClick(e){
    console.log('The button works!');
    console.log('Event Object:',e);
    console.log('Event type:',e.type);
    console.log('Event target:',e.target);
}

//Register a submit event listener on a form
const form = document.querySelector('#myForm');
form.addEventListener('submit',handleSubmit);

function handleSubmit(e){
    //prevents form submission
    e.preventDefault();

    const name_input = document.querySelector('#name');
    const name_value = name_input.value;
    console.log(`Submitted name: ${name_value}`);

    //set the name_value to the first list element with id input-text
    const input_text = document.querySelector('#input-text');
    input_text.innerHTML = name_value;

    //clear input
    name_input.value = '';
}
