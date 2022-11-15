/**
 * import external modules
 */

/**
 * //function to sanitizse a url string
 */
function short_text(text=''){

/**
 * do initial sanitization and confirm we have anything to return
 * and ensure text is a string (not numeric)
 */
text = this.all_text(text);
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
 * remove line breaks
 * specific to short text
 */
text = text.replace(/(\r\n|\n|\r)/gm, '');

/**
 * remove HTML
 * specific to short text
 */
text = text.replace('<', '&lt;');
text = text.replace('>', '&gt;');

/**
 * return success
 */
return text;

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = short_text;
