
globals = {}; // for testing only
var mDropdown = require('../');
globals.mDropdown = mDropdown;

function init() {
  mDropdown.initialize();
}

window.onload = init;
