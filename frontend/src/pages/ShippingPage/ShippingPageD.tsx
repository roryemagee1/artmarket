import { JSX, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { saveShippingAddress } from '@src/slices/cartSlice'

import FormContainer from '@src/components/FormContainer/FormContainer'
import CheckoutSteps from '@src/components/CheckoutSteps/CheckoutSteps'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'

export default function ShippingPage(): JSX.Element {
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;

  const [ address, setAddress ] = useState<string>(shippingAddress?.address || "");
  const [ city, setCity ] = useState<string>(shippingAddress?.city || "");
  const [ postalCode, setPostalCode ] = useState<string>(shippingAddress?.postalCode || "");
  const [ country, setCountry ] = useState<string>(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (address && city && postalCode && country) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      navigate("/payment")
    } else {
      toast.error("A field is invalid.");
    }
  }

  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      <FormContainer>
        <>
          <CheckoutSteps 
            step1={true}
            step2={true}
            step3={false}
            step4={false}
          />
          <h1>Shipping</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="address" className="my-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={event => setAddress(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="my-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={event => setCity(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="postal code" className="my-2">
              <Form.Label>Postal code</Form.Label>
              <Form.Control
                name="postal code"
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={event => setPostalCode(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="my-2">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={event => setCountry(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Button 
              type="submit" 
              variant="primary" 
              className="my-2" 
              onClick={event => handleSubmit(event)}
            >Continue
            </Button>
          </Form>
        </>
      </FormContainer>
    </>
  )
}