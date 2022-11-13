/**
 * require external modules
 */
const { URL } = require('url');

/**
 * //function to validate a URL
 * source: https://stackoverflow.com/questions/30931079/validating-a-url-in-node-js
 */
function url(values={}){

/**
 * ensure we have something to validate
 */
if (
	(typeof values == 'string')
	&&
	(values)
){
	values = {
		'url' : values,
	}
}
if (
	(typeof values != 'object')
	||
	(typeof values['url'] != 'string')
	||
	(!values['url'])
){
	console.log('No url provided in order to validate');
	return '';
}

/**
 * try parsing url
 */
try {
	values['url_object'] = new URL(values['url']);

/**
 * catch parse error
 */
} catch (err) {
	return false;

/**
 * done try/catch
 */
}

/**
 * ensure URL is valid
 */
if (
	(typeof values['url_object'] != 'object')
	||
	(typeof values['url_object']['href'] != 'string')
	||
	(values['url_object']['href'] != values['url'])
){
	console.log('URL is not valid.');
	return false;
}

/**
 * get string for validation
 * //note have to do it before lowercase b/c HTTP://
 */
let url_string = values['url_object']['href'].replace(values['url_object']['origin'], '');

/**
 * lower case some parts
 */
values['url_object']['origin'] = values['url_object']['origin'].toLowerCase();
values['url_object']['protocol'] = values['url_object']['protocol'].toLowerCase();
values['url_object']['host'] = values['url_object']['host'].toLowerCase();
values['url_object']['hostname'] = values['url_object']['hostname'].toLowerCase();

/**
 * confirm protocol
 */
if (
	(typeof values['url_object']['protocol'] != 'string')
	||
	(!values['url_object']['protocol'])
){
	console.log('URL protocol is not valid.');
	return false;
}
if (values['url_object']['protocol'].indexOf('http') < 0){
	console.log('URL protocol (http[s]) is not valid.');
	return false;
}

/**
 * if strict limit redirects
 */
if (values['strict_url']){
	let tmp = url_string.split('://');
	if (
		(typeof tmp != 'object')
		||
		(tmp.length != 1)
	){
		return false;
	}
}

/**
 * if strict limit port
 */
if (
	(values['strict_port'])
	&&
	(values['url_object']['port'])
	&&
	(values['url_object']['port'] != 80)
	&&
	(values['url_object']['port'] != 443)
){
	return false;
}

/**
 * return success
 */
return values['url_object']['origin'] + values['url_object']['pathname'] + values['url_object']['search'] + values['url_object']['hash'];


/**
 * done //function
 */
}

/**
 * export
 */
module.exports = url;
