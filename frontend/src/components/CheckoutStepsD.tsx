import { JSX } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

interface ICheckoutSteps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

export default function CheckoutSteps({ step1=false, step2=false, step3=false, step4=false }: ICheckoutSteps): JSX.Element {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {
          step1 ? (
            <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )
        }
      </Nav.Item>
      <Nav.Item>
        {
          step2 ? (
            <Nav.Link as={Link} to="/shipping">Shipping</Nav.Link>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )
        }
      </Nav.Item>
      <Nav.Item>
        {
          step3 ? (
            <Nav.Link as={Link} to="/payment">Payment</Nav.Link>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )
        }
      </Nav.Item>
      <Nav.Item>
        {
          step4 ? (
            <Nav.Link as={Link} to="/placeorder">Place Order</Nav.Link>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )
        }
      </Nav.Item>
    </Nav>
  )
}