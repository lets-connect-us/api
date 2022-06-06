var session = require('express-session');
import length from '~classes/length';

/**
 * //class to store and handle output
 */
class request_store {

/**
 * init data storage
 */
public request: Object = {};
public result: Object = {};
public success: int = 0;
public message: Object = {
	'error': [], 
	'info': [], 
	'success': [], 
}
public output_result=''; //note we specifically do not specify a type for result since it can be string, array, object, etc


/**
 * //function to construct 
 */
constructor(
	values=''
){

/*
 * set request
 */
if (typeof values == 'object'){
if (typeof values['request']){
	this.request = values['request'];
}
if (typeof values['result']){
	this.result = values['result'];
}
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
		'success': 0, 
		'result': '', 
		'security_token': '', 
		'next_url': '', 
		'message': {}, 
	};
}
request.session['response']['success']=0;
request.session['response']['result']='';
request.session['response']['message']={
	'error': [], 
	'info': [], 
	'success': [], 
};

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

export default request_store;
