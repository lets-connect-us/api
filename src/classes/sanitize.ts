/**
 * //class to sanitize various things
 */
class sanitize {

/**
 * //function to construct
 */
constructor() {
}

/**
 * //func to sanitize a number
 */
number(
	number=""
){

/**
 * make sure we have something to sanitize
 */
if (
	(typeof number == "undefined")
	||
	(!number)
){
	return 0;
}
if (
	(typeof number != "number")
	&&
	(typeof number != "string")
){
	return 0;
}
number += "";
if (typeof number.replace != "function"){
	return 0;
}

/**
 * handle negative numbers
 */
number = number.replace('-', ' ');
let number_multiplier=1;
if (number != number.trimStart()){
	number_multiplier = -1;
}

/**
 * remove everything except 0-9 and decimal points
 */
number = number.replace(/[^0-9|.]+/gi, "");

/**
 * multiply by 1 or -1 to handle negatives
 */
return (number * number_multiplier);

/**
 * done //function
 */
}

/**
 * //function to return payload/signature for a short_term token
 */
short_term (
	short_term=''
){

/**
 * split up
 * get payload
 * and recombine
 */
let signature = short_term.split('.');
if (typeof signature.shift != 'function'){
	return false;
}
let payload = signature.shift();
signature = signature.join('.');

/**
 * divide by 2.75 since we multiplied by
 */
signature = this.number(signature) / 3;



console.log(signature);

console.log(payload);

/**
 * done //function
 */
}


/**
 * done //class
 */
}

sanitize = new sanitize;
export default sanitize;
