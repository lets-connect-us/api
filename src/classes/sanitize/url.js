/**
 * import external modules
 */
var sanitize_url = require("@braintree/sanitize-url").sanitizeUrl;

/**
 * //function to sanitizse a url string
 */
function url(url){

/**
 * confirm we have something to sanitize
 */
if (
	(typeof url != 'string')
	||
	(!url)
){
	return false;
}

/**
 * sanitize
 */
return sanitize_url(url);

/**
 * done //function
 */
}

module.exports = url;
