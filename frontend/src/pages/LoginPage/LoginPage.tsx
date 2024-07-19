import { JSX, FormEvent, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './LoginPage.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useLoginMutation } from '@src/slices/usersApiSlice';
import { setCredentials } from '@src/slices/authSlice';

import Loader from '@src/components/Loader'
import FormContainer from '@src/components/FormContainer'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'

export default function LoginPage(): JSX.Element {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ login, { isLoading } ] = useLoginMutation();

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
    let message: string = "";
    try {
      const res = await login({ email, password });
      if (res?.error) {
        const dataObj = res?.error as { data: { message: string, stack: string }}
        message = dataObj.data.message as string;
        toast.error(message);
      } else {
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      }
    } catch (err) {
      if (err instanceof Error && "data" in err) {
        const output = err?.data as { message: string }
        message = output.message;
      }
      toast.error(message);
    }
  }

  return (
    <>
      <Background variant="museum" whiteBackground={false} />
      <section className="login-styling">
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
                disabled={ isLoading }
              >
                Sign In
              </Button>
            </Form>
            <Row>
              <Col>
                New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
              </Col>
            </Row>
            { isLoading && <Loader />}
          </>
        </FormContainer>
      </section>
    </>
  )
}