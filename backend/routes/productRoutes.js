import express from 'express';
import products from '../data/products.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(products);
})

router.get('/:id', async (req, res) => {
  const product = products.find(product => product._id === req.params.id);
  res.json(product);
})

export default router;