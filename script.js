// script.js
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            { text: "Shark", correct: false},
            { text: "Elephant", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            { text: "Asia", correct: false},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
            { text: "Australia", correct: true},
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false },
            { text: "London", correct: false }
        ]
    },
    {
        question: "How many continents are there in the world?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mercury", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ".  " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        button.addEventListener("click", () => selectAnswer(button, answer.correct));
    });

    // Show the "Next" button after options are displayed
    //nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, isCorrect) {
    if (answered) {
        return; // If already answered, do nothing
    }

    answered = true;
    if (isCorrect) {
        button.style.backgroundColor = "#b8ffc3"; // Green for correct answer
        score++;
    } else {
        button.style.backgroundColor = "#fca59f"; // Red for wrong answer
        // Find the correct answer button and set its color to green
        const correctButton = Array.from(answerButtons.children).find(btn => btn.innerText === questions[currentQuestionIndex].answers.find(ans => ans.correct).text);
        if (correctButton) {
            correctButton.style.backgroundColor = "#b8ffc3";
        }
    }

    // Disable all buttons after the user selects an answer
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Show the "Next" button after the user selects an answer
    nextButton.style.display = "block";
}
function showNextQuestion() {
    answered = false;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // If there are no more questions, show the final score
        questionElement.innerHTML = "Quiz is over! Your score is: " + score + " out of " + questions.length;
        resetState();
    }
}

// Add event listener to the "Next" button
nextButton.addEventListener("click", showNextQuestion);

startQuiz();
