import { /*JSX,*/ useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './OrderPage.css'

import { 
  useGetOrderByIdQuery, 
  usePayOrderMutation, 
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation, 
} from '@src/slices/ordersApiSlice'

import Message from '@src/components/Message'
import Loader from '@src/components/Loader'

import Background from '@src/components/Background/Background'

// import { IItemKeys } from '@src/types/interfaces'
// import type { RootState } from '@src/store'

// Note: This file is coded in JSX instead of TSX because the the "type" key in
// loadPayPalScript does not play well with the reserved word "type" in Typescript.

export default function OrderPage() {
  const { id } = useParams();

  const { data: order, refetch, isLoading: isOrderLoading, error } = useGetOrderByIdQuery(id);
  
  const [ payOrder, { isLoading: payLoading } ] = usePayOrderMutation();

  const [ deliverOrder, { isLoading: deliverLoading } ] = useDeliverOrderMutation();

  const [ { isPending }, payPalDispatch ] = usePayPalScriptReducer();

  const { data: payPalData, isLoading: payPalLoading, error: payPalError } = useGetPayPalClientIdQuery({});

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!payPalError && !payPalLoading && payPalData.clientId) {
      loadPayPalScript();
    }
    if (order && !order.isPaid) {
      if (!payPalData) {
        loadPayPalScript();
      }
    }
    async function loadPayPalScript() {
      payPalDispatch({
        type: "resetOptions",
        value: {
          "client-id": payPalData.clientId,
          currency: "USD",
        }
      });
      payPalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [order, payPalData, payPalDispatch, payPalLoading, payPalError]);

  function onApprove(data, actions) {
    return actions.order.capture()
      .then(async function(details) {
        try {
          await payOrder({ id: id, data: details }).unwrap();
          refetch();
          toast.success("Payment successful!");
        } catch(err) {
          toast.error(err?.data.message || err?.message);
        }
      })
  }

  function onError(err) {
    toast.error(err.message);
  }
  
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice
          }
        }
      ]
    }).then(orderId => {
      return orderId;
    })
  }

  async function handleDeliverOrder() {
    try {
      await deliverOrder({ id });
      refetch();
      toast.success("Delivery marked complete!");
    } catch(err) {
      toast.error(err?.data.message || err.message);
    }
  }

  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      {
        isOrderLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error?.error}</Message>
        ) : (
          <section className="order-container">
            <h2>Order ID: {order._id}</h2>  
            <div className="order-area">
              <section className="order-information">
                <ol>
                  <li>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod === "paypal" ? "PayPal" : "Other"}
                    </p>
                    { 
                      order.isPaid ? (
                        <Message variant="success">
                          {`Paid on ${order.paidAt}`}
                        </Message>
                      ) : (
                        <Message variant="danger">
                          Not Paid
                        </Message>
                      ) 
                    }
                  </li>
                  <li>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong> {order.user.email}
                    </p>
                    <p>
                      <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    { 
                      order.isDelivered ? (
                        <Message variant="success">
                          {`Delivered on ${order.deliveredAt}`}
                        </Message>
                      ) : (
                        <Message variant="danger">
                          Not Delivered
                        </Message>
                      ) 
                    }
                  </li>
                </ol>
              </section>
              <section className="order-summary">
                <div className="order-summary-box">
                      <h2>Order Summary</h2>
                      <span>
                        <p><strong>Items</strong></p>
                        <p>${order.itemsPrice}</p>
                      </span>
                      <span>
                        <p><strong>Shipping</strong></p>
                        <p>${order.shippingPrice}</p>
                      </span>
                      <span>
                        <p><strong>Tax</strong></p>
                        <p>${order.taxPrice}</p>
                      </span>
                      <span>
                        <p><strong>Total Price</strong></p>
                        <p>${order.totalPrice}</p>
                      </span>
                    { 
                      !order.isPaid && (
                        <>
                          { payLoading && <Loader /> }
                        
                          { isPending ? <Loader /> : (
                            <div>
                              <div>
                                <PayPalButtons 
                                  createOrder={createOrder}
                                  onApprove={onApprove}
                                  onError={onError}
                                />
                              </div>
                            </div>
                            )
                          }
                        </>
                      )
                    }

                    { deliverLoading && <Loader /> }

                    { 
                      userInfo && userInfo.data.isAdmin && order.isPaid && !order.isDelivered && (
                        <button
                          className="order-summary-button"
                          onClick={handleDeliverOrder}
                        >Mark as Delivered
                        </button>
                      )
                    }
                  
                </div>
              </section>
            </div>

              <section className="order-items">
                <ol>
                  <h2>Order Items</h2>
                  { 
                    order.orderItems.map((item, i) => (
                        <li key={i}>
                          <span>
                            <div className="order-item-image">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                            />
                            </div>
                            <div>
                              <Link to={`/product/${item.product}`}>
                                <strong>{item.name}</strong>
                              </Link>
                            </div>
                            <p>
                              <strong>{item.qty} x ${item.price} = {item.qty * item.price}</strong>
                            </p>
                          </span>
                        </li> 
                      )
                    )
                  }
                </ol>
              </section>
          </section>
        )
      }
    </>
  )
}