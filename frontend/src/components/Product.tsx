import { JSX } from 'react'
import { Card } from 'react-bootstrap'

interface IProduct {
  product: {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    }
  }

export default function Product({ product }: IProduct): JSX.Element {
  return (
    <Card className="my-3 p-3 rounded">
      <h3>{product.name}</h3>

      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
      </Card.Body>

      <Card.Text as="h3">
        ${product.price}
      </Card.Text>

    </Card>
  )
}