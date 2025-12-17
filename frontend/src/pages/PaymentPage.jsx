import { useEffect, useState } from 'react';
import CheckoutStep from '../components/CheckOutStep';
import FormContainer from '../components/FormContainer';
import { Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import { useNavigate } from 'react-router';

function PaymentPage() {
  const {paymentMethod: savedPaymentMethod, shippingAddress} = useSelector((state)=>state.cart)
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || "cod");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
   if(!shippingAddress.address){
    navigate("/shipping");
   }
  }, [shippingAddress])

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label> {/* legend = hightlighted form */}
          <Col>
            <Form.Check className="my-2"
              type="radio" label="Cash on Delivery" id="cod"
              name="paymentMethod"
              value="cod"
              checked = {paymentMethod == "cod"}
              onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
          <Col>
            <Form.Check className="my-2"
              type="radio" label="Esewa" id="esewa"
              name="paymentMethod"
              value="esewa"
              checked = {paymentMethod == "esewa"}
              onChange={e => setPaymentMethod(e.target.value)}></Form.Check> {/* name should be same kina ki hamlai duita ma euta select garnu cha*/}
          </Col>
        </Form.Group>
        <Button type= "submit" variant="dark" className='my-2'>Continue</Button>
      </Form>
    </FormContainer>

  )
}

export default PaymentPage;