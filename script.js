// List of words to use for the typing test
const wordsList = [
  'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'hello', 'world', 'typing', 
  'speed', 'test', 'keyboard', 'function', 'mouse', 'screen', 'internet', 'programming',
  'language', 'developer', 'code', 'computer', 'website', 'design', 'javascript', 'html'
];

let timer;
let startTime;
let wordCount = 0;
let wpm = 0;
let isTestStarted = false;

// Elements
const startButton = document.getElementById('startButton');
const userInput = document.getElementById('userInput');
const wordDisplay = document.getElementById('wordDisplay');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const resultDisplay = document.getElementById('result');

// Function to start the test
function startTest() {
  isTestStarted = true;
  wordCount = 0;
  wpm = 0;
  userInput.disabled = false;
  userInput.value = '';
  resultDisplay.innerHTML = '';
  timerDisplay.innerHTML = '0';
  wpmDisplay.innerHTML = '0';
  
  startButton.disabled = true;
  generateRandomWords();
  
  startTime = Date.now();
  
  timer = setInterval(function () {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.innerHTML = elapsedTime;
    if (elapsedTime >= 60) {
      endTest();
    }
  }, 1000);
  
  userInput.focus();
}

// Function to generate random words
function generateRandomWords() {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  wordDisplay.innerHTML = wordsList[randomIndex];
}

// Function to handle user input
userInput.addEventListener('input', function () {
  if (isTestStarted && userInput.value === wordDisplay.innerHTML) {
    wordCount++;
    wpm = Math.round((wordCount / ((Date.now() - startTime) / 60000)));
    wpmDisplay.innerHTML = wpm;
    
    // Generate a new random word after each correct input
    userInput.value = '';
    generateRandomWords();
  }
});

// Function to end the test
function endTest() {
  clearInterval(timer);
  userInput.disabled = true;
  resultDisplay.innerHTML = `Test completed! Your typing speed was ${wpm} words per minute.`;
  startButton.disabled = false;
}

// Event listener for the Start button
startButton.addEventListener('click', startTest);
