import { JSX } from 'react'
import { useParams } from 'react-router-dom'
import "./HomePage.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useGetProductsQuery } from '../../slices/productsApiSlice';

import Product from '@src/components/Product'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import Paginate from '@src/components/Paginate'
import ProductCarousel from '@src/components/ProductCarousel'
import Meta from '@src/components/Meta'

import { IProductKeys } from '@src/types/interfaces'

export default function HomePage(): JSX.Element {
  const { keyword, pageNumber } = useParams();
  
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
    <div className="home-page"></div>
      <Meta title="Welcome to Artmarket!" />
      { !keyword && <ProductCarousel /> }
      { 
        isLoading ? 
          <Loader /> : 
          error ? 
            <Message evalBool={true} variant="danger">{ data?.message ? data?.message : data?.error ? data?.error : "Unknown Error!" }</Message> : null 
      }
      <Row>
        {
          data?.products && (
            data.products.map((product: IProductKeys): JSX.Element => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>  
              )  
            )
          )
        }
      </Row>
      { 
        data?.pages && <Paginate
          pages={data?.pages}
          page={data?.page}
          isAdmin={false}
          keyword={keyword ? keyword : ""} 
          /> 
      }
    </>
  )
}