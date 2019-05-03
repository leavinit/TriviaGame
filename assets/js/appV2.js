//VARS

var questions = [ 
    {
        question    :   "What is 10 x 4?",
        answers     : ["20","30","50","40"],
        correct     : "40"
    },
    
    {
        question    :   "What is 50 / 10?",
        answers     : ["20","10","5","4"],
        correct     : "5"
    },
    
    {
        question    :   "What is 60 - 15?",
        answers     : ["45","40","35","25"],
        correct     : "45"
    },
    
    {
        question    :   "What is 22 - 10?",
        answers     : ["2","12","80","10"],
        correct     : "12"
    }
]

var qNum = 0;
var gameDone = false;
var picked = false;  //whether or not an answer was selected.
var correctTotal = 0;
var wrongTotal = 0;
var right = false;
var correctAns = "";

function ask(){
    picked = false;
    // console.log("ask starts, picked "+picked);

    //Correct answer saved to display after the timer is done/question is picked
    correctAns = questions[qNum].correct;

    $("#answersDiv").html("");
    var curQ = questions[qNum].question;
    var curA = questions[qNum].answers;
    console.log(curQ);
    console.log(curA);
    
    //Update Question
    var el = $("<div>").text(curQ);
    $("#questionDiv").html(el);
    
    //Update Answers
    for(var i in curA){
        var el = $("<div>").text(curA[i])
        el.css("outline","2px solid black");
        el.css("padding","6px");
        $("#answersDiv").append(el);
    }
    $("#answersDiv").children().hover(
        function(){$(this).css("background-color","grey")},
        function(){$(this).css("background-color","white")});
    
    $("#answersDiv").children().click(function(){
        console.log($(this).text());
        
        //Clicking stops the question timer via the time var
        time = 0;
        picked = true;

        //Get the answer selected and check if correct
        var guessed = $(this).text();
        if (guessed == questions[qNum-1].correct){
            console.log("Player guessed : " + guessed +" it was correct.");
            correctTotal += 1;
            right = true;
        }
        else {
            console.log("Player guessed : " + guessed +" it was wrong.");
            wrongTotal += 1;
            
            
        }
        console.log("Correct answer was: " + questions[qNum-1].correct);
    });
    
    
    if (!picked){
        qNum++;
    }
    if(qNum == questions.length){
        gameDone = true;
        stopTimer();
        return;
    }
    // console.log("Ask done, next q is : "+qNum);
    // console.log("questions.length: " +questions.length);
}



function displayAnswer(){
    $(".game").hide();
    $("#afterQuestionDiv").show();
    var msg = "Your guess was not correct, the correct answer was "+ correctAns;
    if(right){
        msg = "Your guess was correct!"
    }
    right = false;
    var el = $("<div id='answerMsgDiv'>").text(msg);
    $("#afterQuestionDiv").css("text-align","center")
    .css("font-size","1.5em");
    $("#afterQuestionDiv").html(el);
    startAnsTimer();
}

var ansTimer;
function startAnsTimer(){
    ansTimer = setTimeout(startGame,4000);
}
// function stopAnsTimer(){}

var time = 5;
function showTime(){
    time--;
    $("#timeDiv").html("<div>Time Remaining:  "+time+"</div>");
    
    if (time <= 0){
        stopTimer();
        time = 7;
        displayAnswer();
        
    }
}

var qTimer;
function startTimer(){
    qTimer = setInterval(showTime,1000);
}
function stopTimer(){
    clearInterval(qTimer);
}


function gameReset(){
    console.log('Resetting function started');
    $(".game").hide();
    $("#startDiv").show();
    var msg = "<div id='rmsg1'><p>Score last round:</p>  "+ correctTotal +" correct "+ wrongTotal + " wrong</div>"
    $("#restartMsgDiv").html(msg);
    $("#restartMsgDiv").css("padding","6px").css("margin-left","18%")
        .css("font-size","2em");
    $("#afterQuestionDiv").hide();
    qNum = 0;
    gameDone = false;
    correctTotal = 0;
    wrongTotal = 0;
    right = false;
    correctAns = "";

    
}
/////////////////////////////

$("#startButton").on("click",startGame);
$(".game").hide();
$("#startDiv").show();
$("#afterQuestionDiv").hide();

function startGame(){
    $(".game").show();
    $("#startDiv").hide();
    $("#afterQuestionDiv").hide();
    if(!gameDone){
        ask();
        $("#timeDiv").html("<div>Time Remaining:  "+time+"</div>");
        startTimer();
    }
    else{
        gameReset();
    }
}

