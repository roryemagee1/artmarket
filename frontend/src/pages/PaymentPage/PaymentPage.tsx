import { JSX, FormEvent, useState, useEffect, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './PaymentPage.css'

import { savePaymentMethod } from '@src/slices/cartSlice';

import FormContainer from '@src/components/FormContainer/FormContainer'
import CheckoutSteps from '@src/components/CheckoutSteps/CheckoutSteps'

import Message from '@src/components/Message'
import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'

export default function PaymentPage(): JSX.Element {
  const [ paymentMethod, setPaymentMethod ] = useState<string>("paypal");
  const id = useId();

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
    <>
      <Background variant="museum" whiteBackground={false} />
      <FormContainer>
        <section className="payment-form-styling">
          <CheckoutSteps 
            step1={true}
            step2={true}
            step3={true}
            step4={false}
          />
          <h1>Payment Method</h1>
          <form onSubmit={event => handleSubmit(event)}>
            <fieldset>
              <legend>Select Method</legend>
              <div>
                <input
                  type="radio"
                  id={id + "-paypal"}
                  name="paypal"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={event => setPaymentMethod(event.target.value)}
                >
                </input>
                <label htmlFor={id + "paypal"}>Paypal or Credit card</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={id + "-other"}
                  name="other"
                  value="other"
                  checked={paymentMethod === "other"}
                  onChange={event => setPaymentMethod(event.target.value)}
                >
                </input>
                <label htmlFor={id + "-other"}>Other</label>
              </div>
              <button 
                type="submit" 
                className="payment-form-button"
                disabled={paymentMethod === "other"}
              >Continue
              </button>
              { 
                paymentMethod === "other" && (
                  <Message 
                    variant="danger" 
                    evalBool={false}
                  >Other Payment methods are currently unavailable.
                  </Message>
                )
              }
            </fieldset>
          </form>
        </section>
      </FormContainer>
    </>
  )
}