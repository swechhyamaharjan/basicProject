import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { Row, Col, Container, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductsByIdQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader"
import Message from "../components/Message";

function ProductPage() {
  const [qty, setQty] = useState(1);
  // const [product, setProduct] = useState({});
  // const { id } = useParams()

  // useEffect(() => {
  //   fetch('/api/products/' + id)
  //     .then(res => res.json())
  //     .then((data) => setProduct(data))
  //     .catch((error) => console.log(error.message))
  // }, [])

  const { id } = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductsByIdQuery(id);

  const addToCartHandler = ()=>{
    dispatch(addToCart({...product, qty }))
    navigate("/cart")
  }

  return (
    <Container>
      {isLoading ? <Loader /> : error ? <Message>{error?.data?.message}</Message> : (
        <>
          <Link to="/" className="btn btn-dark my-3">
            <FaAngleLeft /> Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>{product.name}</h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>

                <ListGroup.Item>
                  <strong>${product.price}</strong>
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className="badge rounded-pill text-bg-danger">Brand: {product.brand}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <strong>{product.countInStock == 0 ? "Out of Stock" : "In Stock"}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {
                      product.countInStock > 0 && // && ==> if it is only true
                      (
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Control as="select" value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {
                                [...Array(product.countInStock).keys().map((x) => (
                                  <option key={x} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))]
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      )
                    }
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button variant="dark" disabled={product.countInStock == 0}
                      onClick={addToCartHandler}>Add to Cart</Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}
export default ProductPage;