import * as dotenv from "dotenv";

/**
 * reusable error/success messages
 */
declare var default_messages: Object;
globalThis.default_messages = {
	'error': 'Something went terribly wrong.', 
};

declare var server: Object;
globalThis.server = {
	'last_message': '', 
	'message_array': [], 
	'classes': {}, 
	'routes': {}, 
};
