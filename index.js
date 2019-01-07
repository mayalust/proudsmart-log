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
function toString(obj){
  if(typeof obj === "object"){
    return JSON.stringify(obj, null, 2)
  } else {
    return obj + ""
  }
}
class Log{
  constructor( bool ){
    this.debug = typeof bool === "boolean" ? bool : true;
  }
  setMode(bool){
    this.debug = bool
  }
  log(){
    let args = [].slice.apply(arguments),
      assert = true,
      bool = args.pop(),
      tag = args.pop();
    typeof args[0] === "boolean"
      ? assert = args.shift() : null;
    assert && ( this.debug || bool === true )
      ? console.log.apply(console, args.map( d => toString(d)[tag])) : null;
  }
  createLog( tag, ar, bool ){
    let args = [].slice.apply(ar);
    [].push.apply(args, [tag, typeof bool !== "undefined" ? bool : false]);
    this.log.apply(this, args);
  }
  success(msg) {
    this.createLog( "success", arguments, true );
  }
  error (msg) {
    this.createLog( "error", arguments, true );
  }
  info (msg){
    this.createLog( "info", arguments, true );
  }
  minor (msg) {
    this.createLog( "minor", arguments, true );
  }
  warn(msg) {
    this.createLog( "warn", arguments, true );
  }
  _success(msg) {
    this.createLog( "success", arguments );
  }
  _error (msg) {
    this.createLog( "error", arguments );
  }
  _info (msg){
    this.createLog( "info", arguments );
  }
  _minor (msg) {
    this.createLog( "minor", arguments );
  }
  _warn(msg) {
    this.createLog( "warn", arguments );
  }
}
module.exports = bool => new Log( bool );