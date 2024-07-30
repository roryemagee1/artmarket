import { JSX, FormEvent, useState, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './ShippingPage.css'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

import { saveShippingAddress } from '@src/slices/cartSlice'

import FormContainer from '@src/components/FormContainer/FormContainer'
import CheckoutSteps from '@src/components/CheckoutSteps/CheckoutSteps'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'

export default function ShippingPage(): JSX.Element {
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;
  const id = useId();

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
      <Background variant="museum" whiteBackground={false} />
      <FormContainer>
        <section className="shipping-form-styling">
          <CheckoutSteps 
            step1={true}
            step2={true}
            step3={false}
            step4={false}
          />
          <h1>Shipping</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor={id + "-address"}>Address</label>
              <input
                name="address"
                id={id + "-address"}
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={event => setAddress(event.target.value)}
              >
              </input>
            </div>
            <div>
              <label htmlFor={id + "-city"}>City</label>
              <input
                name="city"
                id={id + "-city"}
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={event => setCity(event.target.value)}
              >
              </input>
            </div>
            <div>
              <label htmlFor={id + "-postal-code"}>Postal code</label>
              <input
                name="postal code"
                id={id + "-postal-code"}
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={event => setPostalCode(event.target.value)}
              >
              </input>
            </div>
            <div>
              <label htmlFor={id + "-country"}>Country</label>
              <input
                name="country"
                id={id + "-country"}
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={event => setCountry(event.target.value)}
              >
              </input>
            </div>
            <button 
              type="submit" 
              className="shipping-form-button" 
              onClick={event => handleSubmit(event)}
            >Continue
            </button>
          </form>
        </section>
      </FormContainer>
    </>
  )
}