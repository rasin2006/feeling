// Define the animals array with their names and image file paths
const animals = [
    { name: 'Happy', image: 'happy3.jpg' },
    { name: 'Sad', image: 'sad.avif' },
    { name: 'Angry', image: 'angry.jpg' },
    { name: 'Scared', image: 'fear.jpg' },
    { name: 'Disgusted', image: 'disgust.jpg' },
    { name: 'Yummy', image: 'yummy.jpg' },
    { name: 'Confuse', image: 'confuse.jpg' },
    { name: 'Excited', image: 'excited.jpg' },
    { name: 'Embarrassed', image: 'embarrassed.jpg' },
    { name: 'Bored', image: 'bored.jpg' },
    { name: 'Curious', image: 'curious.jpg' },
    { name: 'Relief', image: 'relief.jpg' },
    { name: 'Shy', image: 'shy.jpg' },
    { name: 'Disappointed', image: 'disappointed.jpg' },
    { name: 'Nervous', image: 'nervous.jpg' },
    { name: 'Fresh', image: 'fresh.jpeg' },
    { name: 'Relax', image: 'relax.jpg' },
    { name: 'Exhausted', image: 'exhausted.jpg' },
    { name: 'Hot', image: 'hot.jpg' },
    { name: 'Cold', image: 'cold.jpeg' },
    { name: 'Nervous', image: 'nervous.jpg' },
    { name: 'Sick', image: 'sick.jpg' },
    { name: 'Sleepy', image: 'sleepy.jpg' },
    { name: 'Dizzy', image: 'dizzy.jpg' },
    { name: 'Surprised', image: 'surprise.jpeg' },
    { name: 'Shock', image: 'shock.jpg' },
    { name: 'Hurt', image: 'hurt.jpeg' },
    { name: 'Loved', image: 'loved.jpg' },
    { name: 'Proud', image: 'proud.jpg' },
    { name: 'Confused', image: 'confuse.jpeg' },
    { name: 'Hungry', image: 'hungry.jpg' },
    { name: 'Silly', image: 'silly.jpg' }
];

// Variables for tracking the current level and shuffled order of animals
let currentLevel = 0;
let shuffledLevels = shuffleArray([...Array(animals.length).keys()]);
let clickCount = 0;  // Counter for image clicks

// Function to start the game
function startGame() {
    loadLevel(currentLevel);
    // Add click event listener to animal image for speech
    document.getElementById('animalImage').addEventListener('click', speakAnimalName);
    const animal = animals[shuffledLevels[currentLevel]];
    const utterance = new SpeechSynthesisUtterance(animal.name);
    speechSynthesis.speak(utterance);
}

// Function to load each level randomly
function loadLevel(levelIndex) {
    const level = shuffledLevels[levelIndex];
    const animal = animals[level];
    const wrongOptions = animals.filter(a => a !== animal);

    document.getElementById('animalImage').src = animal.image;

    const options = shuffleArray([animal.name, ...getRandomOptions(wrongOptions, 3)]);
    options.forEach((option, index) => {
        document.getElementById(`option${index}`).textContent = option;
    });
    // Reset click count for the new level
    clickCount = 0;

    document.getElementById('gameMessage').textContent = '';
}

// Function to make the browser say the animal name when image is clicked
function speakAnimalName() {
    if (clickCount < 2) {  // Allow speaking the name only if clicked less than 3 times
        const animal = animals[shuffledLevels[currentLevel]];
        const utterance = new SpeechSynthesisUtterance(animal.name);
        speechSynthesis.speak(utterance);
        clickCount++;  // Increment click count
    }
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex) {
    const selectedOption = document.getElementById(`option${selectedIndex}`).textContent;
    const correctAnswer = animals[shuffledLevels[currentLevel]].name;

    if (selectedOption === correctAnswer) {
        document.getElementById('gameMessage').textContent = 'Correct!';
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}
// Function to play the sound if correct
function checkAnswer(selectedIndex) {
    const selectedOption = document.getElementById(`option${selectedIndex}`).textContent;
    const correctAnswer = animals[shuffledLevels[currentLevel]].name;

    if (selectedOption === correctAnswer) {
        document.getElementById('gameMessage').textContent = 'Correct!';
        // Play the correct answer sound
        document.getElementById('correctSound').play();
        setTimeout(() => {
            nextLevel();
        }, 1000);
    } else {
        // Play the shake animation on the button
        const selectedButton = document.getElementById(`option${selectedIndex}`);
        shakeButton(selectedButton);
    }
}

// Function to shake the button
function shakeButton(button) {
    button.classList.add('shake');

    // Remove the 'shake' class after the animation ends
    setTimeout(() => {
        button.classList.remove('shake');
    }, 500); // Match the animation duration in CSS
}


// Function to move to the next random level
function nextLevel() {
    currentLevel = (currentLevel + 1) % animals.length;
    if (currentLevel === 0) shuffledLevels = shuffleArray([...Array(animals.length).keys()]);
    loadLevel(currentLevel);
    const animal = animals[shuffledLevels[currentLevel]];
    const utterance = new SpeechSynthesisUtterance(animal.name);
    speechSynthesis.speak(utterance);
}

// Helper function to get random options from the wrong answers
function getRandomOptions(arr, count) {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count).map(item => item.name);
}

// Helper function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
// Select all buttons with the class 'option-button'
const buttons = document.querySelectorAll('.option-button');

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Disable the button
    this.disabled = true;

    // Optionally perform your desired action here, like moving to the next level
    handleButtonClick(this);

    // Re-enable the button after 1 second (1000 milliseconds)
    setTimeout(() => {
      this.disabled = false;
    }, 1400);  // Adjust the timeout period as needed
  });
});

function handleButtonClick(button) {
  // Add your button click handling logic here
  console.log(button.textContent + " clicked!");
}

function changeAnimalImage(animalName) {
    const animalImage = document.getElementById('animalImage');
    animalImage.src = ''; // Clear the image first
    setTimeout(() => {
        animalImage.src = `path/to/your/images/${animalName}.jpg`; // Then load the new image
    }, 10); // Small delay ensures the image is properly reset
}

// Start the game once the window loads
window.onload = startGame;
