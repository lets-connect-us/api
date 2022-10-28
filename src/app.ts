import express from 'express';

const app = express();
const port = 8001;

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});



app.get('/', (request, result) => {
	result.send('Testing');
});
