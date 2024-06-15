import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
const corsOptions = { allowedOrigin: 'http://localhost:5173' };
const port = process.env.PORT || 3000;

import productRoutes from './routes/productRoutes.js';

connectDB();
const app = express();
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("API is running...");
})

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));