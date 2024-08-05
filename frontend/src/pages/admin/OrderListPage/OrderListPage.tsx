import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import './OrderListPage.css'

import { useGetOrdersQuery } from '@src/slices/ordersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import Background from '@src/components/Background/Background'

import { IOrderKeys } from '@src/types/interfaces'

export default function OrderListPage(): JSX.Element {
  const { data: orders, isLoading, error } = useGetOrdersQuery(null);

  const navigate = useNavigate();

  return (
    <section className="order-list-container">
      <Background variant="museum" whiteBackground={true} />
      <section className="order-list-title">
        <h1>Orders</h1>
      </section>
      {
        isLoading ? 
          <Loader /> : 
        error ?
          <Message evalBool={false} variant="danger">{`${error}`}</Message> : 
        (
          <table>
            <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { 
                  orders?.map((order: IOrderKeys) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order?.user && order?.user?.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        { 
                          order.isPaid && order.paidAt ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )
                        }
                      </td>
                      <td>
                        { 
                          order.isDelivered && order?.deliveredAt ? (
                            order.deliveredAt?.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )
                        }
                      </td>
                      <td>
                        <button onClick={() => navigate(`/order/${order._id}`)} className="details-button">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
          </table>
        )
      }
    </section>
  )
}