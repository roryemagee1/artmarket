import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
const corsOptions = { allowedOrigin: 'http://localhost:5173' };
const port = process.env.PORT || 3000;

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

connectDB();
const app = express();

// Middleware: CORS Options, JSON Body Parser, URL Body Parser, and Cookie Parser
app.use(cors(corsOptions), express.json(), express.urlencoded({ extended: true }), cookieParser());

app.get('/', (req, res) => {
  res.send("API is running...");
})

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound, errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));