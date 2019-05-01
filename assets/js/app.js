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
var wrongGuess = 0;
var userGuess;
var questionNum = 0;
var timeLeft = 7;
var qtimer;





function showQuestion(){
    
    console.log(questions[questionNum].question + "Question# " + questionNum);
    $("#questionDiv").html("<p>"+questions[questionNum].question+"</p>");

    $("#answersDiv").html("");
    for (var i in questions[questionNum].answers){
        $("#answersDiv").append("<div class='answers'>"+ questions[questionNum].answers[i] + "</div>");
    }

    
    //Handler to check what answer you guessed, compare it to the correct answer, and stop the 
    //timer set for that question

    $(".answers").on("click",function(){
        guessed = $(this).text();
        console.log("Player guessed:  " + guessed + "on question#: "+questionNum);
        if (guessed == questions[questionNum-1].correct){
            console.log("Guess was correct!")
        }
        else {
            console.log("Guess was wrong, correct answer was: "+ questions[questionNum-1].correct);
        }
        stopTimer();
        if (questionNum < questions.length){            
            showQuestion();
        }
    });
    
    questionNum++;

    if (questionNum == questions.length){
        console.log("out of questions");
        stopTimer();
    }
    else{
        startTimer();

    }
}

function startTimer(){
    
    qtimer = setTimeout(showQuestion, 7000);
    
}
function stopTimer(){
    clearTimeout(qtimer);

}


$("#startButton").on("click", function() {
    //  Set the button alert's timeout to run three seconds after the function's called.
    showQuestion();
    $("startButton").off();
    
  });

