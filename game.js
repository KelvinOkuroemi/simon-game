let gamePattern = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStarted = false;

/**EVENT LISTENERS */

// detect key press
$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

// Detect button press
$(".start-btn").click(function(){
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
})

//detecting clicks
$(".btn").click(function () {
  let userChosenColour = this.id; // or alert($(this).attr('id'));
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  comparePatterns(userClickedPattern.length - 1);
  console.log(userClickedPattern[userClickedPattern.length - 1]);
  console.log(gamePattern);
});

/**FUNCTIONS */
//Generates Random Color
function nextSequence() {
  //anytime this function is called, the userclicked array is set to empty, meanwhile the game pattern is always increased
  userClickedPattern = [];
  let random = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[random];
  gamePattern.push(randomChosenColour);

  //Makes element flash
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //plays sound on auto
  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  //update level
  $("#level-title").text(`level ${level}`);
  level++;
}

//plays sound when clicked
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

//animate button
function animatePress(lastPickedColour) {
  $(".btn").click(function () {
    let userChosenColour = this.id;
    lastPickedColour = userChosenColour;
    //adds class
    $(`.${lastPickedColour}`).addClass("pressed");
    //remove after 0.1 seconds
    setTimeout(function () {
      $(`.${lastPickedColour}`).removeClass("pressed");
    }, 100);
  });
}

//compares patterns
function comparePatterns(lastPickedColour) {
  if (userClickedPattern[lastPickedColour] === gamePattern[lastPickedColour]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    checkForLoss(lastPickedColour)
    startOver()
  }
}

//check for loss
function checkForLoss(currentChoice) {
  if (userClickedPattern[currentChoice] !== gamePattern[currentChoice]) {
    let audio = new Audio(`sounds/wrong.mp3`);
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Key to Restart")
    
  }
}

//Start over
function startOver(){
  level = 0
  gamePattern = []
  gameStarted = false
}
