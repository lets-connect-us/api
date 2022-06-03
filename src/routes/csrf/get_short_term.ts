import 'module-alias/register';
import { Request, Response, NextFunction } from "express";

var session = require('express-session');

/*
 * import classes
 */
import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import output from "~classes/output";

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

/**
 * check HTTP ref
 */
let referrer: string = values['request']['headers'].referrer || values['request']['headers'].referer || '';
let url: string = values['request']['query']['url'] || values['request']['body']['url'] || '';
if (
	(referrer)
	&&
	(url)
	&&
	(referrer.indexOf(url) == -1)
){
	console.log('HTTP REF and URL do not match. //todo we need to decide how we wish to handle this in the future.');
	console.log('HTTP REF: ' + referrer);
	console.log('Token URL: ' + url);
}

//leftoff check if token is already set

/*
 * get a new token
 */
let short_term_token = csrf.get_short_term({
	'ip_addr': values['request'].socket['remoteAddress'] || values['request'].headers['cf-connecting-ip'] || '', 
	'url': values['request']['query']['url'] || values['request']['body']['url'] || '', 
	'browser_token': values['request']['query']['browser_token'] || values['request']['body']['browser_token'] || '',
});
if (!short_term_token){
	values['request'].session['response']['success'] = 0;
	values['request'].session['response']['message']['error'].push(globalThis.default_messages['error']);
	return false;
}

/**
 * write security_token cookie
 */
values['result'].cookie('security_token', short_term_token, { maxAge: 900000, httpOnly: true });

/**
 * write security_token session
 */
values['request'].session['response']['security_token'] = short_term_token;

/**
 * build success
 */
values['request'].session['response']['success'] = 1;
values['request'].session['response']['result'] = {
	'security_token': short_term_token, 
};

/**
 * return success
 */
return short_term_token;

/**
 * //leftoff:
 * Verify/validate short term CSRF
 * 
 * Edit base.inc.php to skip /API anf /forbidden_dir if they do not exist. Then we can use dev_tools on node servers
 * Deploy http://dev-tools on the local network
 */

/**
 * done //function
 */
}

/**
 * done //class
 */
}

export default get_short_term;
