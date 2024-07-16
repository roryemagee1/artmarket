import { JSX, FormEvent, useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { useUpdateProfileMutation } from '@src/slices/usersApiSlice'
import { setCredentials } from '@src/slices/authSlice'
import { useGetMyOrdersQuery } from '@src/slices/ordersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { IOrderKeys } from '@src/types/interfaces'
import type { RootState } from '@src/store'

export default function ProfilePage(): JSX.Element {
  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [ updateProfile, { isLoading: updateProfileLoading, error: updateProfileError } ] = useUpdateProfileMutation();

  const { data: orders, isLoading: myOrdersLoading, error: myOrdersError } = useGetMyOrdersQuery(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    let message = ""
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
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
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={event => handleSubmit(event)}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="textbox"
              placeholder="Enter name"
              value={name}
              onChange={event => setName(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Button 
            type="submit" 
            variant="primary" 
            className="my-2"
            onClick={(event) => handleSubmit(event)}
            disabled={ updateProfileLoading }
          >Update
          </Button>
          { updateProfileLoading && <Loader /> }
          { updateProfileError && <Message evalBool={false} variant="danger">An Error has occurred.</Message> }
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        { myOrdersLoading ? 
          <Loader /> : 
          myOrdersError ?
          <Message evalBool={false} variant="danger">Error loading orders.</Message> : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
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
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                    )
                  )
                }
              </tbody>
            </Table>
          )
        }
      </Col>
    </Row>
  )
}