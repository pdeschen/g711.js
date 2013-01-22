/*global require:true, describe:true, it:true */
var assert = require("assert"), tone = require('../lib/tone');

describe('tone', function(){
  describe('#$800()', function(){
    it('should return 800', function(){
      assert.equal(tone.$800(8000, 0.5), -356);
    });
  });
});

