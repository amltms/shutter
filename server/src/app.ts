import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

const port = 5000;

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
	res.send('Hello World!');
	console.log('Hello Wfsdforld!');
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
