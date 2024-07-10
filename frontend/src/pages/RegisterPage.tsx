import { JSX, FormEvent, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useRegisterMutation } from '@src/slices/usersApiSlice';
import { setCredentials } from '@src/slices/authSlice';

import Loader from '@src/components/Loader'
import FormContainer from '@src/components/FormContainer'

import type { RootState } from '@src/store'

export default function RegisterPage(): JSX.Element {
  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ register, { isLoading } ] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error("Invalid Email or Password." /*err?.data.message) || err?.error*/);
      }
    }
  }

  return (
    <>
      <FormContainer>
        <>
          <h1>Sign In</h1>
          <Form>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="textbox"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              >
              </Form.Control>
            </Form.Group>
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
            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
            >Sign In
            </Button>
          </Form>
          <Row>
            <Col>
              Already a Customer? <Link to={ redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
            </Col>
          </Row>
          { isLoading && <Loader />}
        </>
      </FormContainer>
    </>
  )
}