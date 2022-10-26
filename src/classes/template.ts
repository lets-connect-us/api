/** 
 * //leftoff //debug import vars
 */ 
import output from "~classes/output";

/**
 * //class
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class template {

/**
 * init data store
 */
public server;

/**
 * //function to construct class
 */
constructor() {

/**
 * done //function
 */
}

/**
 * //function 
 */
test_func(pointer='') {

console.log('TEST');
return true;

/**
 * done //function
 */
}

/**
 * done //class
 */
}


/**
 * init and export
 */
globalThis.server['classes'].template = new template;
export default globalThis.server['classes'].template;
