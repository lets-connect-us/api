/**
 * import external modules
 */

/**
 * //function to sanitizse a url string
 */
function all_text(text=''){

/**
 * confirm we have something to sanitize
 * and ensure its text (not numeric)
 */
if (
	(typeof text == 'undefined')
	||
	(typeof text.toString != 'function')
){
	console.log('No text provided in order to sanitize.');
	return '';
}
text = text.toString();

/**
 * replace malicious entries
 * //future figure out how to do this in a single regex
 */
text = text.replace(/\<?/g, '');
text = text.replace(/\?>/g, '');
text = text.replace(/\`/g, '&apos;');
text = text.replace(/\<<</g, '&#60;&#60;&#60;');

/**
 * loop through chars to encode unicode
 */
let unicode = false;
text = Array.from(text);
for (var key in text){

/**
 * skip already unicode encoded chars
 */
if (
	(text[ key ] == '&')
	&&
	(text[ (key+1) ] == '#')
){
	unicode = true;
	continue;
}
if (
	(unicode)
	&&
	(text[ key ] == ';')
){
	unicode = false;
	continue;
}
if (unicode){
	continue;
}

/**
 * get unicode
 * and skip english
 */
var tmp = text[ key ].charCodeAt(0);
if (
	(tmp)
	&&
	(tmp < 127)
){
	continue;
}

/**
 * handle empty chars
 */
if (
	(!tmp)
	||
	(!tmp * 1)
){
	tmp = 1;
	text[ key ] = '&#63;';
}

/**
 * unicode encode
 */
if (tmp > 127){
	text[ key ] = '&#' + tmp + ';';
}
	
/**
 * done for loop
 */
}

/**
 * recombine
 */
text = text.join('');

/**
 * cleanup html entities of unicode
 */
text = text.replace(/\&#38;&#35;/g, '&#');
text = text.replace(/\&#38;#/g, '&#');
text = text.replace(/\&&#35;/g, '&#');
text = text.replace(/\&amp;#/g, '&#');

/**
 * return success
 */
return text;

/**
 * done //function
 */
}

module.exports = all_text;
