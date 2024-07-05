import { JSX, FormEvent, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useLoginMutation } from '@src/slices/usersApiSlice';
import { setCredentials } from '@src/slices/authSlice';

import Loader from '@src/components/Loader'
import FormContainer from '@src/components/FormContainer'

import type { RootState } from '@src/store'

export default function LoginPage(): JSX.Element {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo }  = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error("Invalid Email or Password." /*err?.data.message) || err?.error*/);
    }
  }

  return (
    <>
      <FormContainer>
        <>
          <h1>Create Account</h1>
          <Form>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
            <Button 
              type="submit" 
              variant="primary" 
              className="mt-2"
              onClick={(event) => handleSubmit(event)}
              // onSubmit={(event) => handleSubmit(event)}
              disabled={ isLoading }
            >
              Sign In
            </Button>

            { isLoading && <Loader />}
          </Form>
          <Row>
            <Col>
              New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
            </Col>
          </Row>
        </>
      </FormContainer>
    </>
  )
}