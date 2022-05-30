import * as dotenv from "dotenv";

/**
 * init server
 */
declare var server: Object;
globalThis.server = {
	'last_message': '', 
	'message_array': [], 
	'classes': {}, 
	'routes': {}, 
};
