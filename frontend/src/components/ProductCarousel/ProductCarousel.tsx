import { JSX } from 'react'
import { Link } from 'react-router-dom'
import AwesomeSlider from 'react-awesome-slider'
import withAutoplay from 'react-awesome-slider/dist/autoplay'
import 'react-awesome-slider/dist/styles.css'
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import './ProductCarousel.css'

import Message from '@src/components/Message/Message'

import { useGetTopProductsQuery } from '@src/slices/productsApiSlice'

import { IProductKeys } from '@src/types/interfaces'

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function ProductCarousel(): JSX.Element {
  const { data: products, error } = useGetTopProductsQuery({num: 4});
  
  return (
    <>
      {
        error ? 
        <Message variant="danger" evalBool={false}>{`${error}`}</Message> :
        ( 
          <div className="carousel-container">
            <AutoplaySlider
              play={true}
              cancelOnInteraction={true}
              interval={8000}
              animation="cubeAnimation"
            >
              {
                products?.map((product: IProductKeys) => (
                  <div key={product._id} className="carousel-card">
                    <Link to={`/product/${product._id}`}>
                    <div className="carousel-caption">
                      <img className="carousel-image" src={product.image} alt={product.name} />
                      <h2>
                        {product.name} (${product.price})
                      </h2>
                      </div>
                    </Link>
                  </div>
                ))
              }
            </AutoplaySlider>
          </div>
        )
      }
    </>
  )
}