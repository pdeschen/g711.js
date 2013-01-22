/*global require:true*/

var t200 = require('../lib/tone').generate(200, 8000, 2);
var t400= require('../lib/tone').generate(400, 8000, 2);
var tone = [].concat(t200, t400);
var wav = require('../lib/riff').encode(tone, 8000);
require('fs').writeFileSync('./audio.wav', wav, 'binary');
