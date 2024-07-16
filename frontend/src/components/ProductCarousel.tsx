import { JSX } from 'react'
import { Link } from 'react-router-dom'

import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { useGetTopProductsQuery } from '@src/slices/productsApiSlice'

import { IProductKeys } from '@src/types/interfaces'

export default function ProductCarousel(): JSX.Element {
  const { data: products, isLoading, error } = useGetTopProductsQuery(null);
  
  return (
    <>
      {
        isLoading ? <Loader /> :
        error ? <Message variant="danger" evalBool={false}>{`${error}`}</Message> :
        (
          <Carousel pause="hover" className="bg-primary mb-4">
            {
              products.map((product: IProductKeys) => (
                <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className="carousel-captions">
                      <h2>
                        {product.name} (${product.price})
                      </h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))
            }
          </Carousel>
        )
      }
    </>
  )
}