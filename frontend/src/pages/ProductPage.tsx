import { JSX, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
// import products from '@src/products'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button  from 'react-bootstrap/Button'

import Rating from '@src/components/Rating'

import { IProductKeys } from '@src/types/interfaces'

export default function ProductPage(): JSX.Element {
  const { id: productId } = useParams();
  const [ product, setProduct] = useState<IProductKeys | null>(null);

  async function getProduct(id: string | undefined): Promise<void> {
    const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
    setProduct(data);
  }

  useEffect(() => {
    getProduct(productId);
  }, [productId])


  // const product = products.find(product => product._id === productId);

  if (!product) {
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          Back
        </Link>
        <h1>Product Error has occurred.</h1>
      </>

    )
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      <Row>

        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating rating={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>

            {/* This section is a modified version of the section commented out below. */}
            <ListGroup.Item>
              <strong>Description: </strong>{product.description}
            </ListGroup.Item>
            {/* This section is a modified version of the section commented out below. */}
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>

      {/* This section is a modified version of the section commented out above. */}
      {/* <Row>
        <Col md={10}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row> */}
      {/* This section is a modified version of the section commented out above. */}
    </>
  )
}