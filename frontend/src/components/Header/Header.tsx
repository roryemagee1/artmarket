import { JSX } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './Header.css'

import logo from '@src/assets/audasite.png'

import { useLogoutMutation } from '@src/slices/usersApiSlice';
import { removeCredentials } from '@src/slices/authSlice';
import { resetCart } from '@src/slices/cartSlice';

import Drawer from '@src/components/Drawer/Drawer'

import { handleResetWindow } from '@src/utils/miscUtils'

import type { RootState } from '@src/store'

export default function Header(): JSX.Element {
  const  { cartItems }  = useSelector((state: RootState) => state.cart);
  const  { userInfo }  = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logout ] = useLogoutMutation();

  async function handleLogout() {
    let message = "";
    try {
      const res = await logout({});
      if (res?.error) {
        const dataObj = res?.error as { data: { message: string, stack: string }}
        message = dataObj.data.message as string;
        toast.error(message);
      } else {
        dispatch(removeCredentials());
        dispatch(resetCart());
        navigate('/login');
      }
    } catch (err) {
      if (err instanceof Error && "data" in err) {
        const output = err?.data as { message: string }
        message = output.message;
      }
      toast.error(message || "Failed to logout!");
    }
  }

  return (
    <>
      <header>
        <section className="nav-container">
          <Link className="no-decoration text-light" to="/" onClick={() => handleResetWindow()}>
            <div className="brand-box">
              <img src={logo} alt="Audasite LLC Logo"/>
              <h1>ArtMarket</h1>
            </div>
          </Link>
          <Drawer cartItems={cartItems} userInfo={userInfo} handleLogout={handleLogout} />
        </section>
      </header>   
      <div className="header-spacer" />
    </>
  )
}