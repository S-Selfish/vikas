const quiz = document.getElementById('quiz');
var answerElements = document.querySelectorAll('.answer');
var questionElement = document.getElementById('question');
var questionNumber = document.getElementById('question_number');

var a_text = document.getElementById('a_text');
var b_text = document.getElementById('b_text');
var c_text = document.getElementById('c_text');
var d_text = document.getElementById('d_text');
var e_text = document.getElementById('e_text');

const rightArrow = document.querySelector(".quiestion-right");
const leftArrow = document.querySelector(".question-left");

var submit = document.getElementById('submit');
submit.addEventListener('click', btn_click);


document.querySelector(".leave-page").addEventListener("click", () => {
    window.location.href = "index.html"
})


var correct_li = ''

questions = []
incorrect_questions = []

for (let i = count_from - 1; i < count_to; i++) {
    questions.push(i)
}
questions.sort(() => .5 - Math.random());
questions = questions.slice(0, count);
console.log(questions)
if (!questions[0]) {
    questionNumber.innerHTML = 'Если ты это видишь - значит ты идиот! Укажи нормальные параметры тестирования!!!'
}

let currentQuiz = 0;
let score = 0;

// if ()
loadQuiz();

let li_list = document.querySelectorAll(".li");
li_list.forEach(element => {
    element.addEventListener("click", (event) => {
        event.target.childNodes[1].checked = true;
    })
})


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[questions[currentQuiz]];

    questionElement.innerHTML = currentQuizData.question;
    questionNumber.innerHTML = `${currentQuiz + 1}/${questions.length}`

    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
    e_text.innerHTML = currentQuizData.e;

    for (let i = 0; i < 10; i++) {
        insertAfter(document.getElementById('li' + getRandomInt(1, 6)), document.getElementById('li' + getRandomInt(1, 6)))
    }

}

function deselectAnswers() {
    answerElements.forEach(answerEl => answerEl.checked = false)
    quiz.classList.remove('correct')
    quiz.classList.remove('incorrect')
}

/* rightArrow.addEventListener("click", () => {
    if (currentQuiz < questions.length) {
        currentQuiz++;
        loadQuiz();
    }
})

leftArrow.addEventListener("click", () => {
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    }
}) */

function getSelected() {
    let answer;

    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function getCorrect() {
    let correct = document.querySelector('#a')

    return correct;
}

checkCorrect = true

function loadIncorrectQuiz() {
    deselectAnswers();

    questions = incorrect_questions
    incorrect_questions = []
    currentQuiz = 0
    score = 0;

    const currentQuizData = quizData[questions[currentQuiz]];

    quiz.innerHTML = `
    <div class="quiz-header">
                <h3 id="question_number">
                    
                </h3>
                <h2 id="question">
                    Question
                </h2>
                <ul>
                    <li id="li1" class="li">
                        <input type="radio" name="answer" id="a" class="answer">
                        <label for="a" id="a_text"> 1
                        </label>
                    </li>
                    <li id="li2" class="li">
                        <input type="radio" name="answer" id="b" class="answer">
                        <label for="b" id="b_text">2
                        </label>
                    </li>
                    <li id="li3" class="li">
                        <input type="radio" name="answer" id="c" class="answer">
                        <label for="c" id="c_text">3
                        </label>
                    </li>
                    <li id="li4" class="li">
                        <input type="radio" name="answer" id="d" class="answer">
                        <label for="d" id="d_text">4

                        </label>
                    </li>
                    <li id="li5" class="li">
                        <input type="radio" name="answer" id="e" class="answer">
                        <label for="e" id="e_text">5

                        </label>
                    </li>
                </ul>
            </div>
            <button id="submit">Ответить!</button>
            
    `;


    answerElements = document.querySelectorAll('.answer');
    questionElement = document.getElementById('question');
    questionNumber = document.getElementById('question_number');

    a_text = document.getElementById('a_text');
    b_text = document.getElementById('b_text');
    c_text = document.getElementById('c_text');
    d_text = document.getElementById('d_text');
    e_text = document.getElementById('e_text');

    submit = document.getElementById('submit');
    submit.addEventListener('click', btn_click);


    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
    e_text.innerHTML = currentQuizData.e;

    let li_list = document.querySelectorAll(".li");
    li_list.forEach(element => {
        element.addEventListener("click", (event) => {
            event.target.childNodes[1].checked = true;
        })
    })

    questionElement.innerHTML = currentQuizData.question;
    questionNumber.innerHTML = `${currentQuiz + 1}/${questions.length}`

    for (let i = 0; i < 10; i++) {
        insertAfter(document.getElementById('li' + getRandomInt(1, 6)), document.getElementById('li' + getRandomInt(1, 6)))
    }
}

function btn_click() {
    if (checkCorrect) {
        const answer = getSelected();

        if (answer) {
            if (answer === quizData[questions[currentQuiz]].correct) {
                quiz.classList.add('correct')
                score++;
            } else {
                correct = getCorrect()
                correct_li = correct.closest('li');
                correct_li.style.color = 'LimeGreen'
                correct_li.style.fontWeight = "Bold"
                correct_li.style.border = 'solid LimeGreen'
                quiz.classList.add('incorrect')
                incorrect_questions.push(questions[currentQuiz])
            }

            checkCorrect = false
            submit.innerHTML = 'Следующий вопрос!'
        }

    } else {

        currentQuiz++;
        checkCorrect = true
        if (currentQuiz < questions.length) {
            loadQuiz();
            submit.innerHTML = 'Ответить!'
            correct_li.style.color = ''
            correct_li.style.fontWeight = "normal"
            correct_li.style.border = 'solid 1px #dddddd '
        }
        else {
            console.log(incorrect_questions)
            if (incorrect_questions.length) {
                console.log(incorrect_questions.length)
                quiz.innerHTML = `<h2>You answered coreectly at ${score}/${questions.length} questions. It is ${score / questions.length * 100}%</h2>
                <button class="good_btn" onclick="location.reload()">Начать снова</button>
                <button class="good_btn" onclick="loadIncorrectQuiz()">Прорешать ошибки</button>
                `;
            } else {
                quiz.innerHTML = `<h2>You answered coreectly at ${score}/${questions.length} questions. It is ${score / questions.length * 100}%</h2>
                <button class="good_btn" onclick="location.reload()">Начать снова</button>`
            }
        }
    }
}



