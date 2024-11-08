function calcGrade(){
    let grade = parseInt(prompt("Enter grade:"));
    if(grade >= 90) {
        alert("Your Grade is A");
    }else if(grade >= 80 && grade <= 89){
        alert("Your Grade is B");
    }else if(grade >= 70 && grade <= 79){
        alert("Your Grade is C");
    }else if(grade >= 60 && grade <= 69){
        alert("Your Grade is D");
    }else if( grade < 60){
        alert("Your Grade is F");
    }else{
        alert("Not a number, please try again.");
    }
}
