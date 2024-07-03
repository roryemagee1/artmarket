import { JSX, FormEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { savePaymentMethod } from '@src/slices/cartSlice';

import FormContainer from '@src/components/FormContainer'
import CheckoutSteps from '@src/components/CheckoutSteps'

import type { RootState } from '@src/store'

export default function PaymentPage(): JSX.Element {
  const [ paymentMethod, setPaymentMethod ] = useState<string>("Paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping")
    }
  }, [shippingAddress, navigate]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder")
  }
  
  return (
    <FormContainer>
      <>
        <CheckoutSteps 
          step1={true}
          step2={true}
          step3={true}
          step4={false}
        />
        <h1>Payment Method</h1>
        <Form onSubmit={event => handleSubmit(event)}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                className="my-2"
                label="PayPal or Credit Card"
                id="PayPaly"
                name="paymentMethod"
                value={paymentMethod}
                checked
                onChange={event => setPaymentMethod(event.target.value)}
              >
              </Form.Check>
              <Button 
                type="submit" 
                variant="primary"
              >Continue
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </>
    </FormContainer>
  )
}