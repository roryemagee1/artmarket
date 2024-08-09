import { JSX } from 'react'
import { Link } from 'react-router-dom'
import { GoTriangleRight } from 'react-icons/go'
import './CheckoutSteps.css'

interface ICheckoutSteps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

export default function CheckoutSteps({ step1=false, step2=false, step3=false, step4=false }: ICheckoutSteps): JSX.Element {
  return (
    <nav className="checkout-nav">
      <div>
        {
          step1 ? (
            <Link className="checkout-link-active" to="/login">Shop</Link>
          ) : (
            <p className="checkout-link-inactive">Sign In</p>
          )
        }
      </div>
      <GoTriangleRight />
      <div>
        {
          step2 ? (
            <Link className="checkout-link-active" to="/shipping">Shipping</Link>
          ) : (
            <p className="checkout-link-inactive">Shipping</p>
          )
        }
      </div>
      <GoTriangleRight />
      <div>
        {
          step3 ? (
            <Link className="checkout-link-active" to="/payment">Payment</Link>
          ) : (
            <p className="checkout-link-inactive">Payment</p>
          )
        }
      </div>
      <GoTriangleRight />
      <div>
        {
          step4 ? (
            <Link className="checkout-link-active" to="/placeorder">Place Order</Link>
          ) : (
            <p className="checkout-link-inactive">Place Order</p>
          )
        }
      </div>
    </nav>
  )
}