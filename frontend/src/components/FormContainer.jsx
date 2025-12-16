import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
  return (
    <Container>
      <Row className='justify-content-md-center'> {/* md and above ma center */}
        <Col md={6} xs={12}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
export default FormContainer;