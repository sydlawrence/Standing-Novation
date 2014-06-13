
var Modes = require('./modes/Modes');

var ModeSelector = function(launchpad) {

  var modes = [];

  var activeMode;
  var activeModeIndex = -1;
  var that = this;
  var nextMode;
  this.finish = function() {
    if (activeMode) {
      if (activeMode.deactivate) activeMode.deactivate();
    }
    if (nextMode) {
      if (nextMode.deactivate) nextMode.deactivate();
    }
  };

  this.switchMode = function(mode) {
    if (activeMode === false) return;
    launchpad.playAudio(__dirname+"/../changeMode.wav");
    if (!launchpad.calibrated) return;

    this.finish();

    var modeIndex = 0;
    for (var i = 0; i < modes.length; i++) {
      if (modes[i] == mode) {
        modeIndex = i;
        break;
      }
    }
    activeModeIndex = modeIndex;
    nextMode = mode;
    activeMode = false;
    launchpad.animateString(mode.name, 1, function() {
      activeMode = mode;
      mode.run();
    });
  };

  this.nextMode = function() {
    var i = (activeModeIndex+1) % modes.length;
    var mode = modes[i];
    this.switchMode(mode);
  };

  this.addMode = function(obj) {
    modes.push(obj);
  };

  this.addModeByString = function(str) {
    var Mode = require('./modes/'+str);
    var mode = new Mode(launchpad);
    this.addMode(mode);
  };

  for (var i in Modes) {
    this.addModeByString(Modes[i]);
  }

  launchpad.on("press", function(btn) {
    if( btn.special &&
      btn.y === 0 &&
      btn.x === 8 &&
      btn.launchpad.x === launchpad.across-1 &&
      btn.launchpad.y === 0
    ) {
      that.nextMode();
    }
  });


  return this;
};

module.exports = ModeSelector;