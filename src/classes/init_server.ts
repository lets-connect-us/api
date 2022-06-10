/** 
 * required modules
 */
import fs from 'fs';

/**
 * //class
 */
class init_server {

/**
 * init data store
 */
public server;

/**
 * //function to construct class
 */
constructor() {

/**
 * confirm .env files exist
 */
if (!fs.existsSync('./.env')) {
	console.log('Environment (.env) does not exist and is required.');
	process.exit(1);
}
if (!fs.existsSync('./secret.env')) {
	console.log('Environment (secret.env) does not exist and is required.');
	process.exit(1);
}
if (!fs.existsSync('./firebase.env')) {
	console.log('Environment (firebase.env) does not exist and is required.');
	process.exit(1);
}

return true;

/**
 * done //function
 */
}

/**
 * //function 
 */
test_func(pointer='') {

console.log('TEST');
return true;

/**
 * done //function
 */
}

/**
 * done //class
 */
}

/**
 * init new class
 */
//init_server = new init_server;//todo do we want to init class here or in the calling file?
export default init_server;
