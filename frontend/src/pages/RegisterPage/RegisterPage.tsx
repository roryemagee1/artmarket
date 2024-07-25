import { JSX, FormEvent, useState, useEffect, useId } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import './RegisterPage.css'

import { useRegisterMutation } from '@src/slices/usersApiSlice';
import { setCredentials } from '@src/slices/authSlice';

import Loader from '@src/components/Loader'

import Background from '@src/components/Background/Background'

import type { RootState } from '@src/store'

export default function RegisterPage(): JSX.Element {
  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const id = useId();

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
    let message = "";
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ data: res }));
        navigate(redirect);
      } catch (err) {
        if (err instanceof Error && "data" in err) {
          const output = err?.data as { message: string }
          message = output.message;
        }
        toast.error(message);
        toast.error("Invalid Email or Password.");
      }
    }
  }

  return (
    <>
      <Background variant="museum" whiteBackground={false} />
      <section className="register-styling">
        <h1>Sign In</h1>
        <form>
          <div>
            <label htmlFor={id + "-name"}>Name</label>
            <input
              name="name"
              id={id + "-name"}
              type="textbox"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
          <div>
            <label htmlFor={id + "-confirm-password"}>Confirm Password</label>
            <input
              name="confirmPassword"
              id={id + "-confirm-password"}
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            >
            </input>
          </div>
          <button 
            type="submit" 
            className="register-button"
            onClick={(event) => handleSubmit(event)}
            disabled={ isLoading }
          >Sign In
          </button>
        </form>
        <div>
          <p>
            Already a Customer? <Link to={ redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
          </p>
        </div>
        { isLoading && <Loader />}
      </section>
    </>
  )
}