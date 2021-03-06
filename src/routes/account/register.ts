import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

import output from "~classes/output";
import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import length from "~classes/length";
import sanitize from "~classes/sanitize";
import validate from "~classes/validate";

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
values['request_store']['requirements']['check_required_values']=0;
values['request_store']['requirements']['check_short_term_token']=0;
values['request_store']['requirements']['check_us_email']=0;
values['request_store']['requirements']['check_pazz']=0;
values['request_store']['requirements']['create_us_account']=0;

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
 * get us_email
 */
values['request_store'].us_email = sanitize.email(values['request_store']['request']['body']['us_email'] || '');
if (
	(!values['request_store'].us_email)
	||
	(!validate.email(values['request_store'].us_email))
){
	values['request_store']['response']['message']['error'].push(validate.last_message);
	console.log('Email address not provided or not valid.');
	values['request_store']['response']['success']=0;
	values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}

/**
 * get pazz
 */
values['request_store'].pazz = sanitize.all_text(values['request_store']['request']['body']['pazz'] || '');
if (
	(!values['request_store'].pazz)
	||
	(!validate.pazz(values['request_store'].pazz))
){
	values['request_store']['response']['message']['error'].push(validate.last_message);
	console.log('Password not provided or not valid.');
	values['request_store']['response']['success']=0;
	values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}


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
check_short_term(values=''){


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

/**
 * done //function
 */
}

/**
 * done //class
 */
}

export default register;
