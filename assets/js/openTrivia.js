





//utility array sort to sort question array
// function found at : https://stackoverflow.com/a/12646864

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

// array1 = shuffle([1,2,3,4,5,6,7,8,9,10]);
// console.log(array1);

function getQuestions(){
    var triviaURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy";
    var questions;

    var formatted = [];
    var formattedQuestion;
    var formattedAnswers;
    var formattedQuestions = [];

    
    $.ajax({
        url: triviaURL,
        method: "GET"
    })
        .then(function(response) {
            // console.log(response);
            questions = response.results;        
            // console.log(questions);
            // test = questions[0].incorrect_answers;
            // test1= questions[0].correct_answer;
            // test.push(test1);
            // console.log("test= " + test);
            processResults();
        });

    function processResults(){
        
        for(var i in questions){
            tempAns = questions[i].incorrect_answers;
            // console.log("tempans: " +tempAns);
            tempCor = questions[i].correct_answer;
            // console.log("tempCor: "+tempCor);
            allAnswers = tempAns.concat(tempCor);
            allAnswers = shuffle(allAnswers);
            for (var ct in allAnswers){
                // allAnswers[ct]=allAnswers[ct].replace(/&quot;/g, '\\"');
                allAnswers[ct]=decodeURI(allAnswers[ct]).replace(/&quot;/g, '\\"');
            }
            formattedQuestion = {
                question : decodeURI(questions[i].question).replace(/&quot;/g, '\\"'),
                answers : allAnswers,
                // correct : questions[i].correct_answer.replace(/&quot;/g, '\\"')
                correct : decodeURI(questions[i].correct_answer).replace(/&quot;/g, '\\"')
            }
            formattedQuestions.push(formattedQuestion);
            
        }
        //  console.log(formattedQuestions);
        // for(var j  formattedQuestions[0].answers){
            // console.log(formattedQuestions[0].answers[i]);
        // }
    }


    return formattedQuestions;
}