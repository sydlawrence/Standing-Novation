var midiConnector = require('midi-launchpad');
var ModeSelector = require("./modeSelector");
var fs = require("fs");
var _ = require("underscore");
var Backbone = require("backbone");
var play = require('./play');
var exec=require('child_process').exec;


var Launchpad = function(port, across, down, ready) {
    var midi = midiConnector.connect(port);
    midi.on("ready",ready);
};

var grid = {
    across:0,
    modeSelector:undefined,
    down:0,
    calibrated: false,
    launchpads: {},
    restartAndUpload: function() {
        exec('open ~/Desktop/Standing\\ Novation.app/',
          function (error, stdout, stderr) {
            grid.modeSelector.finish();
            process.exit();
        });
    },
    playAudio: function(filename, callback) {
        return play.sound(filename, callback);
    },
    each: function(cb) {
        var pads = [];
        var c = 0;
        for (var i in grid.launchpads) {
            for (var j in grid.launchpads[i]) {
                cb(grid.launchpads[i][j], c, i, j);
                c++;
            }
        }
        return pads;
    },
    getButton: function(x,y) {
        var lx = parseInt(x/8,10);
        var ly = parseInt(y/8,10);
        x = x%8;
        y = y%8;
        if (this.launchpads[lx] && this.launchpads[lx][ly])
            return this.launchpads[lx][ly].getButton(x,y);
        else
            return undefined;
    },
    clear: function() {
        grid.each(function(l){
            l.clear();
        });
    },
    light: function(color) {
        grid.each(function(l){
            l.allLight(color);
        });
    },
    staticText: function(str) {
        grid.clear();
        for (var i in grid.launchpads) {
            for (var j in grid.launchpads[i]) {
                var index = j * grid.across + i*1;
                if (str[index])
                    grid.launchpads[i][j].displayCharacter(str[index]);
                else
                    grid.launchpads[i][j].allLight(grid.colors.green.high);
                if (str[index] === " ")
                    grid.launchpads[i][j].allLight(grid.colors.green.high);
            }
        }
    },
    animateString: function(str, row, cb) {
        grid.clear();
        var c = 0;
        var finished = function() {
            c++;
            if (c === grid.across) {
                cb();
            }
        };
        if (row === undefined) row = parseInt(this.down/2, 10);
        if (this.down === 1) row = 0;
        str += " ";
        for (var i = this.across; i > 0; i--) {
            if (this.launchpads[i-1] && this.launchpads[i-1][row]) {
                this.launchpads[i-1][row].displayString(str, 500,finished);
                str = " "+str;
                for (var j=0; j < this.down; j++) {
                    if (j !== row) {
                        this.launchpads[i-1][j].allLight(grid.colors.green.high);
                    }
                }
            }
        }
    },
    calibrate: function(launchpads,onCalibrate) {


        var calibratedCount = 0;
        var calibrated = {};

        var finished = function() {
            grid.calibrated = true;
            grid.launchpads = calibrated;
            for (var i in grid.launchpads) {
                for (var j in grid.launchpads[i]) {
                    var l = grid.launchpads[i][j];
                    for (var x in l._grid) {
                        for (var y in l._grid[x]) {
                            l._grid[x][y] = setGlobalPosition(l,l._grid[x][y]);
                        }
                    }
                }
            }



            onCalibrate();
        };

        var calibrate = function(launchpad) {

            var row = calibratedCount % grid.across;
            var column = (calibratedCount - row) / grid.across;
            calibratedCount++;
            launchpad.x = row;
            launchpad.y = column;
            if (!calibrated[row]) calibrated[row] = {};
            calibrated[row][column] = launchpad;
            if (calibratedCount === grid.across * grid.down) {
                finished();
            }
        };

        var setGlobalPosition = function(launchpad, btn) {
            btn.globalX = (btn.launchpad.x*8) + btn.x;
            btn.globalY = (btn.launchpad.y*8) + btn.y;
            return btn;
        };

        for (var i in launchpads) {
            var l = launchpads[i];



            (function(l){
                if (grid.across * grid.down === 1) {
                    return calibrate(l);
                }
                // return calibrate(l);
                l.allLight(grid.colors.red.high);
                var calibrated = false;
                l.on("press", function(btn){
                    if (calibrated) return;
                    calibrated = true;
                    grid.playAudio(__dirname+"/../calibration_audio/"+(calibratedCount+1)+".wav");
                    btn.launchpad.allLight(l.colors.green.high);
                    setTimeout(function() {
                        l.clear();
                        setTimeout(function(){
                            calibrate(l);
                        },10);
                    },500);

                });
            })(l);
        }
    }
};

_.extend(grid, Backbone.Events);



module.exports = function(startingMidiPort, across, down) {
    grid.across = across;
    grid.down = down;
    var successes = 0;
    var launchpads = [];
    var done = function(){
        successes++;
        if (successes === across * down ) {
            grid.calibrate(launchpads, function() {

                grid.modeSelector = new ModeSelector(grid);
                grid.modeSelector.nextMode();
            });
        }
    };

    var restartCount = 0;

    var createLaunchpad = function(across, down, i) {
        var port = startingMidiPort + i;
        Launchpad(port,across, down, function(launchpad) {
            launchpad.across = across;
            launchpad.down = down;
            launchpads.push(launchpad);

            launchpad.on("press", function(btn){
                if (btn.x === 0 && btn.y === 0) {
                    restartCount++;
                    if (restartCount >= 10) {
                        grid.restartAndUpload();
                    }
                } else {
                    restartCount = 0;
                }
                btn.launchpad = launchpad;
                grid.trigger("press", btn);
            });
            launchpad.on("state_change", function(btn){
                btn.launchpad = launchpad;
                grid.trigger("state_change", btn);
            });
            launchpad.on("release", function(btn){
                btn.launchpad = launchpad;
                grid.trigger("release", btn);
            });

            grid.colors = launchpad.colors;

            done();

        });
    };
    var c = 0;
    for (var i = 0; i < across; i++) {
        for (var j = 0; j < down; j++) {
            createLaunchpad(i, j, c++);
        }
    }

    return grid;
};