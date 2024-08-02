import { JSX, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './PlaceOrderPage.css'

import { useCreateOrderMutation } from '@src/slices/ordersApiSlice'
import { clearCartItems } from '@src/slices/cartSlice'

import CheckoutSteps from '@src/components/CheckoutSteps/CheckoutSteps'
import Message from '@src/components/Message'
import Loader from '@src/components/Loader'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'
import { IItemKeys } from '@src/types/interfaces'

export default function PlaceOrder(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const [ createOrder, { isLoading, error} ] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  async function handlePlaceOrder() {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap()
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch(err) {
      toast.error("Place Order Error!");
    }
  }
  
  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      <section className="place-order-container">
        <div className="checkout-steps-spacing">
          <CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
        </div>
        <div className="order-area">
          <section className="order-information">
            <div>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod === "paypal" ? "PayPal" : "Other"}
              </p>
            </div>
            {
              cart.cartItems.length === 0 && (
                <div>
                  <h2>Order Items</h2>
                  <Message evalBool={false} variant="">Your cart is empty.</Message>
                </div>
              )
            }
            <div>
              <h2>Shipping Address</h2>
              <p>
                <strong>Street:   </strong> {cart.shippingAddress.address}
              </p>
              <p>
                <strong>City:     </strong> {cart.shippingAddress.city}
              </p>
              <p>
                <strong>Zip Code: </strong> {cart.shippingAddress.postalCode}
              </p>
              <p>
                <strong>Country: </strong> {cart.shippingAddress.country}
              </p>
            </div>
          </section>

          <section className="order-summary">
            <div className="order-summary-box">
              <h2>Order Summary</h2>
              <hr />
              <span>
                <p><strong>Items:</strong></p>
                <p>
                  ${ cart.itemsPrice }
                </p>
              </span>
              <hr />
              <span>
                <p><strong>Shipping:</strong></p>
                <p>
                  ${ cart.shippingPrice }
                </p>
              </span>
              <hr />
              <span>
                <p><strong>Tax:</strong></p>
                <p>
                  ${ cart.taxPrice }
                </p>
              </span>
              <hr />
              <span>
                <p><strong>Total:</strong></p>
                <p>
                  ${ cart.totalPrice }
                </p>
              </span>
              <hr />
              { error && <Message evalBool={true} variant="danger">{`${error}`}</Message>}
              <button
                className="order-summary-button"
                disabled={cart.cartItems.length === 0}
                onClick={() => handlePlaceOrder()}
              >Place Order
              </button>
                {isLoading && <Loader />}
            </div>
          </section>
        </div>

        <section className="order-items">
          {
            cart.cartItems.length !== 0 && (
              <ol>
                <h2>Order Items</h2>
                { cart.cartItems.map((item: IItemKeys, i: number) => (
                  <li key={i}>
                    <span>
                      <div className="order-item-image">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                        />
                      </div>
                      <div>
                        <Link to={`/products/${item._id}`}>
                          {item.name}
                        </Link>
                      </div>
                      <p>
                        <strong>{ item.qty } x ${ item.price } = ${ item.qty * item.price }</strong>
                      </p>
                    </span>
                  </li>
                ))}
              </ol>
            )
          }
        </section>

      </section>
    </>
  )
}