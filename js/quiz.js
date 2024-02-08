document.addEventListener("DOMContentLoaded", function () {
  let questions = []; // Holds the questions
  let currentQuestionIndex = 0;
  let score = 0;

  // Fetch questions from JSON file
  fetch("../json/quiz/questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      displayQuestion();
      updateProgressBar();
    });

  // Display the current question
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

      // Show or hide the back button
      document
        .getElementById("back")
        .classList.toggle("d-none", currentQuestionIndex === 0);
    } else {
      // Display the score
      displayScore();
    }
  }

  // Check if the selected answer is correct
  function checkAnswer(index) {
    if (index === questions[currentQuestionIndex].correctIndex) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
      updateProgressBar();
    } else {
      // Display the score
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
    quizContainer.innerHTML = `
            <div class="result-container text-center">
                <h2>Your Score: ${score}/${questions.length}</h2>
                <button id="submitScoreButton" class="btn btn-primary">Submit Score</button>
            </div>`;

    document
      .getElementById("submitScoreButton")
      .addEventListener("click", submitScore);
  }

  // Update the progress bar based on the current question
  function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
  }

  // Event listener for answer selection
  document.querySelectorAll(".btn-check").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Array.from(document.querySelectorAll(".btn-check")).indexOf(
        this
      );
      checkAnswer(index);
    });
  });

  // Event listener for back button
  document.getElementById("back").addEventListener("click", goBack);

  // Submit score
  function submitScore() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
    const sessionToken = localStorage.getItem("sessionToken");

    if (isLoggedIn === "true" && userId && sessionToken) {
      updateLeaderboard(userId, score, sessionToken);
    } else {
      alert("Please log in to submit your score.");
      // Redirect to login page or show login form
      // window.location.href = 'login.html';
    }
  }

  function updateLeaderboard(userId, leaderboardScore, sessionToken) {
    var apiKey = "65be5892c1ff3a2d670fe5a0";
    var apiUrl = `https://signup-828c.restdb.io/rest/signup/${userId}`;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
        Authorization: `Bearer ${sessionToken}`, // Using session token for authorization
      },
      body: JSON.stringify({ leaderboard: leaderboardScore }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update leaderboard");
        }
        return response.json();
      })
      .then((updateData) => {
        console.log("Leaderboard Update Success:", updateData);
        alert("Score submitted successfully!");
        window.location.href = "leaderboard.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit score. Please try again.");
      });
  }
});
