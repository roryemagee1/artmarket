import { JSX, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { FiMenu } from "react-icons/fi";
import './Drawer.css'

import SearchBox from '@src/components/SearchBox/SearchBox'

import { handleResetWindow } from '@src/utils/miscUtils'

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
    <div className="header-nav">

      {/* This class appears at widths greater than 768px: */}
      <nav className="header-nav-wide">
        <SearchBox />
        <Link className="no-decoration cart-icon-container text-light" to="/cart" onClick={() => handleResetWindow()}>
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
        { !userInfo ? (
          <div className="login-text">
            <Link className="no-decoration text-light" to="/login">
              <FaUser /> Sign In
            </Link>
          </div>
        ) : (
          <>
          <button className="text-button" onClick={() => setIsMenuOpen((prevState) => !prevState)}>
            {userInfo.data.name}
            { 
              isMenuOpen ? 
              <GoTriangleUp /> :
              <GoTriangleDown />
            }
          </button>
            {
              isMenuOpen && <aside className="aside-menu">
                {
                  userInfo && userInfo.data.isAdmin ? (
                    <div onClick={() => setIsMenuOpen((prevState) => !prevState)}>
                      <Link 
                        className="no-decoration text-dark hover-gainsboro anchor-margin" 
                        to="/admin/productlist" 
                        onClick={() => handleResetWindow()}
                      >Products
                      </Link>
                      <Link 
                        className="no-decoration text-dark hover-gainsboro anchor-margin" 
                        to="/admin/userlist" 
                        onClick={() => handleResetWindow()}
                      >Users
                      </Link>
                      <Link 
                        className="no-decoration text-dark hover-gainsboro anchor-margin" 
                        to="/admin/orderlist" 
                        onClick={() => handleResetWindow()}
                      >Orders
                      </Link>
                      <Link 
                        className="no-decoration text-dark hover-gainsboro anchor-margin" 
                        to="/profile" 
                        onClick={() => handleResetWindow()}
                      >Profile
                      </Link>
                      <button 
                        className="text-button text-dark hover-gainsboro" 
                        onClick={handleLogout}
                      >Logout
                      </button>
                    </div>
                  ) :
                  userInfo && (
                    <div onClick={() => setIsMenuOpen((prevState) => !prevState)}>
                      <Link 
                        className="no-decoration text-dark hover-gainsboro anchor-margin" 
                        to="/profile" 
                        onClick={() => handleResetWindow()}
                      >Profile
                      </Link>
                      <button 
                        className="text-button text-dark hover-gainsboro" 
                        onClick={handleLogout}
                      >Logout
                      </button>
                    </div>
                    
                  )
                }
              </aside>
            }
          </>
        )}
      </nav>
      
      {/* This class appears at widths less than 768px: */}
      <nav className="header-nav-narrow">
        <div>
        </div>
        <button 
          className="text-button" 
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
        >
        <FiMenu className="menu-button" />
        </button>
      </nav>
      
      {
        isMenuOpen && (
          <>
            <aside className="drawer-menu">
              <SearchBox />
              <div onClick={() => setIsMenuOpen((prevState) => !prevState)}>
              <Link 
                className="no-decoration hover-grey cart-icon-container" 
                to="/cart" 
                onClick={() => handleResetWindow()}
              ><FaShoppingCart className="cart-icon" /> Cart
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
              {
                userInfo && userInfo.data.isAdmin ? (
                  <>
                    <Link 
                      className="no-decoration text-light hover-grey anchor-margin" 
                      to="/admin/productlist" 
                      onClick={() => handleResetWindow()}
                    >Products
                    </Link>
                    <Link 
                      className="no-decoration text-light hover-grey anchor-margin" 
                      to="/admin/userlist" 
                      onClick={() => handleResetWindow()}
                    >Users
                    </Link>
                    <Link 
                      className="no-decoration text-light hover-grey anchor-margin" 
                      to="/admin/orderlist" 
                      onClick={() => handleResetWindow()}
                    >Orders
                    </Link>
                    <Link 
                      className="no-decoration text-light hover-grey anchor-margin" 
                      to="/profile" 
                      onClick={() => handleResetWindow()}
                    >Profile
                    </Link>
                    <button 
                      className="text-button text-light hover-grey" 
                      onClick={handleLogout}
                    >Logout
                    </button>
                  </>
                ) :
                userInfo && (
                  <>
                    <Link 
                      className="no-decoration text-light hover-grey anchor-margin" 
                      to="/profile" 
                      onClick={() => handleResetWindow()}
                    >Profile
                    </Link>
                    <button 
                      className="text-button text-light hover-grey" 
                      onClick={handleLogout}
                    >Logout
                    </button>
                  </>
                )
              }
              </div>
            </aside> 
          </>
        )
      }   
    </div>
  )
}