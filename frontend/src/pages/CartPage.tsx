import { JSX, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import { useGetProductsQuery } from '../slices/productsApiSlice';
import { addToCart, removeFromCart } from '@src/slices/cartSlice';

// import Product from '@src/components/Product'
// import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
// import QuantityDropdown from '@src/components/QuantityDropdown'

import type { RootState } from '@src/store'
import { IItemKeys } from '@src/types/interfaces'

export default function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  { cartItems }  = useSelector((state: RootState) => state.cart);

  function handleAddToCart(product: IItemKeys, event: ChangeEvent) {
    const { value } = event.target as HTMLSelectElement
    const output = Number(value);
    dispatch(addToCart({ ...product, qty: output }));
  }

  function handleRemoveFromCart(itemId: string) {
    dispatch(removeFromCart(itemId));
  }

  function handleCheckout() {
    navigate("./login?redirect=/shipping");
  }

  return (
    <>
      <Row>
        <Col md={8}>
        <h1 style={{marginBottom: "20px"}}>Shopping Cart</h1>
        { 
          cartItems.length === 0 ? (
            <>
              <Message variant="info">
                Your cart is empty.
              </Message>
            </>
          ): (
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
                    {/* <QuantityDropdown data={item}/> */}
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
      </Row>
      { !cartItems.length && <Link className="btn btn-light my-3" to="/">Go Home</Link>}
    </>
  )
}