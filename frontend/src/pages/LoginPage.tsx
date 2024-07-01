import { JSX, FormEvent, ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import { useGetProductsQuery } from '../slices/productsApiSlice';

// import Product from '@src/components/Product'
// import Loader from '@src/components/Loader'
// import Message from '@src/components/Message'
import FormContainer from '@src/components/FormContainer'

// import { IProductKeys } from '@src/types/interfaces'

export default function LoginPage(): JSX.Element {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  function handleChangeEntry(event: ChangeEvent) {
    const { value, type } = event.target as HTMLFormElement
    switch(type) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("Submit");
  }


  return (
    <>
      <FormContainer>
        <>
          <h1>Sign In</h1>
          <Form>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => handleChangeEntry(event)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => handleChangeEntry(event)}
              >
              </Form.Control>
            </Form.Group>
            <Button 
              type="submit" 
              variant="primary" 
              className="mt-2"
              onSubmit={(event) => handleSubmit(event)}
            >
              Sign In</Button>
          </Form>
          <Row>
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </>
      </FormContainer>
    </>
  )
}