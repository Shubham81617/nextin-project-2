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

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
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
    quizContainer.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
    
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.onclick = restartQuiz;
    quizContainer.appendChild(restartBtn);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", loadQuestion);