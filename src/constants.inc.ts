const fs = require('fs');

/**
 * //class for server constants and other
 */
class constants {

/*
 * set data store
 */
//todo public $separator = DIRECTORY_SEPARATOR;
server_url='';
error_url='/error/index.php';
cookie='';
docroot='';
webroot='/';
mail_api_key='';
remote_addr='';
internal_hash='';
old_internal_hash='';
npm_script='';
day={};
settings={};
style={};

/**
 * //function to construct
 */
constructor() {

/**
 * setup docroot
 */
if (
	(typeof process != 'undefined')
	&&
	(typeof process['mainModule'] != 'undefined')
	&&
	(typeof process['mainModule']['path'] == 'string')
	&&
	(process['mainModule']['path'])
){
	this.docroot = process['mainModule']['path'] + '/';
}

/**
 * setup npm script (watch, build, dev, serve, etc)
 */
if (
	(typeof process != 'undefined')
	&&
	(typeof process['env'] != 'undefined')
	&&
	(typeof process['env']['npm_lifecycle_event'] == 'string')
	&&
	(process['env']['npm_lifecycle_event'])
){
	this.npm_script = process['env']['npm_lifecycle_event'];
}

/**
 * confirm we have secret.env files
 */
fs.stat('./new-secret.env', (err, stats) => {
if (err) {
	let file_content = [];
	file_content.push(new Date);
	file_content.push(this.npm_script);
	file_content.push(this.docroot);
	console.log(file_content);
try {
  fs.writeFileSync('./new-secret.env', 'test');
  // file written successfully
} catch (err) {
  console.error(err);
}
}
});

/**
 * done //function
 */
}


test(){
	console.log(this);

/**
 * done //function
 */
}

/**
 * done //class
 */
}

/**
 * export
 */
module.exports = new constants;
