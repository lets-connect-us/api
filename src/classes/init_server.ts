/** 
 * required modules
 */
import fs from 'fs';

/**
 * //class
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
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

/**
 * confirm port is set
 */
if (!process.env.PORT) {
	console.log('No server port was provided so exiting.');
	process.exit(1);
}

/**
 * confirm port is set
 */
if (!process.env.ENVIRONMENT) {
	process.env.ENVIRONMENT = 'dev';
	console.log('No environment variable set so defualted to dev.');
}


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
 * init and export
 */
globalThis.server['classes'].init_server = new init_server;
export default globalThis.server['classes'].init_server;
