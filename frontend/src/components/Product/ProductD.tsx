import { JSX } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import Rating from '@src/components/Rating'

import { IProduct } from '@src/types/interfaces'

export default function Product({ product }: IProduct): JSX.Element {
  return (
    <Card className="my-3 p-3 rounded">
      <h3>{product.name}</h3>

      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating rating={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

      </Card.Body>

      <Card.Text as="h3">
        ${product.price}
      </Card.Text>

    </Card>
  )
}