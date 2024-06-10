var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keydown(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start = true;
    }
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomVariable = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomVariable];
    gamePattern.push(randomChosenColour);  
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    $("#"+name).fadeOut(100).fadeIn(100).ready(function(){
        var audio = new Audio("sounds/"+name+".mp3");
        audio.play();
    })
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        console.log("wrong");
        $(document).ready(function(){
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
        })
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    start = false;
    gamePattern=[];
}
