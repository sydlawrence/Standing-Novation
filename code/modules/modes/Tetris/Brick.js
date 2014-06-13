var _ = require("underscore");
var Backbone = require("backbone");

var Brick = function(game, type) {
  _.extend(this, Backbone.Events);



  var layouts = {
    1: [[1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]],

    2: [["","",1, 1, 1, 1],
        ["","",1, 1, 1, 1],
        [1, 1, 1, 1,"",""],
        [1, 1, 1, 1,"",""]],

    3: [[ 1, 1, 1, 1,"",""],
        [ 1, 1, 1, 1,"",""],
        ["","", 1, 1, 1, 1],
        ["","", 1, 1, 1, 1]],

    4: [[1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]],

    5: [[1, 1,"","","",""],
        [1, 1,"","","",""],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1]],

    6: [["","","","", 1, 1],
        ["","","","", 1, 1],
        [ 1, 1, 1, 1, 1, 1],
        [ 1, 1, 1, 1, 1, 1]],

    7: [["","", 1, 1,"",""],
        ["","", 1, 1,"",""],
        [ 1, 1, 1, 1, 1, 1],
        [ 1, 1, 1, 1, 1, 1]]
  };

  type = Math.floor(Math.random() * 7) + 1;

  var layout = layouts[type];

  var position = [Math.floor((game.launchpad.across*8) /2),0-layout.length];





  var buttons = [];
  var that = this;

  var color = game.randomColor();
  that.on("stopped", function() {
    if (position[1] < 0) {
      game.trigger("gameover");
    }
  });

  this.rotate = function(dir, noRender) {

    if (dir === -1) {
      this.rotate();
      this.rotate();
      this.rotate();
      return;
    }

    /*
    layout = [[1,2],[3,4]]
    expected = [[3,1],[4,2]]
    */
    var newLayout = [];
    for (var i = 0; i < layout[0].length; i++) {
      var arr = [];
      for (var j = 0; j < layout.length; j++)
        arr.push(layout[j][i]);
      arr.reverse();
      newLayout.push(arr);
    }
    layout = newLayout;
    if (noRender !== true)
      that.render("");

  };

  var rand = Math.floor(Math.random() * 4);
  for (var i = 0; i < rand; i++) {
    that.rotate(1,true);
  }

  this.clear = function() {
    for (var i = 0; i < buttons.length; i++){
      if (buttons[i] !== undefined) buttons[i].dark();
    }
    buttons = [];
  };

  this.getRelevantButtons = function(stopEvent) {

    if (layout.length + position[1] > 8*game.launchpad.across) return that.trigger(stopEvent);
    var newButtons = [];

    for (var j = 0; j < layout.length; j++) {
      for (var i = 0; i < layout[j].length; i++) {
        if (layout[j][i] === 1) {
          var button = game.launchpad.getButton(i+position[0],j+position[1]);
          newButtons.push(button);
        }
      }
    }
    for(var k = 0; k < newButtons.length; k++) {
      if (newButtons[k] !== undefined) {
        if (newButtons[k]._state !== 0 && buttons.indexOf(newButtons[k]) === -1) return that.trigger(stopEvent);
      }
    }
    that.clear();
    for(var m = 0; m < newButtons.length; m++) {
      if (newButtons[m] !== undefined) newButtons[m].light(color);
    }
    buttons = newButtons;

  };

  this.render = function(stopEvent) {
    that.getRelevantButtons(stopEvent);
  };

  this.move = function(down, across) {
    if (position[0] + across < 0) return;
    if (position[0] + across + layout[0].length > 8*game.launchpad.across) return;
    position[0] += across;
    position[1] += down;
    var stopEvent = "nogo";
    if (down !== 0) stopEvent = "stopped";
    that.render(stopEvent);
  };

  this.canMove = function() {

  };


};

module.exports = Brick;

