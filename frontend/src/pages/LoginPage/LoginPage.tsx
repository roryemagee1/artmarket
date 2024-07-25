import { JSX, FormEvent, useState, useEffect, useId } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './LoginPage.css'

import { useLoginMutation } from '@src/slices/usersApiSlice';
import { setCredentials } from '@src/slices/authSlice';

import Loader from '@src/components/Loader'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'

export default function LoginPage(): JSX.Element {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const id = useId();

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
        <h1>Create Account</h1>
        <form>
          <div>
            <label htmlFor={id + "-email"}>Email Address</label>
            <input
              name="email"
              id={id + "-email"}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            >
            </input>
          </div>
          <div>
            <label htmlFor={id + "-password"}>Password</label>
            <input
              name="password"
              id={id + "-password"}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            >
            </input>
          </div>
          <button 
            type="submit" 
            className="login-button"
            onClick={(event) => handleSubmit(event)}
            disabled={ isLoading }
          >
            Sign In
          </button>
        </form>
        <div>
          <p>
            New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
          </p>
        </div>
        { isLoading && <Loader />}
      </section>
    </>
  )
}