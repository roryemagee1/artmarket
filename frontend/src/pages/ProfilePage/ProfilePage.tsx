import { JSX, FormEvent, useState, useEffect, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import './ProfilePage.css'

// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form'
// import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'

import { useUpdateProfileMutation } from '@src/slices/usersApiSlice'
import { setCredentials } from '@src/slices/authSlice'
import { useGetMyOrdersQuery } from '@src/slices/ordersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import Background from '@src/components/Background/Background'

import { IOrderKeys } from '@src/types/interfaces'
import type { RootState } from '@src/store'

export default function ProfilePage(): JSX.Element {
  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const id = useId();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [ updateProfile, { isLoading: updateProfileLoading, error: updateProfileError } ] = useUpdateProfileMutation();

  const { data: orders, isLoading: myOrdersLoading, error: myOrdersError } = useGetMyOrdersQuery(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.data.name);
      setEmail(userInfo.data.email);
    }
  }, [userInfo, userInfo.data.name, userInfo.data.email])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    let message = ""
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    } else {
      try {
        const res = await updateProfile({ _id: userInfo.data._id, name, email, password }).unwrap();
        dispatch(setCredentials({ data: res }));
        toast.success("Profile updated successfully.");
      } catch (err) {
        if (err instanceof Error && "data" in err) {
          const output = err?.data as { message: string }
          message = output.message;
        }
        toast.error(message);
      }
    }
  }
  
  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      <section className="profile-container">
        <section className="profile-form-styling">
          <h2>User Profile</h2>
          <form onSubmit={event => handleSubmit(event)}>
            <div>
              <label htmlFor={id + "-name"}>Name</label>
              <input
                name="name"
                id={id + "-name"}
                type="textbox"
                placeholder="Enter name"
                value={name}
                onChange={event => setName(event.target.value)}
              >
              </input>
            </div>
            <div>
              <label htmlFor={id + "-email"}>Email Address</label>
              <input
                name="email"
                id={id + "-email"}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              >
              </input>
            </div>
            <div>
              <label htmlFor={id + "-new-password"}>New Password</label>
              <input
                name="newPassword"
                id={id + "-new-password"}
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              >
              </input>
            </div>
            <div>
              <label htmlFor={id + "-confirm-password"}>Confirm Password</label>
              <input
                name="confirmPassword"
                id={id + "=confirm-password"}
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
              >
              </input>
            </div>
            <button 
              type="submit" 
              className="profile-form-button"
              onClick={(event) => handleSubmit(event)}
              disabled={ updateProfileLoading }
            >Update
            </button>
            { updateProfileLoading && <Loader /> }
            { updateProfileError && <Message evalBool={false} variant="danger">An Error has occurred.</Message> }
          </form>
        </section>
        <section className="orders-table">
          <h2>My Orders</h2>
          { myOrdersLoading ? 
            <Loader /> : 
            myOrdersError ?
            <Message evalBool={false} variant="danger">Error loading orders.</Message> : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    orders?.map((order: IOrderKeys) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
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
                      )
                    )
                  }
                </tbody>
              </table>
            )
          }
        </section>
      </section>
    </>
  )
}