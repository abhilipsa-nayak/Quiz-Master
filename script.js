const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: 1
    },
    {
        question: "Which language is mainly used to add interactivity to a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },
    {
        question: "Which HTML element is used to create a hyperlink?",
        options: [
            "link element",
            "href element",
            "anchor element",
            "url element"
        ],
        answer: 2
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "foreground"
        ],
        answer: 2
    },
    {
        question: "Which symbol is commonly used to select an element by its ID in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "constant"
        ],
        answer: 2
    },
    {
        question: "Which method is used to select an element by its ID in JavaScript?",
        options: [
            "document.getElementById()",
            "document.getElement()",
            "document.selectById()",
            "document.findElement()"
        ],
        answer: 0
    },
    {
        question: "Which JavaScript method is used to display something in the browser console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "console.print()"
        ],
        answer: 0
    },
    {
        question: "Which HTML element is used to create a button?",
        options: [
            "input element",
            "click element",
            "button element",
            "btn element"
        ],
        answer: 2
    }
];

const startButton = document.getElementById("start-quiz-btn");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const questionTitle = document.getElementById("question-title");
const answerOptions = document.getElementById("answer-options");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let selectedAnswers = new Array(questions.length).fill(null);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswers.fill(null);

    startButton.style.display = "none";
    quizSection.style.display = "block";
    resultSection.style.display = "none";

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];

    questionTitle.textContent = question.question;

    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;

    answerOptions.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        const label = document.createElement("span");
        const text = document.createElement("span");

        button.type = "button";
        button.className = "answer-option";

        label.className = "option-label";
        label.textContent = String.fromCharCode(65 + index);

        text.className = "option-text";
        text.textContent = option;

        button.appendChild(label);
        button.appendChild(text);

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerOptions.appendChild(button);
    });

    if (selectedAnswers[currentQuestion] !== null) {
        showPreviousAnswer();
    }

    previousButton.disabled = currentQuestion === 0;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finish"
            : "Next";
}

function selectAnswer(selectedIndex) {
    if (selectedAnswers[currentQuestion] !== null) {
        return;
    }

    selectedAnswers[currentQuestion] = selectedIndex;

    if (selectedIndex === questions[currentQuestion].answer) {
        score++;
    }

    showAnswer(selectedIndex);
}

function showAnswer(selectedIndex) {
    const buttons = answerOptions.querySelectorAll(".answer-option");
    const correctIndex = questions[currentQuestion].answer;

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add("incorrect");
        }
    });
}

function showPreviousAnswer() {
    const selectedIndex = selectedAnswers[currentQuestion];

    if (selectedIndex === null) {
        return;
    }

    showAnswer(selectedIndex);
}

function showNextQuestion() {
    if (selectedAnswers[currentQuestion] === null) {
        return;
    }

    if (currentQuestion === questions.length - 1) {
        showResult();
        return;
    }

    currentQuestion++;
    showQuestion();
}

function showPreviousQuestion() {
    if (currentQuestion === 0) {
        return;
    }

    currentQuestion--;
    showQuestion();
}

function showResult() {
    quizSection.style.display = "none";
    resultSection.style.display = "block";

    scoreElement.textContent =
        `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswers.fill(null);

    quizSection.style.display = "block";
    resultSection.style.display = "none";

    showQuestion();
}

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", showNextQuestion);

previousButton.addEventListener("click", showPreviousQuestion);

restartButton.addEventListener("click", restartQuiz);

quizSection.style.display = "none";
resultSection.style.display = "none";