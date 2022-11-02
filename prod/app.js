"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * directory alieases
 * and environment config
 */
require("module-alias/register");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
dotenv.config({ path: './secret.env' });
dotenv.config({ path: './firebase.env' });
/**
 * App Variables
 * //note must be done before any classes/modules
 * //note but must be done after module-alias and dotenv
 */
var constants = require('./constants.inc');
var express = require("express");
var cors = require("cors");
const helmet_1 = __importDefault(require("helmet"));
const app = express();
/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var crypto = require('crypto');
/**
 * classes and internal modules
 */
var length = require('~classes/length');
/**
 * database setup
 */
var migrate_database = require('./migrate_database');
var db = require('~classes/db.sqlite');
db.connect({ 'db_file': './calendars.db' });
migrate_database.run({
    'connection': db.connect({ 'db_file': './calendars.db' }),
    'name': 'calendars',
});
/**
 * setup Express app
 */
app.set("port", process.env.PORT);
app.use((0, helmet_1.default)());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cookie_parser());
/**
 * setup session
 */
app.use(session({
    'resave': true,
    'saveUninitialized': true,
    'store': new FileStore({}),
    'secret': process.env.ENVIRONEMENT + process.env.SESSION_SECRET,
    'cookie': { maxAge: 3600000, secure: false, httpOnly: true },
}));
/**
 * //debug output some basic content
 */
app.get('/', (request, result) => {
    /**
     * insert new entry
     */
    let tmp = new Date().toString();
    db['connections']['calendarsdb'].run(`INSERT INTO "store" ("unique_hash", "json") VALUES ('test', '{"test": "` + tmp + `"}');`, [], function (error) {
        if ((error)
            &&
                (typeof error['message'] == 'string')) {
            console.log('Error adding new date entry:' + error['message']);
        }
    });
    /**
     * select all and build output
     */
    db['connections']['calendarsdb'].all("SELECT * FROM store", (error, query_result) => {
        const output = [];
        Object.entries(query_result).forEach(([key, value], index) => {
            //for (let key in query_result){
            console.log(query_result[index]);
            output.push('<p>' + query_result[index].id + ': ' + query_result[index]['json'] + '</p>');
        });
        result.send(output.join(''));
    });
});
/**
 * export app
 */
exports.default = app;
