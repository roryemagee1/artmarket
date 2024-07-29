import { JSX, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { IoMenu } from "react-icons/io5";
// import { useSelector, useDispatch } from 'react-redux'
// import { toast } from 'react-toastify'
import './Drawer.css'

import SearchBox from '@src/components/SearchBox/SearchBox'

import { IUser, IItemKeys } from '@src/types/interfaces'

interface IDrawer {
  cartItems: Array<IItemKeys>;
  userInfo: IUser;
  handleLogout: () => void;
}
export default function Drawer({ cartItems, userInfo, handleLogout }: IDrawer): JSX.Element {
  const cartTotal: number = cartItems?.reduce((acc: number, curr: IItemKeys) => acc + curr.qty, 0);
  const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>(false);
  
  return (
    <nav className="header-nav">
      <SearchBox />
      <Link className="no-decoration cart-icon-container" to="/cart">
        <FaShoppingCart className="cart-icon"/> Cart
        {
          (cartItems.length > 0) && (
            <div>
              <p>
                {cartTotal}
              </p>
            </div>
          )
        }
      </Link>
      <button className="text-button" onClick={() => setIsMenuOpen((prevState) => !prevState)}>
        { 
          isMenuOpen ? 
          <GoTriangleDown /> :
          <GoTriangleUp />
        }
      </button>
      {isMenuOpen && <aside className="aside-menu">
        {
          userInfo && userInfo.data.isAdmin ? (
            <div>
              <Link className="no-decoration text-dark hover-grey anchor-margin" to="/admin/productlist">Products</Link>
              <Link className="no-decoration text-dark hover-grey anchor-margin" to="/admin/userlist">Users</Link>
              <Link className="no-decoration text-dark hover-grey anchor-margin" to="/admin/orderlist">Orders</Link>
              <Link className="no-decoration text-dark hover-grey anchor-margin" to="/profile">Profile</Link>
              <button className="text-button text-dark hover-grey" onClick={handleLogout}>Logout</button>
            </div>
          ) :
          userInfo ? (
            // <Link className="no-decoration" to="/profile">
            //   <div className="menu-dropdown">
            //   <p className="nav-text">
            //     { userInfo.data.name } <GoTriangleDown />
            //   </p>
            //   {/* <IoMenu className="nav-menu" /> */}
            //   </div>
            // </Link>
            <div>
              <Link className="no-decoration text-dark hover-grey anchor-margin" to="/profile">Profile</Link>
              <button className="text-button text-dark hover-grey" onClick={handleLogout}>Logout</button>
            </div>
            
          ) : (
            <Link className="no-decoration" to="/login">
              <FaUser /> Sign In
            </Link>
          )
        }
      </aside> }
    </nav>
  )
}