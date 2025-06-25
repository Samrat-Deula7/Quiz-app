let question =document.getElementById("question");
const choices =Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText=document.getElementById("questionCounter");
const scoreText=document.getElementById("score");


let currentQuestion ={};
let acceptingAnswers=false;
let score =0;
let questionCounter=0;
let availableQuestions=[];

let questions =[
    {
        question:"Which country has the larget economy in the world ?",
        choice1:"chaina",
        choice2:"India",
        choice3:"United States",
        choice4:"New Zealand",
        answer:3
    },

    {
        question:"Who was the runner-up in ICC World Cup 2019 ?",
        choice1:"United States",
        choice2:"china",
        choice3:"New Zealand",
        choice4:"India",
        answer: 3
    },
        {
        question:"What does IP stand for ?",
        choice1:"Internet Protocol",
        choice2:"Interest Protocol",
        choice3:"Internet Pass",
        choice4:"Interest Port",
        answer:1
    },

    {
        question:"Who was the first president of Nepal",
        choice1:"kp woli",
        choice2:"Dr. Ram Baran Yadav",
        choice3:"Dr stone",
        choice4:"Dr samrat",
        answer:2
    },
]


// constants

const correctBonus=10;
const maxQuestions=3;

incrementScore=(num)=>{
    score+=num;
    scoreText.innerText=score;
}

getNewQuestion =()=>{

    if(availableQuestions.length == 0 || questionCounter == maxQuestions){
        return window.location.assign('end.html');
    }
    questionCounter ++;
    questionCounterText.innerText=`${questionCounter}/${maxQuestions}`

    const questionIndex= Math.floor(Math.random()*availableQuestions.length);
    currentQuestion =availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+number];
    });

    availableQuestions.splice(questionIndex,1); /*  To remove the question that has just been asked*/
    acceptingAnswers=true;
};

choices.forEach(choice=>{
    choice.addEventListener('click', (e)=>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer? "correct":"incorrect";

        if(classToApply == 'correct'){
            incrementScore(correctBonus)
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
        
            getNewQuestion();
        },1000)
     
    });
})


startGame =()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
};


startGame();