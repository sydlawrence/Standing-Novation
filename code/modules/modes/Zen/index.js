var Mode = require("../standing-novation-mode");

var COLORS = require('midi-launchpad').colors;
var grid;
var colors = [
  COLORS.green.high,
  COLORS.orange.high,
  COLORS.green.high,
  COLORS.red.high
];

var currentColor = 0;

var waveDelay = 100;

var lightNeighbour = function(button, uuid, dx, dy) {
  var b = grid.getButton(button.globalX+dx, button.globalY+dy);
  if (b === undefined || b.special || b._uuid[uuid] !== undefined) return;
  b.light(colors[currentColor]);
  b._uuid[uuid] = uuid;
  lightNeighbours(b, uuid);
};

var lightNeighbours = function(button, uuid) {
  var t = setTimeout(function() {
    lightNeighbour(button, uuid, -1, 0);
    lightNeighbour(button, uuid,+1, 0);
    lightNeighbour(button, uuid,0, -1);
    lightNeighbour(button, uuid,0, +1);
  },waveDelay);
};

var playAudio = function(){
  var i = (Math.floor(Math.random() * 5)+1) % 6;
  grid.playAudio(__dirname+"/"+i+".mp3");
};

var startWave = function(btn) {
  // if (btn.special) return;
  playAudio();
  currentColor = (currentColor + 1) % colors.length;
  btn.light(colors[(currentColor + 1) % colors.length]);
  var uuid = (new Date()).getTime() + "" + parseInt(Math.random()*100000,10);
  btn._uuid[uuid] = uuid;
  lightNeighbours(btn, uuid);
};

var isActive = false;

var onInit = function(launchpad) {
  isActive = true;
  grid = launchpad;
  launchpad.on("press", function(btn){
    if (isActive) startWave(btn);
  });
};
var onFinish = function() {
  isActive = false;
};

module.exports = new Mode("Zen Garden", onInit, onFinish);
