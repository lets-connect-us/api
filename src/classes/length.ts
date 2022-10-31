const sqlite3 = require('sqlite3');
/**
 * //class to get the length of various things
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class length {

/**
 * init data store
 */

/**
 * //function to construct
 */
constructor() {


/**
 * done //function
 */
}

/**
 * //func to handle SWITCH DEFault
 * We do this so we can return 1 for TRUE to reduce the risk of breaking something
 */
default(item=""){

/**
 * console.log an error
 */
console.log("Not sure how to get lenght of " + typeof item);

	if (
		(typeof item == "boolean")
		&&
		(item)
	){
		return 1;
	}
	return 0;
}

/**
 * //function to handle object
 * //note we can call this directly to confirm if an item is an object and get the length at the same time.
 * I.E. window['class'].len.object();
 */
boolean(item={}){

/**
 * confirm we have somethign
 */
if (
	(typeof item != "boolean")
	||
	(!item)
){
	return 0;
}

/**
 * return success
 */
return 1;

/**
 * done //function
 */
}

/**
 * //function to handle object
 * //note we can call this directly to confirm if an item is an object and get the length at the same time.
 * I.E. window['class'].len.object();
 */
object(item={}){

/**
 * confirm we have somethign
 */
if (typeof item != "object"){
	return 0;
}

/**
 * return success
 */
return Object.keys(item).length;

/**
 * done //function
 */
}

/**
 * //function to get the length of a 
 */
any(item=''){

/**
 * return 0 LENgth immediately if ITeM is false/null/undefined
 */
if (
	(item === false)
	||
	(item === null)
	||
	(item === undefined)
	||
	(typeof item == 'undefined')
){
	return 0;
}

/**
 * switch
 */
switch(typeof item){
	case "string":
		return this.string(item);
		break;

	case "object":
		return this.object(item);
		break;

	case "array":
		return this.array(item);
		break;

	case "number":
		return this.number(item);
		break;

	case "undefined":
		return 0;
		break;

	default:
		return this.default(item);
}

/**
 * done //function
 */
}

/**
 * //function to get the length of a 
 */
string(text=''){

/*
 * confirm we have something
 */
if (typeof text != 'string'){
	return 0;
}

/**
 * return success
 */
return text.length;

/**
 * done //function
 */
}

/**
 * //function to get the length of a 
 */
number(item=''){

/**
 * confirm we have something
 */
if (typeof item != 'number'){
	return 0;
}

/**
 * return success
 */
return string(item + "");

/**
 * done //function
 */
}

/**
 * //function to get the length of a 
 */
array(array=''){

/**
 * confirm we have somethign
 */
if (typeof item != 'array'){
	return 0;
}

/**
 * return success
 */
return item.length;

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
module.exports = new length;
