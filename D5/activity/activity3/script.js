var attempts = 0;
function guessSecret() {
  console.clear();
  const secretNumber = parseInt(Math.random() * 10) + 1;
  let guessedNumber;
  console.log('Welcome to "Guess the Secret Number Game"');
  do {
    ++attempts;
    guessedNumber = parseInt(prompt("Enter your guess number (1-10):"));
    if (guessedNumber >= 1 && guessedNumber <= 10) {
      if (guessedNumber < secretNumber) {
        console.log("Too low! Try again.");
      } else if (guessedNumber > secretNumber) {
        console.log("Too high! Try again.");
      } else if (guessedNumber === secretNumber) {
        console.log(
          "Congratulations! You guessed the correct number: " + secretNumber
        );
        console.log("It took you " + attempts + " attempts.");
        attempts = 0;
      }
    } else {
      console.log("Please input only numbers between 1 to 10.");
    }
  } while (guessedNumber !== secretNumber);
}
