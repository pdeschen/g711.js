/*global require:true, describe:true, it:true */
var assert = require("assert"), pcmu = require('../pcmu');

describe('pcm', function(){
  describe('#topcm()', function(){
    it('should return ulaw.', function(){
      assert.equal(pcmu.topcm('a'), -356);
    });
  });
});

