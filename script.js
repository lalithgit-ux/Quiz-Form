const timerElement = document.getElementById('time');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const submitButton = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

let time = 180; // 3 minutes in seconds
let timerInterval;

const correctAnswers = {
    question1: "Paris",
    question2: "Jupiter",
    question3: "Oxygen",
};

function startTimer() {
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (time === 0) {
            clearInterval(timerInterval);
            autoSubmit();
        }
        time--;
    }, 1000);
}

function evaluateAnswers() {
    let score = 0;
    let feedback = "";

    Object.keys(correctAnswers).forEach(question => {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer) {
            if (userAnswer.value === correctAnswers[question]) {
                score++;
                feedback += `Q${question.slice(-1)}: Correct!\n`;
            } else {
                feedback += `Q${question.slice(-1)}: Wrong! The correct answer is ${correctAnswers[question]}.\n`;
            }
        } else {
            feedback += `Q${question.slice(-1)}: You did not select an answer.\n`;
        }
    });

    return { score, feedback };
}

function autoSubmit() {
    quizSection.style.display = 'none';
    resultsSection.style.display = 'block';

    const { score, feedback } = evaluateAnswers();
    scoreElement.textContent = `Your Score: ${score}/3`;
    feedbackElement.textContent = feedback;
}

submitButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    autoSubmit();
});

startTimer();
