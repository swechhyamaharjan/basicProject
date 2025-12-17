import { Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutStep from '../components/CheckOutStep'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router'

function PlaceOrderPage() {
  const { cartItems, shippingAddress, paymentMethod, itemPrice, shippingCharge, totalPrice} = useSelector(
    (state) => state.cart
  )

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />

      <Row>
        {/* LEFT SIDE */}
        <Col md={8}>
          <ListGroup variant="flush">
            {/* SHIPPING */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.district}, {shippingAddress.province}
              </p>
            </ListGroup.Item>

            {/* PAYMENT */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            {/* ORDER ITEMS */}
            <ListGroup.Item>
              <h2>Ordered Items</h2>

              {cartItems.length === 0 ? (
                <Message>Your cart is empty.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        
                         <Col>
                         <Link to={`/product/${item._id}`}>
                         {item.name}
                         </Link>
                         </Col>
                         <Col>
                         {item.qty} * {item.price} = ${(item.qty*item.price).toFixed(2)}
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
          <ListGroup variant='flush'>
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
                <Col>Total Price</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button className='btn-block' variant='dark'>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderPage
