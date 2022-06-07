import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

import output from "~classes/output";
import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import length from "~classes/length";
import sanitize from "~classes/sanitize";

/**
 * //class to handle API /register end-point
 */
class register {

/**
 * init data store
 */
public us_email: String = '';

/**
 * //function to construct
 */
constructor(
	values=''
) {

/**
 * init session
 */
if (
	(typeof values == 'object')
	&&
	(typeof values['request'] != 'undefined')
	&&
	(values['request'])
){
	output.init_session(values['request']);
}

/**
 * done //function
 */
}

/**
 * //function to be the primary entry point
 */
entry_point(
	values=''
){

/**
 * confirm we have required data
 */
if (
	(typeof values != 'object')
	||
	(typeof values['request_store'] != 'object')
	||
	(typeof values['request_store']['request'] != 'object')
	||
	(typeof values['request_store']['request']['body'] != 'object')
){
	console.log('Required values not provided.');
	values['request_store']['response']['success']=0;
	values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}

/**
 * setup success requirements
 */
values['request_store']['requirements']['Required values provided.']=0;
values['request_store']['requirements']['Short-term security token valid.']=0;
values['request_store']['requirements']['User email is valid.']=0;
values['request_store']['requirements']['Pazz meets requirements']=0;

/**
 * get security token provided
 */
if (!values['request_store'].security_token){
	console.log('Security token not provided or not valid.');
	values['request_store']['response']['success']=0;
	values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}

/**
 * get security token provided
 */
if (!values['request_store'].ip_addr){
	console.log('IP address not provided or not valid.');
	values['request_store']['response']['success']=0;
	values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}

/**
 * confirm security token is valid
 */
let valid = microservice.call({
	'url': '/read/short_term/valid', 
	'request_data': {
		'security_token': csrf.internal_hash, 
		'security_token_provided': values['request_store'].security_token, 
		'url': '/register', 
		'ip_addr': values['request_store'].ip_addr, 
	}
});

/**
 * then function after checking security token to confirm success
 * then run next function
 */
valid.then(function(response){
	if (
		(typeof response != 'object')
		||
		(typeof response['data'] != 'object')
		||
		(!length.object(response['data']))
	){
		console.log('Security token is not valid.');
		values['request_store']['response']['success']=0;
		values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
		values['request_store']['result'].send(values['request_store']['response']);
		return false;
	}
	
	//run then function
});

values['request_store']['result'].send('TEST');
return false;

/**
 * return success
 *
console.log(valid);
return valid;
return values['request']['body'];


/**
 * done //function
 */
}

/**
 * //function to confirm [short-term] security token is valid
 */


/**
 * done //class
 */
}

export default register;
