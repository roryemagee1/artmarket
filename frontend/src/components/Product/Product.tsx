import { JSX } from 'react'
import { Link } from 'react-router-dom'
import './Product.css'

import Rating from '@src/components/Rating'

import { handleResetWindow } from '@src/utils/miscUtils'

import { IProduct } from '@src/types/interfaces'

export default function Product({ product }: IProduct): JSX.Element {  
  return (
    <>
      <div className="masonry-item">
        <h3>{product.name}</h3>

        <Link to={`/product/${product._id}`} onClick={() => handleResetWindow()}>
          <img className="masonry-image" src={product.image} />
        </Link>

        <div>
          <Link to={`/product/${product._id}`} onClick={() => handleResetWindow()}>
            <div className="product-title">
              <strong>{product.name}</strong>
            </div>
          </Link>

          <div>
            <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
          </div>

        </div>

        <h3>
          ${product.price}
        </h3>

      </div>
    </>
  )
}