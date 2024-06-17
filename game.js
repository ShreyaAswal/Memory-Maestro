var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("body").on("keypress", function (e) {
    if ((e.key === 'a' || e.key === 'A') && level===0) {
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").on("click", function (event) {
    var userClickedButton = event.target.id;
    animatePress(userClickedButton);
    userClickedPattern.push(userClickedButton);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(val){
    var a = new Audio("sounds/" + val + ".mp3");
    a.play();
    if (val == "wrong") {
        $("h1").text("Game Over,Press any key to Restart");
        $("body").addClass("game-over", setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200));
        startOver();
    }
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed", setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    },100));
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        playSound(userClickedPattern[currentLevel]);

        if (currentLevel === gamePattern.length - 1)
            setTimeout(nextSequence,700);
    }
    else {
        playSound("wrong");
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    $("body").on("keypress", function () {
            if(level===0)nextSequence();
    });
}