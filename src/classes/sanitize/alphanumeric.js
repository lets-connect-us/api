/**
 * //future could use this:
 * https://stackoverflow.com/questions/11598786/how-to-replace-non-printable-unicode-characters-javascript
 */

/**
 * //function to sanatize alphanumeric/hashes
 */
function alphanumeric(string){

/**
 * ensure we have a string
 */
if (
	(typeof string != "string")
	||
	(!string)
){
	return "";
}

/**
 * return sanitized
 */
return string.replace(/[^a-zA-Z0-9|-|_]+/gi, "");

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = alphanumeric;
