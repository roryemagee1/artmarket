import { JSX } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

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

      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="h3">
        ${product.price}
      </Card.Text>

    </Card>
  )
}