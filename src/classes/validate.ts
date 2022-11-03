/**
 * //class to validate various things
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class validate {

/**
 * setup data store
 */
public last_message: String = '';

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
	||
	(email.length > 100)
){
	this.last_message = 'Email must longer than 4 letters and less than 100 letters.';
	return '';
}

/**
 * confirm contains @ and .
 */
if (email.indexOf('@') < 1){
	this.last_message = 'Email must contain @ symbol.';
	return '';
}
if (email.indexOf('.') == -1){
	this.last_message = 'Email must contain a period/dot.';
	return '';
}

/**
 * confirm length of TLD
 */
var tmp = email.split('.');
tmp = tmp.pop();
if (tmp.length < 2){
	this.last_message = 'Email domain must be longer than 2.';
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
 * //function to validate a user pazz
 */
pazz(pazz=''){

/**
 * confirm we have something
 */
if (
	(typeof pazz != 'string')
	||
	(!pazz)
){
	return '';
}

/**
 * confirm length
 */
if (
	(pazz.length < 6)
	||
	(pazz.length > 100)
){
	this.last_message = 'Password must be longer than 6 and shorter than 100 characters.';
	return '';
}

/**
 * confirm has a letter
 */
if (pazz.search(/[a-z]+/gi) == -1){
	this.last_message = 'Password must contain at least 1 letter.';
	return '';
}


/**
 * confirm has a number
 */
if (pazz.search(/[0-9]+/gi) == -1){
	this.last_message = 'Password must contain at least 1 number.';
	return '';
}


/**
 * confirm has a special char
 */
if (pazz.search(/[a-z0-9]+/gi) == -1){
	this.last_message = 'Password must contain at least 1 special character.';
	return '';
}

//future disallow things like "password" and "123"

/**
 * return success
 */
return pazz;

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
module.exports = new validate;
