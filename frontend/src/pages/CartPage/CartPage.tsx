import { JSX, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import './CartPage.css'

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
// import Button  from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

import { addToCart, removeFromCart } from '@src/slices/cartSlice';

import Message from '@src/components/Message'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'
import { IItemKeys } from '@src/types/interfaces'

export default function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems }  = useSelector((state: RootState) => state.cart);

  function handleAddToCart(product: IItemKeys, event: ChangeEvent) {
    const { value } = event.target as HTMLSelectElement
    const output = Number(value);
    dispatch(addToCart({ ...product, qty: output }));
  }

  function handleRemoveFromCart(itemId: string) {
    dispatch(removeFromCart(itemId));
  }

  function handleCheckout() {
    navigate("/login?redirect=/shipping");
  }

  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      <h1>Shopping Cart</h1>
      <section className="checkout-container">
        <section className="shopping-cart">
        { 
          cartItems.length === 0 ? (
            <>
              <Message evalBool={false} variant="info">
                <>Your cart is empty. <Link to="/">Return to home</Link>.</>
              </Message>
            </>
          ) : (
            <>
            <ol>
              { cartItems.map( (item: IItemKeys) => (
                <li key={item._id}>
                  <span>
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-text">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </div>
                    <p>
                      ${item.price}
                    </p>
                    <div className="select-quantity">
                      <label htmlFor="selectQuantity" />
                      <select
                        name="selectQuantity"
                        value={item.qty}
                        onChange={(event: ChangeEvent) => handleAddToCart(item, event)}
                      >
                        {[...Array(item?.countInStock).keys()].map((key) => (
                          <option key={key + 1 } value={key + 1}>{key + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button className="trash-button" type="button" onClick={() => handleRemoveFromCart(item._id)}><FaTrash /></button>
                    </div>
                  </span>
                </li>
                ))
              }
             </ol>
            </>
          )
        }
        </section>
        <section className="checkout">
        {/* <Col md={4}> */}
          <div className="checkout-box">
            <div>
              <h2>
                Subtotal ({ cartItems?.reduce((acc: number, curr: IItemKeys) => acc + curr.qty, 0)}) Items
              </h2>
              <span>
                <p><strong>Amount: </strong></p>
                <p>
                  ${cartItems?.reduce((acc: number, curr: IItemKeys) => acc + curr.qty * curr.price, 0).toFixed(2)}
                </p>
              </span>
            </div>
            < hr />
            <div>
              <button 
                type="button" 
                className="checkout-button" 
                disabled={ cartItems.length === 0}
                onClick={() => handleCheckout()}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        {/* </Col> */}
        </section>
      </section>
      {/* <Row>
        <Col md={8}>
        <h1 style={{marginBottom: "20px"}}>Shopping Cart</h1>
        { 
          cartItems.length === 0 ? (
            <>
              <Message evalBool={false} variant="info">
                <>Your cart is empty. <Link to="/">Return to home</Link>.</>
              </Message>
            </>
          ) : (
            <ListGroup variant="flush">
              { cartItems.map( (item: IItemKeys) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(event: ChangeEvent) => handleAddToCart(item, event)}
                      >
                        {[...Array(item?.countInStock).keys()].map((key) => (
                          <option key={key + 1 } value={key + 1}>{key + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type="button" onClick={() => handleRemoveFromCart(item._id)}><FaTrash /></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                ))
              }
            </ListGroup>
          )
        }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({ cartItems?.reduce((acc: number, curr: IItemKeys) => acc + curr.qty, 0)}) Items
                </h2>
                ${cartItems?.reduce((acc: number, curr: IItemKeys) => acc + curr.qty * curr.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button 
                  type="button" 
                  className="btn-block" 
                  disabled={ cartItems.length === 0}
                  onClick={() => handleCheckout()}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row> */}
    </>
  )
}