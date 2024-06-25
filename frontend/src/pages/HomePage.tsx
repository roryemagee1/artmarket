import { JSX, } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useGetProductsQuery } from '../slices/productsApiSlice';

import Product from '@src/components/Product'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { IProductKeys } from '@src/types/interfaces'

export default function HomePage(): JSX.Element {
  const { data: products, isLoading, error } = useGetProductsQuery(null);
  
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
      { 
        isLoading ? 
          <Loader /> : 
          error ? 
            <Message variant="danger">{/*error?.data?.message ? error?.data?.message :*/ "error" in error ? error?.error : "Error!"}</Message> : null 
      }
      <h1>Latest Products</h1>
      <Row>
        {productsOutput}
      </Row>
    </>
  )
}