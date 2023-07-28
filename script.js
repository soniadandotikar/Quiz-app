/* The code is implementing a simple quiz game using JavaScript. It defines an array of questions and
their corresponding answers. The code then sets up the necessary HTML elements and event listeners
to display the questions, handle user answers, and calculate the score. The quiz starts when the
`startQuiz()` function is called. */
if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {

const questions = [
    {
        question: "Which animal is known as the 'Ship of the Desert?",
        answers: [
            { text: "Giraffe", correct: false},
            { text: "Camel", correct: true},
            { text: "Elephant", correct: false},
            { text: "Lion", correct: false},
        ]
    },
    {
        question: "Rainbow consist of how many colours?",
        answers: [
            { text: "6", correct: false},
            { text: "10", correct: false},
            { text: "4", correct: false},
            { text: "7", correct: true},
        ]
    },
    {
        question: "Which animal is known as the king of the jungle?",
        answers: [
            { text: "Giraffe", correct: false},
            { text: "Camel", correct: false},
            { text: "Elephant", correct: false},
            { text: "Lion", correct: true},
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Delhi", correct: true},
            { text: "Banglore", correct: false},
            { text: "Hyderabad", correct: false},
            { text: "Chandigarh", correct: false},
        ]
    },
    {
        question: "Which is the smallest month of the year?",
        answers: [
            { text: "January", correct: false},
            { text: "February", correct: true},
            { text: "December", correct: false},
            { text: "May", correct: false},
        ]
    }
];


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    answerButtons.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        button.classList.add("show");
    });
}

function resetState(){
    if (questionElement !== null && questionElement.firstElementChild !== null) {
    questionElement.firstChild.style.display = 'none';
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        console.log("Score:", score);
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function clearQuestionElement() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function resetState() {
    clearQuestionElement();
    nextButton.style.display = "none";
}

function showScore(){
    resetState();
    console.log("Final Score:", score);
    questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length+ ' !';
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
});
}