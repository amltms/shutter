import express, { Application } from 'express';
import 'dotenv/config';
import { errorHandler } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';
import { connectDB } from './config/db';

connectDB();
const port = process.env.PORT || 5000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
