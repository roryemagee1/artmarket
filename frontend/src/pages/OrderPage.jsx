import { /*JSX,*/ useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

import { 
  useGetOrderByIdQuery, 
  usePayOrderMutation, 
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation, 
} from '@src/slices/ordersApiSlice'

import Message from '@src/components/Message'
import Loader from '@src/components/Loader'

// import { IItemKeys } from '@src/types/interfaces'
// import type { RootState } from '@src/store'

// Note: This file is coded in JSX instead of TSX because the the "type" key in
// loadPayPalScript does not play well with the reserved word "type" in Typescript.

export default function OrderPage() {
  const { id } = useParams();

  const { data: order, refetch, isLoading: isOrderLoading, error } = useGetOrderByIdQuery(id);
  
  const [ payOrder, { isLoading: payLoading } ] = usePayOrderMutation();

  const [ deliverOrder, { isLoading: deliverLoading } ] = useDeliverOrderMutation();

  const [ { isPending }, payPalDispatch ] = usePayPalScriptReducer();

  const { data: payPalData, isLoading: payPalLoading, error: payPalError } = useGetPayPalClientIdQuery({});

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!payPalError && !payPalLoading && payPalData.clientId) {
      loadPayPalScript();
    }
    if (order && !order.isPaid) {
      if (!payPalData) {
        loadPayPalScript();
      }
    }
    async function loadPayPalScript() {
      payPalDispatch({
        type: "resetOptions",
        value: {
          "client-id": payPalData.clientId,
          currency: "USD",
        }
      });
      payPalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [order, payPalData, payPalDispatch, payPalLoading, payPalError]);

  function onApprove(data, actions) {
    return actions.order.capture()
      .then(async function(details) {
        try {
          await payOrder({ id: id, data: details }).unwrap();
          refetch();
          toast.success("Payment successful!");
        } catch(err) {
          toast.error(err?.data.message || err?.message);
        }
      })
  }

  // async function onApproveTest() {
  //   await payOrder({ id, details: { payer: {} } });
  //     refetch();
  //     toast.success("Payment successful!");
  // }

  function onError(err) {
    toast.error(err.message);
  }
  
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice
          }
        }
      ]
    }).then(orderId => {
      return orderId;
    })
  }

  async function handleDeliverOrder() {
    try {
      await deliverOrder({ id });
      refetch();
      toast.success("Delivery marked complete!");
    } catch(err) {
      toast.error(err?.data.message || err.message);
    }
  }

  return isOrderLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error?.error}</Message>
  ) : (
    <>
      <h1>Order ID: {order._id}</h1>  
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              { 
                order.isPaid ? (
                  <Message variant="success">
                    {`Paid on ${order.paidAt}`}
                  </Message>
                ) : (
                  <Message variant="danger">
                    Not Paid
                  </Message>
                ) 
              }
            </ListGroup.Item>
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
                    {`Delivered on ${order.deliveredAt}`}
                  </Message>
                ) : (
                  <Message variant="danger">
                    Not Delivered
                  </Message>
                ) 
              }
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <h2>Order Items</h2>
              { 
                order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={4}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={4}>
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
            </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col><strong>Items</strong></Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col><strong>Shipping</strong></Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col><strong>Tax</strong></Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col><strong>Total Price</strong></Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              { 
                !order.isPaid && (
                  <ListGroup.Item>
                    { payLoading && <Loader /> }
                  
                  { isPending ? <Loader /> : (
                    <div>
                      {/* <Button 
                        onClick={onApproveTest} 
                        style={{marginBottom: "10px"}}
                      >Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons 
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                    )
                  }
                  </ListGroup.Item>
                )
              }

              { deliverLoading && <Loader /> }

              { 
                userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={handleDeliverOrder}
                    >Mark as Delivered.
                    </Button>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Card>
        </Col>

        <Col md={12}>
          <ListGroup variant="flush">
          <ListGroup.Item>
              <h2>Order Items</h2>
              { 
                order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={4}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={4} style={{display: "flex", alignItems: "center"}}>
                          <Link to={`/product/${item.product}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col md={4} style={{display: "flex", alignItems: "center"}}>
                         <strong>{item.qty} x ${item.price} = {item.qty * item.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )
                )
              }
            </ListGroup.Item>
          </ListGroup>
        </Col>

      </Row>
    </>
  )
}