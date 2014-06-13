var _ = require("underscore");
var Backbone = require("backbone");
var Mode = require("../standing-novation-mode");
var COLORS = require('midi-launchpad').colors;

var Brick = require("./Brick");

var isActive= false;


var colors = [
  COLORS.red.high,
  COLORS.yellow.high,
  COLORS.green.high,
  COLORS.orange.high,
];

var score = 0;
var running = false;
var gameInterval;

var game = {
  score: 0,
  activeBrick: undefined,
  launchpad: undefined,
  running: false,
  randomColor: function() {
    return colors[Math.floor(Math.random() * colors.length)];
  },
  themeAudio: undefined,
  playTheme: function() {
    if (!this.running || !isActive) return;
    this.themeAudio = game.launchpad.playAudio(__dirname+"/theme.mp3", function() {
      game.playTheme();
    });
  },
  stopTheme: function() {
    if (this.themeAudio)
      this.themeAudio.stop();
  },
  displayScore: function() {
    if (!isActive) return;
    var threshold = 100;
    var lightCount = Math.floor(this.score / threshold);
    for (var i = 0; i < lightCount; i++) {
      var button = game.launchpad.launchpads[game.launchpad.across-1][game.launchpad.down-1].getButton(8,7-i, true);
      if (button)
        button.light(COLORS.green.high);
    }
  },
  stop: function() {
    this.running = false;
    this.stopTheme();
    clearInterval(gameInterval);
  },
  nextBrick: function() {
    if (!isActive) return;
    game.checkLine();
    game.trigger("score", 1);
    if (!game.running) return;
    game.activeBrick = new Brick(game);
    game.activeBrick.render();
    game.activeBrick.on("stopped", game.nextBrick);
    game.launchpad.playAudio(__dirname+"/go.wav");
  },
  shiftLines: function(gapLine) {
    if (!isActive) return;
    game.launchpad.playAudio(__dirname+"/wooo.wav");
    for (var i = gapLine - 1; i >= 0 ; i--) {
      for (var j = 0; j < 8*game.launchpad.across; j++) {
        var button = game.launchpad.getButton(j, i);
        var newButton = game.launchpad.getButton(j, i+1);
        newButton.setState(button.getState());
        button.dark();
      }
    }
  },
  checkLine: function() {
    if (!isActive) return;
    for(var i = 0; i < 8*game.launchpad.across; i++) {
      var fullLine = true;
      for (var j = 0; j < 8*game.launchpad.down; j++) {
        if (game.launchpad.getButton(j, i)._state === 0){
          fullLine = false;
          break;
        }
      }
      if (fullLine) {
        this.trigger("score", 10);
        for (var k = 0; k < 8*game.launchpad.across; k++) {
          game.launchpad.getButton(k, i).dark();
        }
        this.shiftLines(i);

      }
    }
  },
  start: function() {
    if (!isActive) return;

    this.running = true;
    this.playTheme();
    this.score = 0;
    this.nextBrick();
    gameInterval = setInterval(function() {
      if (game.running) {
        game.activeBrick.move(2,0);
      }
    },500);
  }
};
_.extend(game, Backbone.Events);

game.on("score", function(score) {
  if (!isActive) return;
  game.score += score;
  game.displayScore();
});

game.on("gameover", function(){
  if (!isActive) return;
  game.launchpad.playAudio(__dirname+"/gameover.wav");
  game.launchpad.clear();
  game.launchpad.animateString("game over! You scored "+game.score, undefined, function() {
    game.launchpad.clear();
    game.start();
  });
  game.stop();
});

var onInit = function(launchpad) {
  isActive = true;
  game.launchpad = launchpad;
  game.start();
  launchpad.on('press', function(button) {
    if (!isActive) return;
    if (!game.running) return;
    if (!button.special) return;
    button.light();
    if (button.special.indexOf("left") > -1) game.activeBrick.move(0,-2);
    if (button.special.indexOf("right") > -1) game.activeBrick.move(0,2);
    if (button.special.indexOf("up") > -1) game.activeBrick.rotate(1);
    if (button.special.indexOf("down") > -1) game.activeBrick.rotate(-1);
  });
  launchpad.on('release', function(button) {
    if (!isActive) return;
    if (!game.running) return;
    button.dark();
  });


};

var onFinish = function() {
  game.stop();
  isActive = false;
};

module.exports = new Mode("Tetris", onInit, onFinish);
