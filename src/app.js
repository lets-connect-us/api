/**
 * directory alieases 
 * and environment config
 */
require('module-alias/register');
var dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: './secret.env' });
//dotenv.config({ path: './firebase.env' });

/**
 * import modules
 */
var app = require('./app');


/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
	console.log('//todo need to setup error handling.');
}


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

module.exports = server;
