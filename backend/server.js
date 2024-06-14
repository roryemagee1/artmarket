import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
const corsOptions = { allowedOrigin: 'http://localhost:5173' };
import products from './data/products.js';
const port = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("API is running...");
})

app.get('/api/products', (req, res) => {
  res.json(products);
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id);
  res.json(product);
})

app.listen(port, () => console.log(`Server is running on port ${port}`));