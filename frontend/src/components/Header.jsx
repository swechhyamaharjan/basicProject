import { Navbar, Nav, Container, NavbarBrand } from 'react-bootstrap'
import { NavLink } from 'react-router';
import logo from "../assets/react.svg"
import {FaShoppingCart, FaUser} from "react-icons/fa"



function Header() {
  return (
    <header>
     <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
      <Navbar.Brand as={NavLink} to="/">
       <img src={logo} alt='logo'/>
       E-Commerce
       </Navbar.Brand>

       <Navbar.Toggle aria-controls='nav-bar'/>
       <Navbar.Collapse id='nav-bar'>
        <Nav className='ms-auto'>
          <Nav.Link as={NavLink} to="/cart">
         <FaShoppingCart/> Cart
          </Nav.Link>
          <Nav.Link as={NavLink} to="/signin">
         <FaUser/> Sign In
         </Nav.Link>
        </Nav>
       </Navbar.Collapse>
       </Container>
     </Navbar>
    </header>
  )
}
export default Header;