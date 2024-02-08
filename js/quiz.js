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
            document.getElementById("back").classList.toggle("d-none", currentQuestionIndex === 0);
        } else {
            // Display the score and show login form
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
            // Display the score and show login form
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

    // Display the final score and user credentials form
    function displayScore() {
        const quizContainer = document.querySelector(".quiz-container");
        quizContainer.innerHTML = `
            <div class="result-container text-center">
                <h2>Your Score: ${score}/${questions.length}</h2>
                <form id="userCredentialsForm">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Score</button>
                </form>
            </div>`;

        document.getElementById("userCredentialsForm").addEventListener("submit", submitUserCredentials);
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

    // Handle the form submission
    function submitUserCredentials(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        authenticateAndUpdateScore(username, password, score);
    }

    function authenticateAndUpdateScore(username, password, leaderboardScore) {
        var apiKey = "65be5892c1ff3a2d670fe5a0";
        var apiUrl = 'https://signup-828c.restdb.io/rest/signup?q={"username":"' + encodeURIComponent(username) + '"}';
        
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apiKey,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0 && data[0].password === password) {
                const updateUrl = `https://signup-828c.restdb.io/rest/signup/${data[0]._id}`;
                return fetch(updateUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "x-apikey": apiKey,
                    },
                    body: JSON.stringify({ leaderboard: leaderboardScore })
                });
            } else {
                throw new Error("Authentication failed: Incorrect username or password");
            }
        })
        .then(updateResponse => {
            if (!updateResponse.ok) {
                return updateResponse.text().then(text => { throw new Error(`Update failed: ${updateResponse.status}, Body: ${text}`) });
            }
            return updateResponse.json();
        })
        .then(updateData => {
            console.log('Leaderboard Update Success:', updateData);
            // Display completion message
            const quizContainer = document.querySelector(".quiz-container");
            quizContainer.innerHTML = `<div class="text-center"><p>Quiz completed! Redirecting to leaderboard...</p></div>`;
        
            // Redirect to leaderboard.html after a delay
            setTimeout(() => {
                window.location.href = 'leaderboard.html';
            }, 3000); // Adjust the delay here as needed (3000 milliseconds = 3 seconds)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }        
    
});