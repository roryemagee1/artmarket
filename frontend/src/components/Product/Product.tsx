import { JSX } from 'react'
import { Link } from 'react-router-dom'
import './Product.css'

import Rating from '@src/components/Rating/Rating'

import { handleResetWindow } from '@src/utils/miscUtils'

import { IProduct } from '@src/types/interfaces'

export default function Product({ product }: IProduct): JSX.Element {  
  return (
    <>
      <div className="masonry-item">
        <div className="masonry-item-heading">
          <h3>{product.name}</h3>
          <h3>${product.price}</h3>
        </div>

        <Link to={`/product/${product._id}`} onClick={() => handleResetWindow()}>
          <img className="masonry-image" src={product.image} />
        </Link>

        <div>
          <Link to={`/product/${product._id}`} onClick={() => handleResetWindow()}>
            <div className="product-artist">
              <strong>By {product.artist}</strong>
            </div>
          </Link>

          <div>
            <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
          </div>

        </div>

      </div>
    </>
  )
}