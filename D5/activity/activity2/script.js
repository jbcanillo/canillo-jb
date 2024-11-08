function printRange(){
    let start = parseInt(prompt("Enter starting number:"));
    let end = parseInt(prompt("Enter ending number:"));
    if(end < start){
        return console.log("Ending number must be greater than start number.");
    }
    console.log("The range for "+start+" to "+end+" is:");
    for (let i = start; i <= end; i++) {
        console.log(i);
    }
}