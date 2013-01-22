/*global require:true*/

var riff = {};

riff.encode = function(data, rate) {
  var n = data.length, header, i, sample, 
      MAX_INT = 32767; // short 2^15 − 1

  // 16-bit mono WAVE/RIFF header template
  header = "RIFF<##>WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00<##><##>\x02\x00\x10\x00data<##>";

  // Helper to insert a 32-bit little endian int.
  function insertLong(value) {
    var bytes = "";
    for (i = 0; i < 4; i=i+1) {
      bytes += String.fromCharCode(value % 256);
      value = Math.floor(value / 256);
    }
    header = header.replace('<##>', bytes);
  }

  // ChunkSize
  insertLong(36 + n * 2);

  // SampleRate
  insertLong(rate);

  // ByteRate
  insertLong(rate * 2);

  // Subchunk2Size
  insertLong(n * 2);

  // Output sound data
  for (i = 0; i < n; i=i+1) {
    sample = Math.round(Math.min(1, Math.max(-1, data[i])) * MAX_INT);
    if (sample < 0) {
      sample += 65536; // 2's complement signed, 32768 * 2 
    }
    header += String.fromCharCode(sample % 256);
    header += String.fromCharCode(Math.floor(sample / 256));
  }

  return header;
};

if (typeof window === "undefined" && exports) {
  for (var prop in riff) {
    if (riff.hasOwnProperty(prop)) {
      exports[prop] = riff[prop];
    }
  }
}
else {
  window.$riff= riff;
}
