import { JSX } from 'react'
import { Link, useParams } from 'react-router-dom'

// import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

import { useGetOrderByIdQuery } from '@src/slices/ordersApiSlice'

import Message from '@src/components/Message'
import Loader from '@src/components/Loader'

import { IItemKeys } from '@src/types/interfaces'

export default function OrderPage(): JSX.Element {
  const { id: orderId } = useParams();

  const { data: order, /* refetch,*/ isLoading, isError } = useGetOrderByIdQuery(orderId);
  
  console.log(order);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">Order Error!</Message>
  ) : (
    <>
      <h1>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              { 
                order.isDelivered ? (
                  <Message variant="success">
                    <> Delivered on {order.deliveredAt} </>
                  </Message>
                ) : (
                  <Message variant="danger">
                    Not Delivered
                  </Message>
                ) 
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              { 
                order.isPaid ? (
                  <Message variant="success">
                    <> Paid on {order.paidAt} </>
                  </Message>
                ) : (
                  <Message variant="danger">
                    Not Paid
                  </Message>
                ) 
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              { 
                order.orderItems.map((item: IItemKeys, i: number) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                )
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* Pay Order Button Placeholder */}
              {/* Mark as Paid Button Placeholder */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}