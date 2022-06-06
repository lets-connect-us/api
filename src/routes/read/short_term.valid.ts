import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import sanitize from "~classes/sanitize";
import output from "~classes/output";

/**
 * //class to handle API /register end-point
 */
class short_term {

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

/**
 * confirm we have data
 */
if (
	(typeof values != 'object')
	||
	(typeof values['request_store']['request'] != 'object')
	||
	(typeof values['request_store']['request']['body'] != 'object')
	||
	(typeof values['request_store']['request']['body']['security_token'] == 'undefined')
	||
	(!values['request_store']['request']['body']['security_token'])
){
	values['request_store']['success']=0;
	values['request_store']['message']['error'].push('Short term security token was not provided or not valid.');
	values['request_store']['result'].send(values['request_store'].send());
	return false;
}

/**
 * confirm security_token == internal_hash
 */
if (
	(values['request_store']['request']['body']['security_token'] != csrf.internal_hash)
	&&
	(values['request_store']['request']['body']['security_token'] != csrf.internal_hash_old)
){
	values['request_store']['success']=0;
	values['request_store']['message']['error'].push('Internal hash is not valid.');
	values['request_store']['result'].send(values['request_store'].send());
	return false;
}

/**
 * confirm ip_addr
 */
if (
	(typeof values['request_store']['request']['body']['ip_addr'] == 'undefined')
	||
	(!values['request_store']['request']['body']['ip_addr'])
){
	values['request_store']['success']=0;
	values['request_store']['message']['error'].push('IP address not provided or not valid.');
	values['request_store']['result'].send(values['request_store'].send());
	return false;
}
let ip_addr = sanitize.ip_address(values['request_store']['request']['body']['ip_addr']);
if (!ip_addr){
	values['request_store']['success']=0;
	values['request_store']['message']['error'].push('IP address not provided or not valid.');
	values['request_store']['result'].send(values['request_store'].send());
	return false;
}

/**
 * //leftoff handle url
 */

/**
 * confirm we have a security token
 */
if (
	(typeof values['request_store']['request']['body']['security_token_provided'] == 'undefined')
	||
	(!values['request_store']['request']['body']['security_token_provided'])
){
	values['request_store']['success']=0;
	values['request_store']['message']['error'].push('Short term security token was not provided or not valid.');
	values['request_store']['result'].send(values['request_store'].send());
	return false;
}
let security_token_provided = sanitize.jwt(values['request_store']['request']['body']['security_token_provided']);


/**
 * split up
 * get payload
 * and recombine
 */
let signature = security_token_provided.split('.');
if (typeof signature.shift != 'function'){
	return false;
}
let payload = signature.shift();
signature = signature.join('.');

/**
 * divide by 2.75 since we multiplied by
 */
signature = sanitize.number(signature) / 3;

let url = values['request_store']['request']['query']['url'] || values['request_store']['request']['body']['url'] || '';
let browser_token = values['request_store']['request']['query']['browser_token'] || values['request_store']['request']['body']['browser_token'] || '';

console.log([
	ip_addr, 
	url, 
	browser_token
]);

//console.log(signature);
//console.log(payload);


values['request_store']['result'].send(payload);
return true;

/**
 * done //function
 */
}

/**
 * done //class
 */
}

export default short_term;
