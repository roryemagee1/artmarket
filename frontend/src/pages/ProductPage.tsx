import { JSX } from 'react'
import { useParams, Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button  from 'react-bootstrap/Button'

import { useGetProductsDetailsQuery } from '../slices/productsApiSlice';

import Rating from '@src/components/Rating'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

export default function ProductPage(): JSX.Element {
  const { id: productId } = useParams();
  
  const { data: product, isLoading, error } = useGetProductsDetailsQuery(productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
          Back
      </Link>
      { 
        isLoading ? 
          <Loader /> : 
          error ? 
            <Message variant="danger">{ /*error?.data?.message ? error?.data?.message :*/ "error" in error ? error?.error : "Error!" }</Message> :
      <>
        <Row>

          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating rating={product?.rating} text={`${product?.numReviews} reviews`}/>
              </ListGroup.Item>

              <ListGroup.Item>
                Price: ${product?.price}
              </ListGroup.Item>

              {/* This section is a modified version of the section commented out below. */}
              <ListGroup.Item>
                <strong>Description: </strong>{product?.description}
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
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>{product?.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product?.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

        </Row>
      </>
      }

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