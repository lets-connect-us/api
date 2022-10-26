var session = require('express-session');
import length from '~classes/length';
import sanitize from '~classes/sanitize';

/**
 * //class to store and handle output
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class request_store {

/**
 * init data storage
 */
public security_token: String = '';
public ip_addr: String = '';
public request: Object = {};
public result: Object = {};
public response: Object = {
	'result': '', 
	'success': 0, 
	'message': {
		'error': [], 
		'info': [], 
		'success': [], 
	}, 
};
public requirements: Object = {};

/**
 * //function to construct 
 */
constructor(
	values=''
){

/**
 * set request
 * and result
 */
if (typeof values != 'object'){
	return '';
}

/**
 * confirm request and set/save
 */
if (typeof values['request']){
	this.request = values['request'];
	this.security_token = sanitize.jwt(values['request']['body']['security_token'] || '');
	this.ip_addr = sanitize.short_text(values['request'].socket['remoteAddress'] || values['request'].headers['cf-connecting-ip'] || '');
}

/**
 * confirm result and set/save
 */
if (typeof values['result']){
	this.result = values['result'];
}

/**
 * done //function
 */
}

/**
 * init session
 */
init_session(request=''){

/**
 * confirm we have data
 */
if (
	(typeof request != 'object')
	||
	(!length.object(request))
){
	return false;
}

/**
 * init/reset session response object
 */
if (
	(typeof request == 'object')
	&&
	(typeof request.session == 'object')
	&&
	(typeof request.session['response'] != 'object')
){
	request.session['response'] = {
		'security_token': '', 
		'next_url': '', 
	};
}

/*
 * set/reset security token and response
 */
if (
	(typeof request == 'object')
	&&
	(typeof request.session == 'object')
	&&
	(typeof request.session['response'] == 'object')
){
if (
	(typeof request.session['response']['security_token'] == 'undefined')
	||
	(!request.session['response']['security_token'])
){
	request.session['response']['security_token'] = '';
}
if (
	(typeof request.session['response']['next_url'] == 'undefined')
	||
	(!request.session['response']['next_url'])
){
	request.session['response']['next_url'] = '';
}
}


/**
 * return success
 */
return true;

/**
 * done //function
 */
}

/**
 * //function to return JSON output to the browser
 */
send(
	values=''
){

/**
 * build and return session if available
 */

/**
 * build and return local values if availalbe
 */

/**
 * return standardized object
 */
return ({
	'sucess': this.success, 
	'message': this.message, 
	'result': this.result, 
});

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
globalThis.server['classes'].request_store = new request_store;
export default globalThis.server['classes'].request_store;
