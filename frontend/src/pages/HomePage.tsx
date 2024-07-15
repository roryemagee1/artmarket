import { JSX } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useGetProductsQuery } from '../slices/productsApiSlice';

import Product from '@src/components/Product'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { IProductKeys } from '@src/types/interfaces'

export default function HomePage(): JSX.Element {
  const { data: products, isLoading, error } = useGetProductsQuery(null);
  const res = useGetProductsQuery(null);

  const productsOutput = !res.data ?
    <></> : 
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
      { 
        isLoading ? 
          <Loader /> : 
          error ? 
            <Message evalBool={true} variant="danger">{ res?.data?.message ? res?.data?.message : res?.error ? res?.error : "Unknown Error!" }</Message> : null 
      }
      <Row>
        {productsOutput}
      </Row>
    </>
  )
}