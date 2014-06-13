var Mode = require("../standing-novation-mode");
var COLORS = require('midi-launchpad').colors;

var colors = [
  COLORS.red.high,
  COLORS.orange.high,
  COLORS.yellow.high,
  COLORS.green.high,
  COLORS.off
];

var grid;

var isActive = false;

var playSample = function(i, cb) {
  grid.playAudio(__dirname+"/audio/sample-"+i+".wav", cb);
};

var presses = [];
var buttonPress = function(btn) {
  var i = btn.x + 1 + (btn.y) * 8;
  if (!presses[i]) presses[i] = 0;
  presses[i]++;
  btn.light(COLORS.green.high);
  playSample(i, function() {
    presses[i]--;
    if (presses[i] <=0)
      btn.light(COLORS.red.low);
  });
};

module.exports = new Mode("Sample Pad", function (launchpad){
  grid = launchpad;
  launchpad.light(COLORS.red.low);
    launchpad.on("press", function(btn) {
      if (!isActive) return;
      buttonPress(btn);
    });
  isActive = true;
}, function(launchpad){
    isActive = false;
});
