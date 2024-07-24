import { JSX } from 'react'
import { useParams } from 'react-router-dom'
import './Feed.css'

// import Col from 'react-bootstrap/Col'

import { useGetProductsQuery } from '../../slices/productsApiSlice';

import Product from '@src/components/Product/Product'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { IProductKeys } from '@src/types/interfaces'

interface IFeed {
  pageNumber: string;
}
export default function Feed({ pageNumber }: IFeed): JSX.Element {
  const { keyword } = useParams(); 
  const { data: feedData, isLoading, error} = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
      { 
        isLoading ? 
          <Loader /> : 
          error ? 
          <Message evalBool={true} variant="danger">{`${error}`}</Message> : null 
      }
      {
        feedData?.products && (
          feedData.products.map((product: IProductKeys): JSX.Element => (
              <div key={product._id}>
                <Product 
                  key={product._id} 
                  product={product}
                />
              </div>  
            )  
          )
        )
      }
    </>
  )
}