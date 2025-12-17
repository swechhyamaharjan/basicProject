import { useState } from 'react';
import FormContainer from '../components/FormContainer'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutStep from '../components/CheckOutStep';
import { useNavigate } from 'react-router';

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state)=>state.cart)
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [district, setDistrict] = useState(shippingAddress?.district || "");
  const [province, setProvince] = useState(shippingAddress?.province || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const submithandler = (e)=>{
   e.preventDefault();
   dispatch(saveShippingAddress({address, city, district, province}))
   navigate("/payment");
  }
  return (
    <>
    <FormContainer>
      <CheckoutStep step1 step2/>

      <h2>Shipping Address</h2>
      <Form onSubmit={submithandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter address' value={address}
          onChange={e=>setAddress(e.target.value)}/>
        </Form.Group>
        <Form.Group className='my-2' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter city' value={city}
          onChange={e=>setCity(e.target.value)} />
        </Form.Group>
        <Form.Group className='my-2' controlId='district'>
          <Form.Label>District</Form.Label>
          <Form.Control type='text' placeholder='Enter district' value={district}
          onChange={e=>setDistrict(e.target.value)} />
        </Form.Group>
        <Form.Group className='my-2' controlId='province'>
          <Form.Label>Province</Form.Label>
          <Form.Control type='text' placeholder='Enter province' value={province}
          onChange={e=>setProvince(e.target.value)} />
        </Form.Group>
        <Button type='submit' variant='dark' className='my-2'>Continue</Button>
      </Form>
    </FormContainer>
    </>
  )
}

export default ShippingPage