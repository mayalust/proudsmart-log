const colors = require("colors");
colors.setTheme({
  silly: 'rainbow',
  minor: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  success: 'green',
  info: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red'
});
class Log{
  constructor(){
    this.debug = true;
  }
  setMode(bool){
    this.debug = bool
  }
  log(msg, tag){
    this.debug ? console.log(msg[tag]);
  }
  assert(msg, tag){
    this.debug ? console.assert(msg[tag]);
  }
  success(msg) {
    this.log(msg, "success");
  }
  error (msg) {
    this.log(msg, "error");
  }
  info (){
    this.log(msg, "info");
  }
  assert (msg) {
    this.assert(msg, "error");
  }
  minor (msg) {
    this.assert(msg, "minor");
  }
  warn(msg) {
    this.assert(msg, "warn");
  }
}
module.exports = new Log;