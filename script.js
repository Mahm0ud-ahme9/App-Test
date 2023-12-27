const startbutton = document.getElementById('start-btn')
const nextbutton = document.getElementById('next-btn')
const questioncontainerelement = document.getElementById('question-container')
const questionelement = document.getElementById('question')
const answerbuttonselement = document.getElementById('answer-buttons')

let shuffledquestions, currentquestionindex

startbutton.addEventListener('click', startgame)
nextbutton.addEventListener('click', () => {
  currentquestionindex++
  setnextquestion()
})

function startgame() {
  startbutton.classList.add('hide')
  shuffledquestions = questions.sort(() => Math.random() - .5)
  currentquestionindex = 0
  questioncontainerelement.classList.remove('hide')
  setnextquestion()
}

function setnextquestion() {
  resetstate()
  showquestion(shuffledquestions[currentquestionindex])
}

function showquestion(question) {
  questionelement.innerText = question.question
  question.answer.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectanswer)
    answerbuttonselement.appendChild(button)
  })
}

function resetstate() {
  clearstatusclass(document.body)
  nextbutton.classList.add('hide')
  while(answerbuttonselement.firstChild) {
    answerbuttonselement.removeChild(answerbuttonselement.firstChild)
  }
}

function selectanswer(e) {
 const selectedbutton = e.target
 const correct = selectedbutton.dataset.correct
 setstatusclass(document.body,correct)
 Array.from(answerbuttonselement.children).forEach(button => {
  setstatusclass(button, button.dataset.correct)
 }) 
 if (shuffledquestions.length > currentquestionindex + 1){
  nextbutton.classList.remove('hide')
 }else{
  startbutton.innerText = 'Restart'
  startbutton.classList.remove('hide')
 }
}

function setstatusclass(element, correct) {
  clearstatusclass(element)
  if (correct) {
    element.classList.add('correct')
  }else {
    element.classList.add('wrong')
  }
}

function clearstatusclass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'what is 2 + 2 ?',
    answer:[
      {text: '4', correct: true},
      {text:'22', correct: false}
    ]
  },
  {
    question: 'what is 5 * 2 ?',
    answer:[
      {text: '10', correct: true},
      {text:'20', correct: false}
    ]
  },
  {
    question: 'what are the programming languages ?',
    answer:[
      {text: 'HTML', correct: true},
      {text:'HTTP', correct: false},
      {text:'HSS', correct: false},
      {text:'JM', correct: false}
    ]
  },
  {
    question: 'what Are the types of (SEO) ?',
    answer:[
      {text: 'on page', correct: true},
      {text:'meta description', correct: false}
    ]
  },
  {
    question: 'what Are the types of marketing ?',
    answer:[
      {text: 'Digital Marketing', correct: true},
      {text:'traditional marketing', correct: true},
      {text:'search engine optimization', correct: false}
    ]
  }
]