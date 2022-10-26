"use strict";
const nodemailer = require("nodemailer");
import 'module-alias/register';
const axios = require('axios');


import { Request, Response, NextFunction } from "express";

import output from "~classes/output";
import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import length from "~classes/length";
import sanitize from "~classes/sanitize";
import validate from "~classes/validate";

/**
 * //class to handle API /send end-point
 */
class send {

/**
 * init data store
 */
public to_address: String = '';
public subject: String = '';
public message: String = '';
protected request: Object={};
protected result: Object={};

/**
 * //function to construct
 */
constructor(
	values=''
){

/**
 * store request/result
 */
if (typeof values != 'object'){
	return false;
}
if (typeof values['request']){
	this.request = values['request'];
}
if (typeof values['result']){
	this.result = values['result'];
}

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
enter(
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
	//debug ||
	//(typeof values['request_store']['request']['body']['test'] == 'undefined')
){
	//leftoff figure out standardized error returns
	console.log('Required POST values not provided.');
	values['request_store']['response']['success']=0;
	values['request_store']['response']['message']['error'].push(globalThis.default_messages['error']);
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}

/**
 * //input_required _POST[body]
 */
if (
	(typeof this['request']['body']['body']+'' != 'string')
	||
	(this['request']['body']['body'].length < 10)
){
	//leftoff figure out standardized error returns
	console.log('Message body is required but was not provided.');
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}
this['request']['body']['body'] = sanitize.html(this['request']['body']['body']);

/**
 * //input_required _POST[subject]
 */
if (
	(typeof this['request']['body']['subject']+'' != 'string')
	||
	(this['request']['body']['subject'].length < 10)
){
	//leftoff figure out standardized error returns
	console.log('Message subject is required but was not provided.');
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}
this['request']['body']['subject'] = sanitize.short_text(this['request']['body']['subject']);

/**
 * //input_required _POST[email_to]
 */
if (
	(typeof this['request']['body']['email_to']+'' != 'string')
	||
	(this['request']['body']['email_to'].length < 10)
	||
	(!this['request']['body']['email_to'].indexOf('@'))
	||
	(!this['request']['body']['email_to'].indexOf('.'))
){
	//leftoff figure out standardized error returns
	console.log('Message subject is required but was not provided.');
	values['request_store']['result'].send(values['request_store']['response']);
	return false;
}
this['request']['body']['email_to'] = sanitize.email(this['request']['body']['email_to']);

/**
 * set hard coded to_email
 */
if (process.env.ENVIRONMENT.indexOf('dev') == -1){
	this['request']['body']['email_to'] = 'no-reply@lakebed.io';
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "just2087.justhost.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'no-reply@app.lakebed.io', // generated ethereal user
      pass: 'NY062023lakebed.io', // generated ethereal password
    },
     tls: {rejectUnauthorized: false},
        debug:true, 
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'no-reply@app.lakebed.io', // sender address
    to: "s.lepine@amorphousprojects.com", // list of receivers
    subject: "Hello World", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Info: ");
  console.log(info);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

console.log('TEST');

/**
 * //debug
 */
values['request_store']['result'].send(this['request']['body']['email_to']);
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
 * done //class
 */
}

export default send;
