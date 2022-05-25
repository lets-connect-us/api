import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + Typscript be running!');
});

app.listen(port, () => {
	console.log(`[server]: Server is running on https:192.168.1.112:${port}`);
})