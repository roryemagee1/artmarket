import { JSX, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { saveShippingAddress } from '@src/slices/cartSlice';

import FormContainer from '@src/components/FormContainer';

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

  // function handleChangeEntry(event: ChangeEvent) {
  //   const { value, name } = event.target as HTMLFormElement
  //   switch(name) {
  //     case "address":
  //       setAddress(value);
  //       break;
  //     case "password":
  //       setPassword(value);
  //       break;
  //   }
  // }

  return (
    <FormContainer>
      <>
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
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="city"
              type="text"
              placeholder="Enter city"
              value={address}
              onChange={event => setCity(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="postal code" className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="postal code"
              type="text"
              placeholder="Enter postal code"
              value={address}
              onChange={event => setPostalCode(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="country" className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="country"
              type="text"
              placeholder="Enter country"
              value={address}
              onChange={event => setCountry(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2" onClick={event => handleSubmit(event)}>Continue</Button>
        </Form>
      </>
    </FormContainer>
  )
}