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
 * //function to sanitize a number
 */
number(number=''){

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
 * //function to sanitize a JWT
 */
jwt(text=''){

/**
 * init string
 */
if (
	(typeof text != 'string')
	||
	(!text)
){
	return '';
}

/**
 * regex replace
 */
text = text.replace(/[^a-zA-Z0-9|.]+/gi, "");

/**
 * retrun success
 */
return text;

/**
 * done //function
 */
}



/**
 * //function to sanitize a JWT
 */
ip_address(ip=''){

/**
 * init string
 */
if (
	(typeof ip == 'undefined')
	||
	(!ip)
	||
	(typeof ip.replace != 'function')
){
	return '';
}

/**
 * regex replace
 */
ip = ip.replace(/[^a-zA-Z0-9|.|:]+/gi, "");

/**
 * retrun success
 */
return ip;

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
