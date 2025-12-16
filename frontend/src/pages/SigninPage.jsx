import React from 'react'
import { useState, useEffect } from "react"
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router'
import { useLoginMutation } from '../slices/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import Loader from '../components/Loader'

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation(); //mutation = array {isloading haru}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  // console.log(sp.get("redirect"))
  const redirect = sp.get("redirect") || "/"; //sp.get ma null ayo bhani home

useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }
    }, [userInfo, redirect]
)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials(res.user))
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }

  return (
    <FormContainer>
      <h2>Sign In</h2> {/* children */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' disabled={isLoading}>Sign In</Button>
        {isLoading && <Loader /> }
      </Form>

      <div className='my-3'>
        <Link >New Customer? Register Here</Link>
      </div>
    </FormContainer>
  )
}

export default SigninPage