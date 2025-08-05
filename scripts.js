var questionNo = 0;
let score = 0;
let timer = 10;
var timeInterval = 0;
let timerSpanElt = document.getElementById("timerSpan");
let options = document.getElementById("options"); 
let questionElt = document.getElementById("question");
let restartBtn = document.getElementById("restartBtn");
function loadQuestion(index){ 
    if(questionElt.style.display=="none" || options.style.display=="none"){
        questionElt.style.display = "block";
        options.style.display = "block";
        restartBtn.style.display = "none";
    }
    if(index==0){
        score = 0;
    }
    timer = 10;  
    console.log("1-score="+score);
    getScore(score);
    startTimer();
   
    try{        
        fetch("quiz_data.json")
        .then(response=>response.json())
        .then(quizData=>{
            let quiz = quizData[index];
            questionNo = index;         
            if(questionNo==quizData.length){
                endQuiz();
                return;
            }
            else if(questionNo<quizData.length){               
                questionNo = index;
                questionElt.textContent = 1+questionNo+":"+quiz.question;
                let optionsArr = quiz.options;                 
                for(let i=0;i<optionsArr.length;i++){
                    document.getElementsByClassName("option")[i].textContent = optionsArr[i];
                }
               
               options.addEventListener("click",function(event){
                    let clickedOption = event.target;
                    if(clickedOption.textContent==quiz.answer){                        
                        if(score<=quizData.length){
                            console.log("2-score="+score);
                            score++;
                        }
                        startTimer();
                        timer = 10;
                        loadQuestion(++index);                       
                    }
                    else{   
                        startTimer(); 
                        timer = 10;                  
                        loadQuestion(++index);
                    }                    
                                                      
                });
            }
            
        });
        
    }catch(err){
        console.log(err);
    }
}
function startTimer(){
    //let timeInterval = 0;
    clearInterval(timeInterval);
    timeInterval = setInterval(function(){
        --timer;
        timerSpanElt.innerHTML = timer;
        if(timer==0){            
            endQuiz();
        }
    },1000);
}
function endQuiz(){
    options.style.display =  "none";
    questionElt.style.display = "none";
    restartBtn.style.display = "inline-block";
    clearInterval(timeInterval);  
    score = 0;      
}
function getScore(score){
    document.getElementById("scoreSpan").innerHTML = score;
}

