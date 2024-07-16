import { JSX, FormEvent, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useGetProductsDetailsQuery, useCreateReviewMutation } from '@src/slices/productsApiSlice';
import { addToCart } from '@src/slices/cartSlice';

import Rating from '@src/components/Rating'
import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import Meta from '@src/components/Meta'

import type { RootState } from '@src/store'
import { IReviewKeys } from '@src/types/interfaces'

export default function ProductPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ qty, setQty ] = useState<number>(1);
  const [ rating, setRating ] = useState<number>(0);
  const [ comment, setComment ] = useState<string>("");
  
  // const { data: product, isLoading, error } = useGetProductsDetailsQuery(id);
  const res = useGetProductsDetailsQuery(id);

  const [ createReview, { isLoading: productReviewLoading} ] = useCreateReviewMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  function handleAddToCart() {
    dispatch(addToCart({ ...res.data, qty }));
    navigate('/cart');
  }

  async function handleSubmitReview(event: FormEvent) {
    event.preventDefault();
    try {
      await createReview({ id, rating, comment }).unwrap();
      toast.success("Review submitted successfully!");
      res.refetch();
    } catch(err) {
      toast.error("Review submission failed."/* || err?.data?.message || err?.error*/);
    }
  }

  return (
    <>
      <Meta title={res?.data?.name} description={res?.data?.description}/>
      <Link className="btn btn-light my-3" to="/">
          Back
      </Link>
      { 
        res.isLoading ? 
          <Loader /> : 
          res.error ? 
            <Message evalBool={false} variant="danger">{ res?.data?.message ? res?.data?.message : res?.error ? res?.error : "Unknown Error!" }</Message> :
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
                          name="select"
                          as="select"
                          value={qty}
                          onChange={(event) => setQty(Number(event.target.value))}
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

        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            {res?.data.reviews.length === 0 && <Message evalBool={false} variant="info">No Reviews</Message>}
            <ListGroup variant="flush">
              {
                res?.data.reviews.map((review: IReviewKeys) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} text="" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))
              }
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {productReviewLoading && <Loader />}
                { 
                  userInfo ? (
                    <Form>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          name="rating"
                          as="select"
                          onChange={(event) => setRating(Number(event.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Bad</option>
                          <option value="2">2 - Poor</option>
                          <option value="3">3 - Fair</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="my-2">
                        <Form.Control
                          name="comment"
                          as="textarea"
                          style={{height: "120px"}}
                          value={comment}
                          placeholder="Click here to write a review."
                          onChange={(event) => setComment(event.target.value)}
                        >
                        </Form.Control>
                      </Form.Group>

                      <Button
                        disabled={productReviewLoading}
                        type="submit"
                        variant="primary"
                        onClick={(event) => handleSubmitReview(event)}
                      >Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message evalBool={false} variant="info"><>Please <Link to="/login">sign in</Link> to leave a review.</></Message>
                  ) 
                }
              </ListGroup.Item>
            </ListGroup>
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