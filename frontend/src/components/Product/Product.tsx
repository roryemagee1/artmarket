import { JSX } from 'react'
import { Link } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
import './Product.css'

import Rating from '@src/components/Rating'

import { IProduct } from '@src/types/interfaces'

export default function Product({ product }: IProduct): JSX.Element {
  return (
    <>
      <div className="masonry-item">
        <h3>{product.name}</h3>

        <Link to={`/product/${product._id}`}>
          <img className="masonry-image" src={product.image} />
        </Link>

        <div>
          <Link to={`/product/${product._id}`}>
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