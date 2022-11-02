/**
 * //function to sanitize a JWT
 */
function ip(ip=''){

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


module.exports = ip;
