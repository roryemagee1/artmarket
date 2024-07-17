import path from 'path';
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
import uploadRoutes from './routes/uploadRoutes.js';

connectDB();
const app = express();

// Middleware: CORS Options, JSON Body Parser, URL Body Parser, and Cookie Parser
// Note: For some reason, CORS Options break the functions in uploadRoutes.js.
app.use(cors(corsOptions), express.json(), express.urlencoded({ extended: true }), cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
} else {
  app.get('/', (req, res) => {
    res.send("API is running on dev server...");
  })
}
  
app.use(notFound, errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));