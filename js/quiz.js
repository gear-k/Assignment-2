document.addEventListener('DOMContentLoaded', function() {
  let questions = [];  // This will hold your questions
  let currentQuestionIndex = 0;
  let score = 0;

  fetch('quiz/questions.json')
      .then(response => response.json())
      .then(data => {
          questions = data;
          displayQuestion();
      });

  function displayQuestion() {
      if (currentQuestionIndex < questions.length) {
          const currentQuestion = questions[currentQuestionIndex];
          document.getElementById('question').textContent = currentQuestion.question;
          const buttons = document.querySelectorAll('.ans-btn');
          buttons.forEach((button, index) => {
              button.textContent = currentQuestion.answers[index];
              button.onclick = () => checkAnswer(index);
          });
      } else {
          displayScore();
      }
  }

  function checkAnswer(index) {
      if (index === questions[currentQuestionIndex].correctIndex) {
          score++;
      }
      currentQuestionIndex++;
      displayQuestion();
  }

  function displayScore() {
      document.querySelector('.quiz').innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
  }
});
