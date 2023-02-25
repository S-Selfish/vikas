const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const questionList = document.querySelector(".question-numlist")
const questionWrapper = document.querySelector(".shit")

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const e_text = document.getElementById('e_text');

let currentQuestion = 0

function loadQuiz(currentQuestionID) {
    const currentQuizData = quizData[currentQuestionID];
    questionElement.innerHTML = currentQuizData.question;

    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
    e_text.innerHTML = currentQuizData.e;
}
/*Это то что тебе нужно брат // */
/*                          <=  */
const myAnswers = {}

function pushAnswer(answerId, myAnswer) {
    myAnswers[answerId] = myAnswer
    return console.log(myAnswers)
}



//Для выбора ответов
let li_list = document.querySelectorAll(".li");
li_list.forEach(element => {
    element.addEventListener("click", (event) => {
        if (!event.target.className) {
            pushAnswer(currentQuestion ,event.target.closest(".text").previousElementSibling.id)

        } 
        if (event.target.className == "answer") {
            pushAnswer(currentQuestion, event.target.id)
        }
        event.target.childNodes.forEach(element => {
            if (element.className == "answer") {
                event.target.childNodes[1].checked = true
                pushAnswer(currentQuestion, event.target.childNodes[1].id)
            }
        })
           // Боже мой сколько форычей, за то мне кажется я нашёл ошибку в мобильной версии тестов
    })
})


for (let i = 1; i <= quizData.length; i++) {
    questionList.innerHTML += `<div class="question-numitem">
    <div class="question-num">${i}</div>
    </div>`
}
questionList.insertAdjacentElement("afterbegin", questionWrapper)

const submit = document.getElementById('submit');
loadQuiz(currentQuestion);
/*Это мои кнопочки отображают состояние current finished and standard*/
const questionItem = document.querySelectorAll(".question-numitem")
questionItem.forEach(element => {
    element.addEventListener("click", (e) => {

        li_list.forEach(element => {
            element.childNodes[1].checked = false
        })

        e.target.closest(".question-numitem").classList.add("current")
        currentQuestion = e.target.innerText - 1
        loadQuiz(currentQuestion)

    })
})


submit.addEventListener('click', () => {
    currentQuestion += 1
    loadQuiz(currentQuestion)
})


