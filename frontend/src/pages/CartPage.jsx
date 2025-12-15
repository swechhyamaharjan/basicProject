import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Card, ListGroup, Button, Image, Form } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router";
import { FaTrash } from "react-icons/fa";
import { addToCart, clearCart, removeFromCart } from "../slices/cartSlice";

const CartPage = () => {
  const { cartItems, itemPrice } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({...item, qty })) //item with updated quantity
  }

  return (
    <>
      <h1 className="my-3">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {
            cartItems.length == 0
              ? <Message>Your cart is empty</Message>
              : (
                <ListGroup variant="flush">
                  {
                    cartItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={2}> ${item.price}</Col>
                          <Col md={2}>
                            <Form.Control as="select" value={item.qty}
                              onChange={(e) => {addToCartHandler(item, Number(e.target.value))}}>
                              {
                                [...Array(item.countInStock).keys().map((x) => (
                                  <option key={x} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))]
                              }
                            </Form.Control>
                          </Col>
                          <Col md={2}>
                            <Button variant="light" onClick={()=>dispatch(removeFromCart(item._id))}>
                              <FaTrash />
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))
                  }
                  <ListGroup.Item>
                    <Button variant="danger" onClick={()=>dispatch(clearCart())}>Clear Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              )
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h4>
                <strong>${itemPrice}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="dark" disabled={cartItems.length === 0}>Proceed to checkout</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartPage