// connect to canvas
var Module = {
  preRun: [],
  postRun: [],
  print: (function() {}),
  printErr: function(text) {
    text = Array.prototype.slice.call(arguments).join(' ');
    if (0) { // XXX disabled for safety typeof dump == 'function') {
      dump(text + '\n'); // fast, straight to the real console
    } else {
      console.log(text);
    }
  },
  canvas: document.getElementById('canvas'),
  setStatus: function(text) {
    if (Module.setStatus.interval) clearInterval(Module.setStatus.interval);
    var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    var statusElement = document.getElementById('status');
    var progressElement = document.getElementById('progress');
    if (m) {
      text = m[1];
      progressElement.value = parseInt(m[2])*100;
      progressElement.max = parseInt(m[4])*100;
      progressElement.hidden = false;
    } else {
      progressElement.value = null;
      progressElement.max = null;
      progressElement.hidden = true;
    }
    statusElement.innerHTML = text;
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  }
};
Module.setStatus('Downloading...');