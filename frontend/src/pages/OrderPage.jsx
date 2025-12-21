import { useParams } from "react-router";
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Card, Col, Image, ListGroup, Row, Button } from "react-bootstrap";
import { Link } from "react-router";
import { useGetEsewaQuery } from "../slices/orderApiSlice";

function OrderPage() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const { data: esewaFormData} = useGetEsewaQuery(orderId);

  const handleEsewaPayment = () => {
    const form = document.createElement("form"); //To make a form 
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form" //Esewa ko api
    form.setAttribute("action", path);
    form.setAttribute("method", "POST");
    for (let key in esewaFormData){
      const input = document.createElement("input"); //harek key ko lai input banaidincha
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("id", key);
      input.setAttribute("value", esewaFormData[key]); //particular obj bhitra ko key ko value
      form.appendChild(input); //input is the child of form. Form le wrap gareko input lai 
    }
    document.body.appendChild(form); //body ma rakheko
    console.log(form);
    form.submit();
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message>{error?.data?.error}</Message>
  ) : (
    <>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.fullname}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.district},{" "}
                {order.shippingAddress.province}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </Col>
                      {item.qty} X ${item.price} = ${item.qty * item.price}
                      <Col md={4}></Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
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
                  <Col>${order.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {!order.isPaid && order.paymentMethod == "esewa" && (
                  <Button variant="dark" className="btn-block" onClick={handleEsewaPayment}>
                    Pay via Esewa
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
