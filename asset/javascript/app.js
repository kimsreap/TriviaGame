
var play = document.querySelector(".play");
var game = document.querySelector(".game");
var question = document.querySelector(".question");
var answerA = document.querySelector(".A");
var answerB = document.querySelector(".B");
var answerC = document.querySelector(".C");
var counter = document.querySelector(".counter");
var timeRun = document.querySelector(".timeRun");
var progress = document.querySelector(".progress");
var scoreResult = document.querySelector(".scoreDiv");

const questions = [
    {
        question : "Where is the Statue of Liberty?",
        answerA : "A : New York Harbor", answerB : "B : Long Island", answerC : "C : Boston Harbor",
        correct : "A"
    },
    {
        question : "What is the name of the U.S national anthem?",
        answerA : "A : American the Beautiful", answerB : "B : The Star-Spangled Banner", answerC : "C :God Bless the USA",
        correct : "B"
    },
    {
        question : "What is one right or freedom from the Amendment?",
        answerA : "A : To bear arms",answerB : "B : To vote",answerC : "C : Speech",
        correct : "C"
    }
];


var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
var timeRemaining = 20; 
var gaugeWidth = 300; 
var Unit = gaugeWidth / timeRemaining;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
}

play.addEventListener("click",startQuiz);


function startQuiz(){
    play.style.display = "none";
    renderQuestion();
    game.style.display = "block";
    renderProgress();
    renderQuest();
    TIMER = setInterval(renderQuest,1000);

}

function renderProgress(){
    for(let QuestionIn = 0; QuestionIn <= lastQuestion; QuestionIn++){
        progress.innerHTML += "<div class='prog' id="+ QuestionIn +"></div>";
    }
}


function renderQuest(){
    if(count <= timeRemaining){
        counter.innerHTML = count;
        timeRun.style.width = count * Unit;
        count++
    }else{
        count = 0;
        wrongAns();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    function correctAns(){
    }
    if( answer == questions[runningQuestion].correct){
        score++;
        correctAns();
    }
    else{
    function wrongAns(){
    } wrongAns();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function scoreRender(){
    scoreResult.style.display = "block";
    const Percent = Math.round(100 * score/questions.length);
    let Image = (Percent >= 80) ? +"<img src= Image/well.jpg >":              
                (Percent >= 60)  ? +"<img src=Image/good.jpg >":              
                (Percent >= 40)  ? +"<img src=Image/help.jpg >":              
                (Percent >= 20)  ? + "<img src=Image/sorry.jpg":
              Image/well.jpg;    
    scoreResult.innerHTML += "<p>"+ Percent + "%" + Image + "</p>";
}



