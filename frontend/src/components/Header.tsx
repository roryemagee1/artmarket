import { JSX } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaShoppingCart, FaUser} from 'react-icons/fa'
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
import { resetCart } from '@src/slices/cartSlice';

import SearchBox from '@src/components/SearchBox'

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
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} height="70vw" alt="Audasite LLC Logo"/>
            ArtMarket
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {
                  (cartItems.length > 0) && (
                    <Badge pill bg="success" style={{marginLeft: "5px"}}>
                      {cartItems?.reduce((acc: number, curr: { qty: number }) => acc + curr.qty, 0)}
                    </Badge>
                  )
                }
              </Nav.Link>
              {
                userInfo && userInfo.data.isAdmin ? (
                  <NavDropdown title={userInfo.data.name} id="username" style={{marginLeft: "10px", marginRight: "55px"}}>
                    <NavDropdown.Item as={Link} to="/admin/productlist">Products</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/userlist">Users</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/orderlist">Orders</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) :
                userInfo ? (
                  <NavDropdown title={userInfo.data.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}