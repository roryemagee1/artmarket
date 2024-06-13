import { JSX, useState, useEffect } from 'react'
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Product from '@src/components/Product'

import { IProductKeys } from '@src/types/interfaces'

export default function HomePage(): JSX.Element {
  const [ products, setProducts ] = useState<IProductKeys[] | null>(null);

  async function fetchProducts(): Promise<void> {
    const { data } = await axios.get(`/api/products`);
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, [])
  
  const productsOutput = !products ? 
    <h1>Loading...</h1> : 
    products.map((product: IProductKeys): JSX.Element => {
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