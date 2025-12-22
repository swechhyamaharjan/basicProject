import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link, useNavigate, useLocation } from "react-router"
import { setCredentials } from "../slices/authSlice"
import { useRegisterMutation } from "../slices/userApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import Loader from "../components/Loader"

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth)

  const [register, { isLoading }] = useRegisterMutation();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password doesn't match!!");
      return;
    }

    try {
      await register({
        fullname: name,
        email,
        password,
      }).unwrap();

      toast.success("Registration successful! Please login.");

      navigate('/signin');
    } catch (error) {
      toast.error(error?.data?.error || "Registration Failed!!");
    }
  };

  return (
    <FormContainer>
      <h2>Register Your Account</h2>
      <Form onSubmit={registerHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter password"
            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isLoading}>
          Register</Button>
        {isLoading && <Loader />}
      </Form>

      <div className="my-3">
        <Link to='/signin'>Already have an account? SIGN IN</Link>
      </div>
    </FormContainer>
  )
}

export default RegisterPage