var Mode = require("../standing-novation-mode");
var COLORS = require('midi-launchpad').colors;

var isActive = false;
var tickDelay = 500;

var grid,
w,h;

var snake_array = [];
var direction = "right";
var nd;
var food;
var score = 0;


function create_snake() {
  var length = 4; //Length of the snake
  snake_array = []; //Empty array to start with
  for (var i = length - 1; i >= 0; i--) {
    //This will create a horizontal snake starting from the top left
    snake_array.push({
      x: w/2 + i - length,
      y: h/2
    });
  }
}

function create_food() {
  var x = Math.floor(Math.random() * w);
  var y = Math.floor(Math.random() * h);
    food = {
      x: x,
      y: y,
    };
}

function check_collision(x, y, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].x == x && array[i].y == y) return true;
  }
  return false;
}

var move = function() {
  var nx = snake_array[0].x;
  var ny = snake_array[0].y;
  if (direction == "right") nx++;
  else if (direction == "left") nx--;
  else if (direction == "up") ny--;
  else if (direction == "down") ny++;

  if (nx == -1 || nx == w || ny == -1 || ny == h || check_collision(nx, ny, snake_array)) {
    return endGame();
  }
  var tail = {};
  if (nx == food.x && ny == food.y) {
    tail = {
      x: nx,
      y: ny
    };
    score++;
    grid.playAudio(__dirname+"/grow.wav");

    //Create new food
    create_food();
  } else {
    tail = snake_array.pop(); //pops out the last cell
    grid.getButton(tail.x*2, tail.y*2).light(COLORS.off);
    grid.getButton(tail.x*2, tail.y*2+1).light(COLORS.off);
    grid.getButton(tail.x*2+1, tail.y*2).light(COLORS.off);
    grid.getButton(tail.x*2+1, tail.y*2+1).light(COLORS.off);
    tail.x = nx;
    tail.y = ny;
  }

  snake_array.unshift(tail); //puts back the tail as the first cell

};

var endGame = function() {
  isActive = false;
  grid.clear();
  grid.playAudio(__dirname+"/gameover.wav");
  grid.animateString("game over! You scored "+score, undefined, function() {
    start();
  });
};

var draw = function() {
  if (food && food.x && grid.getButton(food.x, food.y)) {
    grid.getButton(food.x*2, food.y*2).light(COLORS.orange.high);
    grid.getButton(food.x*2+1, food.y*2).light(COLORS.orange.high);
    grid.getButton(food.x*2, food.y*2+1).light(COLORS.orange.high);
    grid.getButton(food.x*2+1, food.y*2+1).light(COLORS.orange.high);
  }
  for (var i in snake_array) {
    try {
      grid.getButton(snake_array[i].x*2, snake_array[i].y*2).light(COLORS.green.high);
      grid.getButton(snake_array[i].x*2+1, snake_array[i].y*2).light(COLORS.green.high);
      grid.getButton(snake_array[i].x*2, snake_array[i].y*2+1).light(COLORS.green.high);
      grid.getButton(snake_array[i].x*2+1, snake_array[i].y*2+1).light(COLORS.green.high);
    } catch(e) {
      console.log(snake_array);
      console.log(i);
      console.log(snake_array[i]);
      fssdd();
    }
  }
};

var tick = function() {
  if (!isActive) return;
  move();
  draw();
};

var start = function() {
  isActive = true;
  score = 0;
  grid.clear();
  create_snake();
  create_food();
  loop();
};

var onClick = function(btn) {
  switch(direction) {
    case "up":
    case "down":

      if (btn.globalX < snake_array[0].x*2) // if click is further left
        direction = "left";
      if (btn.globalX > snake_array[0].x*2) // if click is further right
        direction = "right";
      break;
    case "left":
    case "right":
      if (btn.globalY < snake_array[0].y*2) // if click is further up
        direction = "up";
      if (btn.globalY > snake_array[0].y*2) // if click is further down
        direction = "down";
      break;
  }
};

var loop = function() {
  if (!isActive) return;
  tick();
  setTimeout(loop, tickDelay);
};

var onInit = function(launchpad) {
  grid = launchpad;
  grid.on("press", onClick);
  w = grid.across*4;
  h = grid.down*4;
  start();
};

var onFinish = function(launchpad) {
  isActive = false;
};

module.exports = new Mode("Snake", onInit, onFinish);
