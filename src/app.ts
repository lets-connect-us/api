import 'module-alias/register';
import * as dotenv from "dotenv";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import test from "@classes/test";


import register from "@routes/account/register";
register = new register;

/**
 * init app
 */
const app = express();

/**
 * setup config
 */
dotenv.config();
if (!process.env.PORT) {
	console.log('No server port provided.');
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
app.set("port", process.env.PORT || 3000);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    test.test_func(this);
    res.send('Express + Typscript be running!!!');
});

app.get('/register', (req, res) => {
    register.test_func();
    res.send('Express + Typscript be running!!!');
});

export default app;
