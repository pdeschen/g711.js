var BIAS = 0x84, //33
    QUANT_MASK=0xf,   // Quantization field mask.
    SEG_MASK=0x70,    // Segment field mask.
    SEG_SHIFT=4,      // Left shift for segment number.
    SIGN_BIT=0x80;    // Sign bit for a A-law byte.

/*
 * Converts a u-law to 16-bit linear PCM.
 *
 * @param code a int u-law value
 */
exports.topcm = function(code) {
  var t;
  if (typeof code === "string") {
    if (code.length === 1) {
      code = code.charCodeAt(0);
    }
  }

  // Complement to obtain normal u-law value.
  code = ~code;
  // Extract and bias the quantization bits. Then shift up by the segment number and subtract out the bias.
  t= ((code & QUANT_MASK) <<3) + BIAS;
  //t<<=((unsigned)code&SEG_MASK)>>SEG_SHIFT;
  t<<=(code&SEG_MASK)>>SEG_SHIFT;
  
 return ((code&SIGN_BIT)!=0)? (BIAS-t) : (t-BIAS);
};
