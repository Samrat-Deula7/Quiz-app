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
    
    {
        question:"What is the function of a modem ?",
        choice1:"To modulate and demodulate signals for internet access",
        choice2:"To maintain security",
        choice3:"Act as an module",
        choice4:"for sinking two devices",
        answer:1
    },
        
    {
        question:"which device connects a network to the internet ?",
        choice1:"wifi",
        choice2:"Router",
        choice3:"server",
        choice4:"wire",
        answer:2
    },
        
    {
        question:"who was the captain of Argentine in FIFA 2022",
        choice1:"Ronaldo",
        choice2:"pelle",
        choice3:"Lionel Messi",
        choice4:"Ram",
        answer:3
    },
        
    {
        question:"What is the latest iPhone model launched in 2025",
        choice1:"mac Book",
        choice2:"Deep seek",
        choice3:"iPhone 17",
        choice4:"VR",
        answer:3
    },
        
    {
        question:"What is IOT",
        choice1:"Interest Of Things",
        choice2:"Internet Of Things",
        choice3:"Infrastructure Of Things",
        choice4:"Internet Of Transactions",
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