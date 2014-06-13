var config = require('./config');
var Grid = require('./modules/grid');

var grid = new Grid(config.startingMidiPort, config.arrangement[0], config.arrangement[1]);

