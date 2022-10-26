/**
 * //function to sanitize a number
 */
function number(number=0){

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
if (typeof number.toString != "function"){
	return 0;
}
number = number.toString();
if (typeof number.replace != "function"){
	return 0;
}

/**
 * handle negative numbers
 */
number = number.trim();
let number_multiplier=1;
if (number.indexOf('-') === 0){
	number_multiplier = -1;
}

/**
 * remove everything except 0-9 and decimal points
 */
number = number.replace(/[^0-9|.]+/gi, "");

/**
 * return NaN
 */
if (!(number * 1)){
	return 0;
}

/**
 * multiply by 1 or -1 to handle negatives
 */
return (number * number_multiplier);


/**
 * done //function
 */
}

module.exports = number;
