const fs = require('fs');
const striptags = require('striptags');

/**
 * //class to store and handle sanitize
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class sanitize {

/**
 * init data storage
 */
protected allowed_tags: Array = [];
private email_regex_1 = /^[a-zA-Z0-9.+=_-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
private email_regex_2 = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
private email_regex_3 = /[a-z0-9!+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

/**
 * //function to construct
 */
constructor(){

/**
 * init allowed_tags from settings file
 */
fs.readFile(__dirname + '/allowed_tags.txt', 'utf8', function(err, file_data) {
	if (err) throw err;
	file_data = file_data.replaceAll(/[^a-zA-Z0-9|,]+/gi, "");
	file_data = file_data.split(',');
	file_data.filter(n => n);
	globalThis.server['classes']['sanitize'].allowed_tags = file_data;
});

/**
 * done //function
 */
}

/**
 * //function (reusable) to sanitize all text
 */
all_text(text=''){

/**
 * convert null
 */
if (
	(typeof text == 'undefined')
	||
	(text == null)
	||
	(text == 'null')
	||
	(text == 'NULL')
){
	return '';
}

/**
 * return success
 */
return text;

/**
 * done //function
 */
}

/**
 * //function to sanitize a number
 */
number(number=''){

/**
 * make sure we have something to sanitize
 */
if (
	(typeof number == "undefined")
	||
	(!number)
){
	return 0;
}
if (
	(typeof number != "number")
	&&
	(typeof number != "string")
){
	return 0;
}
number += "";
if (typeof number.replace != "function"){
	return 0;
}

/**
 * handle negative numbers
 */
number = number.replace('-', ' ');
let number_multiplier=1;
if (number != number.trimStart()){
	number_multiplier = -1;
}

/**
 * remove everything except 0-9 and decimal points
 */
number = number.replace(/[^0-9|.]+/gi, "");

/**
 * multiply by 1 or -1 to handle negatives
 */
return (number * number_multiplier);

/**
 * done //function
 */
}

/**
 * //function to sanitize a JWT
 */
jwt(text=''){

/**
 * init string
 */
if (
	(typeof text != 'string')
	||
	(!text)
){
	return '';
}

/**
 * clean up
 */
text = this.all_text(text);

/**
 * regex replace
 */
text = text.replaceAll(/[^a-zA-Z0-9|.]+/gi, "");

/**
 * retrun success
 */
return text;

/**
 * done //function
 */
}

/**
 * //function to replace line breaks and non-alphanumeric chars
 */
short_text(text=''){

/**
 * init string
 */
if (
	(typeof text != 'string')
	||
	(!text)
){
	return '';
}

/**
 * clean up
 */
text = this.all_text(text);

/**
 * regex replace
 */
text = text.replaceAll(/[^ -~]+/g, "");

/**
 * retrun success
 */
return text;

/**
 * done //function
 */
}


/**
 * //function to sanitize a JWT
 */
ip_address(ip=''){

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

/**
 * //function to sanitize an email
 */
email(email=''){

/**
 * confirm we have data
 */
if (
	(typeof email != 'string')
	||
	(!email)
){
	return '';
}

/**
 * trim and lower case
 * and sanitize
 */
email = email.trim();
email = this.short_text(email);
email = email.toLowerCase();
email = email.replace(/[ ]+/gi, '');

/**
 * test regex 1
 */
var tmp = email.match(
	this.email_regex_1, 
	''
);
if (
	(!tmp)
	||
	(typeof tmp != 'object')
	||
	(typeof tmp[0] == 'undefined')
	||
	(typeof tmp[0] != 'string')
	||
	(!tmp[0])
){
	console.log('Email is not valid.');
	return false;
}
email = tmp[0];

/**
 * test regex 2
 */
var tmp = email.match(
	this.email_regex_2, 
	''
);
if (
	(!tmp)
	||
	(typeof tmp != 'object')
	||
	(typeof tmp[0] == 'undefined')
	||
	(typeof tmp[0] != 'string')
	||
	(!tmp[0])
){
	console.log('Email is not valid.');
	return false;
}
email = tmp[0];

/**
 * test regex 3
 */
var tmp = email.match(
	this.email_regex_3, 
	''
);
if (
	(!tmp)
	||
	(typeof tmp != 'object')
	||
	(typeof tmp[0] == 'undefined')
	||
	(typeof tmp[0] != 'string')
	||
	(!tmp[0])
){
	console.log('Email is not valid.');
	return false;
}
email = tmp[0];

/**
 * return success
 */
return email;

/**
 * done //function
 */
}

/**
 * //function to sanitize/strip ALL html
 */
all_html(text=''){

/**
 * confirm we have data
 */
if (
	(typeof text+'' != 'string')
	||
	(!text)
){
	return false;
}
text = text.toString();

/**
 * return string
 */
return text.replace( /(<([^>]+)>)/ig, '');

/**
 * done //function
 */
}

/**
 * //function to sanitize HTML
 */
html(html=''){

/**
 * confirm we have expected data
 */
if (typeof html+'' != 'string'){
	return false;
}
html=html.toString();

/**
 * return stripped html
 */
return striptags(html, globalThis.server['classes'].sanitize.allowed_tags);

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
globalThis.server['classes'].sanitize = new sanitize;
export default globalThis.server['classes'].sanitize;
