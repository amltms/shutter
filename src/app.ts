import express, { Application, Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';

connectDB();
const port = process.env.PORT || 5000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
// Serve frontend static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req: Request, res: Response) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} else {
	app.get('/', (req: Request, res: Response) => res.send('Please set to  production'));
}

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
