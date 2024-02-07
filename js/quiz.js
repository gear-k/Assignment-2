document.addEventListener("DOMContentLoaded", function () {
  let questions = []; // Holds the questions
  let currentQuestionIndex = 0;
  let score = 0;

  // Fetch questions from JSON file
  fetch("quiz/questions.json")
      .then(response => response.json())
      .then(data => {
          questions = data;
          displayQuestion();
          updateProgressBar();
      });

  // Display the current question
  function displayQuestion() {
      if (currentQuestionIndex < questions.length) {
          const currentQuestion = questions[currentQuestionIndex];
          document.getElementById("question").textContent = currentQuestion.question;

          const answers = document.querySelectorAll(".btn-check");
          answers.forEach((answer, index) => {
              const label = document.querySelector(`label[for='${answer.id}']`);
              label.textContent = currentQuestion.answers[index];
              answer.checked = false; // Clear selection
          });

          // Show or hide the back button
          document.getElementById("back")
              .classList.toggle("d-none", currentQuestionIndex === 0);
      }
  }

  // Check if the selected answer is correct
  function checkAnswer(index) {
      if (index === questions[currentQuestionIndex].correctIndex) {
          score++;
      }
      if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          displayQuestion();
          updateProgressBar();
      } else {
          // Display the score if it's the last question
          displayScore();
      }
  }

  // Go back to the previous question
  function goBack() {
      if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          displayQuestion();
          updateProgressBar();
      }
  }

  // Display the final score
  function displayScore() {
      const quizContainer = document.querySelector(".quiz-container");
      quizContainer.innerHTML = `<div class="result-container text-center"><h2>Your Score: ${score}/${questions.length}</h2><button class="btn btn-primary mt-3" onclick="location.reload()">Try Again</button></div>`;
  }

  // Update the progress bar based on the current question
  function updateProgressBar() {
      const progress = (currentQuestionIndex / questions.length) * 100;
      document.querySelector(".progress-bar").style.width = `${progress}%`;
  }

  // Event listener for answer selection
  document.querySelectorAll(".btn-check").forEach(button => {
      button.addEventListener("click", function () {
          const index = Array.from(document.querySelectorAll(".btn-check")).indexOf(this);
          checkAnswer(index);
      });
  });

  // Event listener for back button
  document.getElementById("back").addEventListener("click", goBack);
});
