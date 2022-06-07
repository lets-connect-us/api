/**
 * //class to validate various things
 */
class validate {

/**
 * //function to an email
 */
email(email=''){

/**
 * confirm we have data
 */
if (
	(typeof email != 'string')
	||
	(!email)
	||
	(email.length < 4)
){
	return '';
}

/**
 * confirm contains @ and .
 */
if (email.indexOf('@') < 1){
	return '';
}
if (email.indexOf('.') == -1){
	return '';
}

/**
 * confirm length of TLD
 */
var tmp = email.split('.');
tmp = tmp.pop();
if (tmp.length < 2){
	return '';
}

/**
 * return success
 */
return email;

/**
 * done //function
 */
}

/**
 * done //class
 */
}

validate = new validate;
export default validate;
