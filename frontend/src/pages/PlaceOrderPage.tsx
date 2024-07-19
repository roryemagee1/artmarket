import { JSX, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

import { useCreateOrderMutation } from '@src/slices/ordersApiSlice'
import { clearCartItems } from '@src/slices/cartSlice'

import CheckoutSteps from '@src/components/CheckoutSteps'
import Message from '@src/components/Message'
import Loader from '@src/components/Loader'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'
import { IItemKeys } from '@src/types/interfaces'

export default function PlaceOrder(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [ createOrder, { isLoading, error} ] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  async function handlePlaceOrder() {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap()
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch(err) {
      toast.error("Place Order Error!");
    }
  }
  
  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
              {` ${cart.shippingAddress.address},
               ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode},
               ${cart.shippingAddress.country}`}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {
                cart.cartItems.length === 0 && (
                  <>
                    <h2>Order Items</h2>
                    <Message evalBool={false} variant="">Your cart is empty.</Message>
                  </>
                )
              }
            </ListGroup.Item>
            
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">

              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    ${ cart.itemsPrice }
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    ${ cart.shippingPrice }
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>
                    ${ cart.taxPrice }
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    ${ cart.totalPrice }
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                { error && <Message evalBool={true} variant="danger">{`${error}`}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={() => handlePlaceOrder()}
                  >Place Order
                  </Button>
                  {isLoading && <Loader />}
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>

        <Col md={12}>
          {
            cart.cartItems.length !== 0 && (
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  { cart.cartItems.map((item: IItemKeys, i: number) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={4}>
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fluid 
                            rounded/>
                        </Col>
                        <Col md={4} style={{display: "flex", alignItems: "center"}}>
                          <Link to={`/products/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} style={{display: "flex", alignItems: "center"}}>
                          { item.qty } x ${ item.price } = ${ item.qty * item.price }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            )
          }
        </Col>

      </Row>
    </>
  )
}