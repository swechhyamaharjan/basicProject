import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutStep from "../components/CheckOutStep";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router";
import { usePlaceOrderMutation } from "../slices/orderApiSlice";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';
import { clearCart } from "../slices/cartSlice";

function PlaceOrderPage() {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    shippingCharge,
    totalPrice,
  } = useSelector((state) => state.cart);

   const navigate = useNavigate();
  const dispatch = useDispatch();

  const [placeOrder, {isLoading}] = usePlaceOrderMutation();

  const addOrderHandler = async () => {
  try{
    const res = await placeOrder({
      orderItems: cartItems,
      shippingAddress,
      shippingCharge,
      paymentMethod
    }).unwrap()
    toast.success(res.message)
    dispatch(clearCart())
    navigate("/order/"+res.orderId)

  }
  catch(err){
    toast.error(err?.data?.error)
  }
}
  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.district}, {shippingAddress.province}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong> {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col>
                          {item.qty} X {item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" variant="dark" onClick={addOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
