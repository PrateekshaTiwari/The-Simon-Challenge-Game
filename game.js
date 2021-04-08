var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence() {
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern.length);
});

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
$(document).keypress(nextSequence);
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
        $("h1").html("Game over, Press any key to Restart");
        var over = new Audio("sounds/wrong.mp3");
        over.play();
        $("body").addClass("game-over");
        setTimeout(function () { $("body").removeClass("game-over") }, 200);
        startover();
    }
    else if((currentLevel===level)&&(userClickedPattern[level] === gamePattern[level])) {
        level++;
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}
function startover() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}