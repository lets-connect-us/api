/**
 * //class to store and handle sanitize
 * being a class in the /classes dir this object will not store any user/request data
 * SOLID!
 */
module.exports = {

/**
 * //function to sanitize a url (string)
 */
'url': require('./url'), 

/**
 * //function to sanitize alphanumeric/hashes
 */
'alphanumeric': require('./alphanumeric'), 

/**
 * done //class
 */
}
