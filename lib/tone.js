/*global exports:true */

var tone = {}, builtin = [800], i;

/*
 * generates sin wav tone given frequency, rate, and duration.
 * @returns a float array [-1, 1] 
 */
tone.generate = function (frequency, rate, duration){
  var tone = [], i, count = duration * rate;
  for (i = 0; i < count; i=i+1){
    tone.push(Math.sin(2 * Math.PI * i / (rate / frequency)));
  }
  return tone;
};

for (i = 0; i<builtin.length;i+=1){
  var freq = builtin[i];
  tone['$' + freq] = function(rate, duration) { 
      return tone.generate(freq, rate, duration);
  };
}

if (typeof window === "undefined" && exports) {
  for (var prop in tone) {
    if (tone.hasOwnProperty(prop)) {
      exports[prop] = tone[prop];
    }
  }
}
else {
  window.$tone = tone;
}
