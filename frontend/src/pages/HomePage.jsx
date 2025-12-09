import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import products from '../products.js'
import Rating from '../components/Rating.jsx'

const HomePage = () => {
  return (
    <Container>
      <h1>Latest Products</h1>
     <Row>
       {products.map((p)=>(
        <Col sm={12} md={6} lg={4} xl={3}>
        <Product product={p}/>
        </Col>
      ))}
     </Row>
    </Container>
  )
}

export default HomePage