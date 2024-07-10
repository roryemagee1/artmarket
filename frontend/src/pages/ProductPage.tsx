import { JSX, ChangeEvent, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useGetProductsDetailsQuery } from '@src/slices/productsApiSlice';
import { addToCart } from '@src/slices/cartSlice';

import Rating from '@src/components/Rating'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

export default function ProductPage(): JSX.Element {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ qty, setQty ] = useState<number>(1);

  function handleQty(event: ChangeEvent) {
    const { value } = event.target as HTMLSelectElement
    setQty(Number(value));
  }
  
  // const { data: product, isLoading, error } = useGetProductsDetailsQuery(productId);
  const res = useGetProductsDetailsQuery(productId);

  function handleAddToCart() {
    dispatch(addToCart({ ...res.data, qty }));
    navigate('/cart');
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
          Back
      </Link>
      { 
        res.isLoading ? 
          <Loader /> : 
          res.error ? 
            <Message variant="danger">{ res?.data?.message ? res?.data?.message : res?.error ? res?.error : "Unknown Error!" }</Message> :
      <>
        <Row>

          <Col md={5}>
            <Image src={res.data?.image} alt={res.data?.name} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{res.data?.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating rating={res.data?.rating} text={`${res.data?.numReviews} reviews`}/>
              </ListGroup.Item>

              <ListGroup.Item>
                Price: ${res.data?.price}
              </ListGroup.Item>

              {/* This section is a modified version of the section commented out below. */}
              <ListGroup.Item>
                <strong>Description: </strong>{res.data?.description}
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
                      <strong>${res.data?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>{res.data?.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                { 
                res.data?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(event: ChangeEvent) => handleQty(event)}
                        >
                          {[...Array(res.data?.countInStock).keys()].map((key) => (
                            <option key={key + 1 } value={key + 1}>{key + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                    {/* <QuantityDropdown data={res?.data ? res?.data : null} /> */}
                  </ListGroup.Item>
                  )
                }

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={res.data?.countInStock === 0}
                    onClick={handleAddToCart}
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