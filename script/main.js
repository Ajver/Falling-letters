var currentLetter = null;
var goodSound = null;
var badSound = null;
var score = 0;
var bestScore = 0;
var speed = 0;
var maxSpeed = 0;

function setup() {
  currentLetter = null;
  goodSound = null;
  badSound = null;
  score = 0;
  speed = 10;
  maxSpeed = 300;

  var gameWindow = document.querySelector(".game-window");
  
  gameWindow.innerHTML =  '<div class="score-label">Score:</div>' +
                          '<div class="score">0</div>' +
                          '<div class="best-score-label">The best score:</div>' +
                          '<div class="best-score">100</div>' +
                          '<div id="letter">G</div>' +
                          '<footer class="game-footer">' +
                            '<div class="game-speed-label">Speed:</div>' +
                            '<div class="game-speed-bar"></div>' +
                          '</footer>';
  
  goodSound = new Audio("sounds/good.wav");
  badSound = new Audio("sounds/bad.wav");
  randLetter();
  setContent();
  update();
}

function update() {
  var height = document.querySelector(".game-window").scrollHeight - 55;
  if(!currentLetter.update(height)) {
    gameOver();
    return;
  }
  
  if(speed > 0) {
    setTimeout("update()", 2000/speed);
  }else {
    setTimeout("update()", 200);
  }
}

function randLetter() {
  var width = document.querySelector(".game-window").scrollWidth;
  currentLetter = new Letter(width-70, speed);
}

function setContent() {
  document.querySelector(".score").innerHTML = score;
  document.querySelector(".best-score").innerHTML = bestScore;

  var maxW = document.querySelector(".game-window").scrollWidth - 120;
  var k = speed / maxSpeed;
  var r = k * 255;
  var g = 255 - (k * 255);
  var speedBar = document.querySelector(".game-speed-bar");
  
  speedBar.style.width = (k * maxW) + "px";
  speedBar.style.backgroundColor = "rgb(" + r + "," + g + ",00)";
  
  currentLetter.setContent();
}

function gameOver() {
  badSound.play();
  var gameWindow = document.querySelector(".game-window");
  gameWindow.classList.add("game-over");
  
  var header = '<h2>Game over</h2>';
  var content = '<p>Your score: <span style="color: #f79a11">' + score + '</span></p>' +
                '<p>Your the best score: <span style="color: #f79a11">' + bestScore + '</span></p>' +
                '<button class="play-again-btn" type="button">Play again</button>';  
  
  gameWindow.innerHTML = header + content;
  
  document.querySelector(".play-again-btn").addEventListener("click", function() {
    setup();
  }, false);
}

window.addEventListener("keydown", function(e) {
  var code = e.keyCode;
  if(code < 65 || code > 90) return;
  
  if(currentLetter.getCode() === code) {
    goodSound.play();
    randLetter();
    speed += 10;
    score += 10;
    if(score > bestScore) {
      bestScore = score;
    }
    if(speed > maxSpeed) {
      speed = maxSpeed;
    }
    setContent();
  }else {
    badSound.play();
  }
}, false);

window.addEventListener("load", setup(), false);