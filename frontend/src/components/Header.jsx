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
  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="shadow-sm py-2"
      >
        <Container>
          {/* Brand */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="d-flex align-items-center gap-2 fw-bold"
          >
            <img
              src={logo}
              alt="logo"
              width="32"
              height="32"
              className="rounded"
            />
            <span className="fs-5">Gadget E-commerce</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Nav className="ms-auto align-items-center gap-2">
              {/* Cart */}
              <Nav.Link
                as={NavLink}
                to="/cart"
                className="d-flex align-items-center gap-1"
              >
                <FaShoppingCart />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="success"
                    className="ms-1 d-flex align-items-center"
                  >
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {/* Auth */}
              {!userInfo ? (
                <Nav.Link
                  as={NavLink}
                  to="/signin"
                  className="d-flex align-items-center gap-1"
                >
                  <FaUser />
                  <span>Signin</span>
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={userInfo.fullname}
                  id="username"
                  align="end"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Admin */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin" align="end">
                  <NavDropdown.Item as={NavLink} to="/admin/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/products">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/admin/users">
                    Users
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
