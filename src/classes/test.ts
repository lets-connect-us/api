/** 
 * //leftoff //debug import vars
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */ 
var output = require("~classes/output");
output.message['error'].push('TEST2');

class test {
  public server;

  constructor() {
  }

  test_func(pointer='') {
    console.log(output);
    return true;
  }
}



/**
 * init and export
 */
globalThis.server['classes'].test = new test;
export default globalThis.server['classes'].test;
