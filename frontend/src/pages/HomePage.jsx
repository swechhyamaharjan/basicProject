import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productApiSlice'

const HomePage = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("/api/products")
  //     .then(res => res.json())
  //     .then((data) => {
  //       setProducts(data)
  //       setIsLoading(false)
  //     })
  //     .catch((error) => setError(error.message))
  // }, [])

   const {data: products, isLoading, error} = useGetProductsQuery()

  return (
    <Container>
      <h1>Latest Products</h1>
      {
        isLoading ? (
          <Spinner />
        ) : error ? (<Message>{error?.data?.message}</Message>
        ) : (
          <Row>
            {products.map((p) => (
              <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            ))}
          </Row>
        )
      }
    </Container>
  )
}

export default HomePage;