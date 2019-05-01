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
},
]

var correctGuesses = 0;
var wrongGuesses = 0;
var userGuess;
var questionNum = 0;
var timeLeft = 7;
var qtimer;
var clicked=false;




function showQuestion(){
    clicked = false;
    if (questionNum == questions.length){
        console.log("out of questions");
        showScore();
        return;
    }
    stopTimer();
    
    console.log (questionNum+ "  :  "+questions.length);
    console.log(questions[questionNum].question + "Question# " + questionNum);
    $("#questionDiv").html("<p>"+questions[questionNum].question+"</p>");

    $("#answersDiv").html("");
    for (var i in questions[questionNum].answers){
        $("#answersDiv").append("<div class='answers'>"+ questions[questionNum].answers[i] + "</div>");
    }

    
    //Handler to check what answer you guessed, compare it to the correct answer, and stop the 
    //timer set for that question
    // $(".answers").on("hover")

    $(".answers").on("click",function(){
        clicked = true;
        stopTimer();
        guessed = $(this).text();
        console.log("Player guessed:  " + guessed + "on question#: "+questionNum);
        if (guessed == questions[questionNum-1].correct){
            console.log("Guess was correct!");
            correctGuesses++;
        }
        else {
            console.log("Guess was wrong, correct answer was: "+ questions[questionNum-1].correct);
            wrongGuesses++;
        }
        stopTimer();
        if (questionNum == questions.length){
            console.log('leavinighandler99999');
            stopTimer();
            showScore();
            return;
        }
        if (questionNum < questions.length){            
            showQuestion();
        }


        
    });
    
    if (questionNum == questions.length){
        return;
        // stopTimer();
    }
    else{
        startTimer();

    }
    
    if(!clicked){
        questionNum++;
    }
    console.log ("question number incremented to "+questionNum);

}

//GAME TIMERS
function startTimer(){
    qtimer = setTimeout(showQuestion, 7000);    
}
function stopTimer(){
    clearTimeout(qtimer);
}

//End of Game scoreboard
function showScore(){
$("#questionDiv").html("<div>Correct Answers: "+correctGuesses+"</div>"+
    "<div>Incorrect Answers: "+wrongGuesses+"</div>"+
    "<div>Unanswered questions: "+(questions.length - correctGuesses - wrongGuesses)+"</div>");
$("#answersDiv").html("");
reset_game();
}

function reset_game(){
        
    correctGuesses = 0;
    wrongGuesses = 0;
    questionNum = 0;
    timeLeft = 7;
    clicked=false;
    $("#start").show();    
}


/////////////////////GAME STARTS WHEN THE START BUTTON IS CLICKED

$("#startButton").on("click", function() {
    $("#startButton").hide();
    //  Set the button alert's timeout to run three seconds after the function's called.
    showQuestion();
    
    
  });
        