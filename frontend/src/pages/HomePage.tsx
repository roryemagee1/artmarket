import { JSX, useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import products from '@src/products.js'

import Product from '@src/components/Product'

interface IProduct {
_id: string;
name: string;
image: string;
description: string;
brand: string;
category: string;
price: number;
countInStock: number;
rating: number;
numReviews: number;
}

export default function HomePage(): JSX.Element {
  const [ products, setProducts ] = useState<IProduct[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [products])
  
  
  const productsOutput = !products ? <h1>Loading...</h1> : products.map((product: IProduct): JSX.Element => {
    return (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    )  
  })
  
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {productsOutput}
      </Row>
    </>
  )
}

// _id: '1',
// name: 'Airpods Wireless Bluetooth Headphones',
// image: '/images/airpods.jpg',
// description:
//   'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
// brand: 'Apple',
// category: 'Electronics',
// price: 89.99,
// countInStock: 10,
// rating: 4.5,
// numReviews: 12,