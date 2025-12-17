import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import logo from "../assets/react.svg";
import { NavLink } from "react-router";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { removeCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate("/")
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="logo" />
            Broadway
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {!userInfo ? (
                <Nav.Link as={NavLink} to="/signin">
                  <FaUser /> Signin
                </Nav.Link>
              ) : (
                <NavDropdown title={userInfo.fullname} id="username">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;