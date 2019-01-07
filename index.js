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
  makeRun( tag, args ){
    return {
      run : d => {
        d !== false ? this.createLog( tag, args ) : null;
      }
    }
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
    return this.makeRun( "success", arguments);
  }
  _error () {
    return this.makeRun( "error", arguments );
  }
  _info (){
    return this.makeRun( "info", arguments );
  }
  _minor () {
    return this.makeRun( "minor", arguments );
  }
  _warn() {
    return this.makeRun( "warn", arguments );
  }
  debug() {
    let args = [].slice.apply(arguments),
      bool = typeof args[0] === "boolean"
      ? args.shift() : false,
      err = bool ? "error" : "error",
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
    return {
      run : d => {
        if ( d !== false ) {
          let args = [].slice.apply(arguments);
          args.unshift( true );
          this.debug.apply(this, args);
        }
      }
    }
  }
}
module.exports = bool => new Log( bool );