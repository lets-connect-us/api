import 'module-alias/register';
import { Request, Response, NextFunction } from "express";

var session = require('express-session');

/*
 * import classes
 */
import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import classes_output from "~classes/output";
const output = new classes_output;

/**
 * //class to handle API /csrf/short-term end-point
 */
class get_short_term {

/**
 * init data store
 */

/**
 * //function to construct
 */
constructor() {

/**
 * done //function
 */
}

/**
 * //function to be the primary entry point
 */
entry_point(
	values=''
) {

/*
 * init session store
 */
if (
	(typeof values == 'object')
	&&
	(typeof values['request'] == 'object')
){
	output.init_session(values['request']);
}

//leftoff check if token is already set

/*
 * get a new token
 */
let short_term_token = csrf.get_short_term({
	'ip_addr': values['request'].socket['remoteAddress'], 
	'url': values['request']['query']['url'] || values['request']['body']['url'] || '', 
	'browser_token': values['request']['query']['browser_token'] || values['request']['body']['browser_token'] || '', 
	'referrer': values['request']['headers'].referrer || values['request']['headers'].referer || '', 
});

/**
 * write security_token cookie
 */
values['result'].cookie('security_token', short_term_token, { maxAge: 900000, httpOnly: true });

/**
 * write security_token session
 */
console.log(values['request'].session);
values['request'].session['response']['security_token'] = short_term_token;

//values['request'].headers['cf-connecting-ip']
console.log('START');
console.log(short_term_token);
console.log('FINISH');

/**
 * //leftoff:
 * finishing writing short term CSRF
 * 	should include IP and url.
 * 	"signature" is expiry timestamp
 * Verify/validate short term CSRF
 * 
 * Edit base.inc.php to skip /API anf /forbidden_dir if they do not exist. Then we can use dev_tools on node servers
 * Deploy http://dev-tools on the local network
 * 

console.log(values['request']['body']);
return values['request']['body'];

/**
 * done //function
 */
}

/**
 * done //class
 */
}

export default get_short_term;
