var Mode = require("../standing-novation-mode");
var COLORS = require('midi-launchpad').colors;

var colors = [
  COLORS.red.high,
  COLORS.orange.high,
  COLORS.yellow.high,
  COLORS.green.high,
  COLORS.off
];

var isActive = false;

module.exports = new Mode("Drawing", function (launchpad){
    launchpad.on("press", function(btn) {
        if (!isActive) return;
        if (btn.globalX === 1 && btn.globalY === 8) {
          return launchpad.clear();
        }
        for (var i = 0; i < colors.length; i++) {
            if (colors[i] === btn._state)
              return btn.light(colors[(i+1)%colors.length]);
          }
    });
    isActive = true;
}, function(launchpad){
    isActive = false;
});
