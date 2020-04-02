// All questions with answer choices and correct answer
const questions = [ {
    question: 'What is glass made from?',
    possibleAnswers: ['Sand', 'Milk', 'Squirrels', 'Magnets'],
    correctAnswer: 'Sand'
    },
    { question: 'What is glass formed by lightning strikes known as?',
    possibleAnswers: ['Fulgerites', 'Eons', 'Thimbles', 'Attrition'],
    correctAnswer: 'Fulgerites'
    },
    { question: 'What state of matter is glass?',
    possibleAnswers: ['Delta Wave', 'Gamma Ray', 'Liquid', 'Amorphous Solid'],
        correctAnswer: 'Amorphous Solid'
    },
    {  question: 'How much pressure is required to score glass?',
    possibleAnswers: ['David Bowie', '6 pounds', '2 tons', '7 atmospheres'],
    correctAnswer: '6 pounds'
    },
    {  question: ' How long is it estimated that it takes a glass bottle to decompose in the environment?',
    possibleAnswers: ['1 million years', '2 miles', '3 decades', '4 calling birds'],
    correctAnswer: '1 million years'
    },
];

//Set initial variables
let questionNumber = 0;
let score = 0;

//See what to do when our button is clicked
$('button').on("click", (function (event) {
    let classNow = $(this).attr("class");
    
    //when quiz starts show the stats and start asking questions
    if (classNow === "start") {
        updateStats();
        populateQuestion();
        changeButton(classNow);
    }
    //when user submits an answer check to see if it's correct
    else if (classNow === "submitAnswer") {
        checkAnswer();
    }
    //when user has answered, prompt for the next question
    else if (classNow === "nextQuestion") {
        questionNumber++;
        if (questionNumber > 4) {
            restartQuiz();
        }
        else {
        updateStats();
        populateQuestion();
        changeButton(classNow);
        } 
    }
}));
  // Change the button class and text to prepare for the users next action
  function changeButton(whatClass){
    if (whatClass === "start") {
        $('button').toggleClass("start submitAnswer");
        $('button').text('Submit Answer');
      } 
    else if (whatClass === "submitAnswer"){
        $('button').toggleClass("submitAnswer nextQuestion");
        $('button').text('Next Question');
    }
    else if (whatClass === "nextQuestion"){
        $('button').toggleClass("nextQuestion submitAnswer");
        $('.feedback').text("");
        $('button').text("Submit Answer")
    }
  }

  // Show question with possible answers
  function populateQuestion() {
    $(".insertQuestion").html(
        `<li>${questions[questionNumber].question}</li>
         <li><input type='radio' id='${questions[questionNumber].possibleAnswers[0]}' name='answer' value='${questions[questionNumber].possibleAnswers[0]}'>
         <label for="${questions[questionNumber].possibleAnswers[0]}">${questions[questionNumber].possibleAnswers[0]}</li>
         <li><input type='radio' id='${questions[questionNumber].possibleAnswers[1]}' name='answer' value='${questions[questionNumber].possibleAnswers[1]}'>
         <label for="${questions[questionNumber].possibleAnswers[1]}">${questions[questionNumber].possibleAnswers[1]}</li>
         <li><input type='radio' id='${questions[questionNumber].possibleAnswers[2]}' name='answer' value='${questions[questionNumber].possibleAnswers[2]}'>
         <label for="${questions[questionNumber].possibleAnswers[2]}">${questions[questionNumber].possibleAnswers[2]}</li>
         <li><input type='radio' id='${questions[questionNumber].possibleAnswers[3]}' name='answer' value='${questions[questionNumber].possibleAnswers[3]}'>
         <label for="${questions[questionNumber].possibleAnswers[3]}">${questions[questionNumber].possibleAnswers[3]}</li>`);
        }

  // Show user the question they are on and what their score is
  function updateStats() {
    $(".score").text(`Question: ${questionNumber+1} of 5; Score: ${score}`);
  }

  function checkAnswer(){
    //make sure an answer was selected and see if it is correct, handle score accordingly
    if ($('input[name=answer]:checked').length > 0) {    
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = questions[questionNumber].correctAnswer;
        if (answer === correct) {
          score++;
          $('.feedback').text('Correct!')
          updateStats();
          changeButton("submitAnswer");
          $("body").removeClass("building broken");
          $("body").addClass("stained");
        }
        else if (answer != correct) {
          $('.feedback').text(`The correct answer is ${questions[questionNumber].correctAnswer}.`)
          updateStats();
          changeButton("submitAnswer");
          $("body").removeClass("building stained");
          $("body").addClass("broken");
        }
    }
    //if an answer was not selected inform user to answer
    else {
      alert("Please select an answer to proceed.");
    }
 }

  function nextQuestion(){
      updateStats();
      populateQuestion();
      $(".feedback").text("");
  }

  function restartQuiz(){
    questionNumber = 0;
    $(".score").text(`You scored ${score} out of 5.`);
    score = 0;
    $(".insertQuestion").text('Would you like to take the quiz again?')
    $(".feedback").text("");
    $('button').toggleClass("start nextQuestion");
    $('button').text("Start Over")
    $("body").removeClass("stained broken").addClass("building");
  }