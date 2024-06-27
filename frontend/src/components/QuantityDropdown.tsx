import { JSX, ChangeEvent, useState } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import ListGroup from 'react-bootstrap/ListGroup'
// import Card from 'react-bootstrap/Card'
// import Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// import { useGetProductsDetailsQuery } from '@src/slices/productsApiSlice';
// import { addToCart } from '@src/slices/cartSlice';

// import Rating from '@src/components/Rating'
// import Loader from '@src/components/Loader'
// import Message from '@src/components/Message'

import { IItem } from '@src/types/interfaces'

export default function QuantityDropdown({data}: IItem): JSX.Element {
  const [ qty, setQty ] = useState<number>(1);

  function handleQty(event: ChangeEvent) {
    const { value } = event.target as HTMLSelectElement
    setQty(Number(value));
  }
  
  return (
    <Row>
      <Col>Qty</Col>
      <Col>
        <Form.Control
          as="select"
          value={qty}
          onChange={(event: ChangeEvent) => handleQty(event)}
        >
          {[...Array(data?.countInStock).keys()].map((key) => (
            <option key={key + 1 } value={key + 1}>{key + 1}</option>
          ))}
        </Form.Control>
      </Col>
    </Row>
  )
}