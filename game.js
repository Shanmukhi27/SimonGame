var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var count=0;


$(".btn").on("click",function() {
    //alert("hi");
    // console.log(this.id);
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1)
});

$(document).on("keypress",function(){
    if(count===0)
    {
        $("h1").text("Level "+count);
        nextSequence();
    }
    
});


function nextSequence()
{   
    userClickedPattern=[];
    count=count+1;
    $("h1").text("Level "+count);
    var randomNumber=Math.floor(Math.random()*4)
   // console.log(randomNumber);
   var randomChosenColor=buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   console.log(gamePattern);
   randomChosenColorId="#"+randomChosenColor;
   $(randomChosenColorId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
    var currentColorId="#"+currentColor;
    $(currentColorId).addClass("pressed");
    setTimeout(function () {
        $(currentColorId).removeClass("pressed");
    },100);
}



function checkAnswer(currentLevel) {

    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      
      if (userClickedPattern.length === gamePattern.length){

        // Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
        },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();

    }

}

function startOver()
{
    count=0;
    gamePattern=[];
}