let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
  const response = await fetch('questions.json');
  const data = await response.json();
  questions = data.questions;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionContainer = document.getElementById('quiz-container');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');

  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Shuffle the options so that they appear in random order
  shuffleArray(currentQuestion.options);

  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    alert('Correct!');
  } else {
    alert(`Incorrect! The correct answer is ${currentQuestion.answer}.`);
  }

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    alert('Quiz completed! You can restart the quiz.');
    currentQuestionIndex = 0;
    shuffleArray(questions); // Shuffle the questions for the next quiz
    displayQuestion();
  }
}

function nextQuestion() {
  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    alert('Quiz completed! You can restart the quiz.');
    currentQuestionIndex = 0;
    shuffleArray(questions); // Shuffle the questions for the next quiz
    displayQuestion();
  }
}

// Fetch questions and display the first question on page load
fetchQuestions().then(() => {
  shuffleArray(questions); // Shuffle the questions for the initial quiz
  displayQuestion();
});
