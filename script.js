function generateRandomNumber() {
    // Generate a random number between 1 and 100
    let randomNum = Math.floor(Math.random() * 100) + 1;
    // Display the number in the paragraph element
    document.getElementById('randomNumber').textContent = randomNum;
}
