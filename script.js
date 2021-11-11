var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  //hides start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  //shows questions section
  questionsEl.removeAttribute("class");

  //starts timer
  timerId = setInterval(clockTick, 1000);

  //displays starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  //get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  //update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  //clears old questions
  choicesEl.innerHTML = "";

  //loops choices
  currentQuestion.choices.forEach(function(choice, i) {
    //updates button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    //adds onclick event listener to every choice
    choiceNode.onclick = questionClick;

    //displays choices
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  //check if wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    //if user is wrong takes away 10 seconds
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  //gives user feedback if answer is right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  //continues questions
  currentQuestionIndex++;

  //checks if time is still valid
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  //ends timer
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  //gives user final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  //keeps time updated
  time--;
  timerEl.textContent = time;

  //check if time is still valid
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  //takes user input for highscore initials 
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    //accesses highscores from local storage, if none then set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    //create new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    //push highscore object to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    //links to html score page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

//user input initials
submitBtn.onclick = saveHighscore;

//start quiz again
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;