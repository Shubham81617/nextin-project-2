const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "10", "15"],
        answer: "8"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showWelcomeScreen() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    const welcomeText = document.createElement("h2");
    welcomeText.textContent = "Welcome to the Quiz App!";
    quizContainer.appendChild(welcomeText);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your name";
    nameInput.id = "player-name";
    quizContainer.appendChild(nameInput);

    const startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.onclick = () => {
        playerName = document.getElementById("player-name").value.trim();
        if (playerName) {
            loadQuestion();
        } else {
            alert("Please enter your name to continue.");
        }
    };
    quizContainer.appendChild(startButton);
}

function loadQuestion() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    if (currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];
        const questionEl = document.createElement("h2");
        questionEl.textContent = questionObj.question;
        quizContainer.appendChild(questionEl);

        const options = shuffleArray([...questionObj.options]);
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => selectAnswer(option, button);
            quizContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

function selectAnswer(selectedAnswer, button) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
        button.style.backgroundColor = "#28a745";
    } else {
        button.style.backgroundColor = "#dc3545";
    }
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

function showResult() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = `<h2>${playerName}, Your Score: ${score}/${questions.length}</h2>`;
    
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.onclick = restartQuiz;
    quizContainer.appendChild(restartBtn);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showWelcomeScreen();
}

document.addEventListener("DOMContentLoaded", showWelcomeScreen);