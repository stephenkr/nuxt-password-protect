export const generateToken = (str, seed) => {
  /* jshint bitwise:false */
  var i; var l
  var hval = (seed === undefined) ? 0x811c9dc5 : seed

  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i)
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24)
  }
  // Convert to 8 digit hex string
  return ('0000000' + (hval >>> 0).toString(16)).substr(-8)
}
