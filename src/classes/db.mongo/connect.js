/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */
const mongoose = require('mongoose');

/**
 * //function to connect to Mongo Atlas
 */
function connect(values={}){

mongoose.connect("mongodb+srv://" + process.env.MONGO_URL + '/' + process.env.ENVIRONMENT + '?retryWrites=true&w=majority', { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
	console.debug('Database connection successful.');
});

/**
 * error out
 */
db.on('error', err => {
	console.error('DB error:', err);
	process.exit();
})

/**
 * return succes
 */
return db;

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = connect;
