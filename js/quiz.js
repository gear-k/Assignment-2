document.addEventListener("DOMContentLoaded", function () {
  let questions = []; // Holds the questions
  let currentQuestionIndex = 0;
  let score = 0;

  fetch("quiz/questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      displayQuestion();
      updateProgressBar();
    });

  function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      document.getElementById("question").textContent =
        currentQuestion.question;
      const answers = document.querySelectorAll(".btn-check");
      answers.forEach((answer, index) => {
        const label = document.querySelector(`label[for='${answer.id}']`);
        label.textContent = currentQuestion.answers[index];
        answer.checked = false; // Clear selection
      });

      document
        .getElementById("back")
        .classList.toggle("d-none", currentQuestionIndex === 0);
      document
        .getElementById("submit")
        .classList.toggle(
          "d-none",
          currentQuestionIndex !== questions.length - 1
        );
    }
  }

  function checkAnswer(index) {
    if (index === questions[currentQuestionIndex].correctIndex) {
      score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
      updateProgressBar();
    }
  }

  function goBack() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
      updateProgressBar();
    }
  }

  function displayScore() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `<div class="result-container text-center"><h2>Your Score: ${score}/${questions.length}</h2><button class="btn btn-primary mt-3" onclick="location.reload()">Try Again</button></div>`;
  }

  function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
  }

  document.querySelectorAll(".btn-check").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Array.from(document.querySelectorAll(".btn-check")).indexOf(
        this
      );
      checkAnswer(index);
    });
  });

  document.getElementById("back").addEventListener("click", goBack);

  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent any form submission behavior
    displayScore(); // Show the final score
  });
});
