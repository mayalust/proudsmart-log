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
    this.mode = typeof bool === "boolean" ? bool : true;
  }
  setMode(bool){
    this.mode = bool
  }
  hide(){
    return this
  }
  log(){
    let args = [].slice.apply(arguments),
      assert = true,
      bool = args.pop(),
      tag = args.pop();
    typeof args[0] === "boolean"
      ? assert = args.shift() : null;
    assert && ( this.mode || bool === true )
      ? console.log.apply(console, args.map( d => toString(d)[tag])) : null;
  }
  createLog( tag, ar, bool ){
    let args = [].slice.apply(ar);
    [].push.apply(args, [tag, typeof bool !== "undefined" ? bool : false]);
    this.log.apply(this, args);
  }
  success() {
    this.createLog( "success", arguments, true );
  }
  error () {
    this.createLog( "error", arguments, true );
  }
  info (){
    this.createLog( "info", arguments, true );
  }
  minor () {
    this.createLog( "minor", arguments, true );
  }
  warn() {
    this.createLog( "warn", arguments, true );
  }
  _success() {
    this.createLog( "success", arguments );
  }
  _error () {
    this.createLog( "error", arguments );
  }
  _info (){
    this.createLog( "info", arguments );
  }
  _minor () {
    this.createLog( "minor", arguments );
  }
  _warn() {
    this.createLog( "warn", arguments );
  }
  debug() {
    let args = [].slice.apply(arguments),
      bool = typeof args[0] === "boolean"
      ? args.shift() : false,
      err = bool ? "_error" : "error",
      fn = args.pop();
    try {
      typeof fn == "function" ? fn() : null;
    } catch(e) {
      this[err].apply(this, args);
      this[err]( `Message : ${e.message}`);
      this[err]( e.stack);
    }
  }
  _debug() {
    let args = [].slice.apply(arguments);
    args.unshift( true );
    this.debug.apply(this, args);
  }
}
module.exports = bool => new Log( bool );