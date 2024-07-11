import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import logo from '@src/assets/audasite.png'
import Badge from 'react-bootstrap/Badge'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { useLogoutMutation } from '@src/slices/usersApiSlice';
import { removeCredentials } from '@src/slices/authSlice';

import type { RootState } from '@src/store'

export default function Header(): JSX.Element {
  const  { cartItems }  = useSelector((state: RootState) => state.cart);
  const  { userInfo }  = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logout ] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout({}).unwrap();
      dispatch(removeCredentials());
      navigate('/login');
    } catch (err) {
      toast.error("Failed to logout." /*err?.data.message) || err?.error*/);
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} height="70vw" alt="Audasite LLC Logo"/>
              ArtMarket
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {
                    (cartItems.length > 0) && (
                      <Badge pill bg="success" style={{marginLeft: "5px"}}>
                        {cartItems?.reduce((acc: number, curr: { qty: number }) => acc + curr.qty, 0)}
                      </Badge>
                    )
                  }
                </Nav.Link>
              </LinkContainer>
              {
                userInfo && userInfo.isAdmin ? (
                  <NavDropdown title={userInfo.name} id="username" style={{marginLeft: "10px", marginRight: "55px"}}>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) :
                userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}