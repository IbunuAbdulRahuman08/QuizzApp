var questions = [
    {
        question: "which is largest animal in the world?",
        answers: [
            { Text: "shark",correct: false},
            { Text: "Blue Whale",correct: true},
            { Text: "Elephant",correct: false},
            { Text: "Giraffe",correct: false},


        ]
    },
    {
        question: "which is the smallest country in the world?",
        answers: [
            { Text: "vatican city",correct: true},
            { Text: "Bhutan",correct: false},
            { Text: "Nepal",correct: false},
            { Text: "Shri Lanka",correct: false},


        ]

    },
    {
        question: "which is largest desert in the world",
        answers: [
            { Text: "kalahari",correct: false},
            { Text: "Gobi",correct: false},
            { Text: "Sahara",correct: false},
            { Text: "Antarctica",correct: true},


        ]
    },
    {
        question: "which is smallest continent in the world?",
        answers: [
            { Text: "Asia",correct: false},
            { Text: "Australia",correct: true},
            { Text: "Arctic",correct: false},
            { Text: "Africa",correct: false},


        ]
    }
];
var questionElement = document.getElementById("question");
var answerButton = document.getElementById("answer-button");
var nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score if the answer is correct
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=> {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"

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







nextButton.addEventListener("click" ,() => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
