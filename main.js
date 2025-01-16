const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Sahara", correct: true },
            { text: "Buyaka", correct: false },
            { text: "Naina", correct: false },
            { text: "Jokatha", correct: false },
        ],
    },
    {
        question: "Which is the largest waterfall in the world?",
        answers: [
            { text: "Babarakanda", correct: false },
            { text: "Angel Falls", correct: true },
            { text: "Niagara", correct: false },
            { text: "Lill", correct: false },
        ],
    },
    {
        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Arctic", correct: false },
            { text: "Pacific", correct: true },
            { text: "Indian", correct: false },
        ],
    },
    {
        question: "Which is the highest mountain in the world?",
        answers: [
            { text: "Atlas", correct: false },
            { text: "Himalaya", correct: false },
            { text: "Pujima", correct: false },
            { text: "Everest", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.removeEventListener("click", startQuiz); // Ensure no duplicate listeners
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.setAttribute("aria-label", answer.text);
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    nextButton.style.display = "none";
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz, { once: true }); // Listener runs only once
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Restart") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

startQuiz();
