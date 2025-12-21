import { useState, useEffect } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateProfileMutation } from '../slices/userApiSlice'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'
import { setCredentials } from '../slices/authSlice'
import {Link} from 'react-router'

import { toast } from 'react-toastify'

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const [edit, setEdit] = useState(false);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const dispatch = useDispatch();
  const [updateProfile, { isLoading: profileLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setFullname(userInfo.fullname);
    setEmail(userInfo.email);
  }, [userInfo.fullname, userInfo.email]) //yo change huda tyo re render 

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        toast.error("Password not matched!!")
        return;
      }
      let res = await updateProfile({
        fullname,
        email,
        password,
      }).unwrap();
      toast.success(res.message);
      dispatch(setCredentials({ ...userInfo, ...res.user })) //naya aako lai overwrite


    } catch (error) {
      toast.error(error?.data?.error);
    }
  }

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>Profile</h2>
          <Form onSubmit={updateProfileHandler}>
            <Form.Group controlId='fullname'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={!edit} />
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!edit} />
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password'
                onChange={(e) => setPassword(e.target.value)}
                disabled={!edit} />
            </Form.Group>

            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password'
                onChange={(e) => setConfirmpassword(e.target.value)}
                disabled={!edit} />
            </Form.Group>

            <Button type='button' className='mx-3' variant='dark'
              onClick={() => setEdit(true)}
            ><FaEdit /></Button>

            <Button type='submit' variant='dark'
              disabled={!edit || profileLoading}>{profileLoading ? 'Updating...' : 'Update'}</Button>
          </Form>
        </Col>

        {/* FOR MY ORDERS */}
       <Col md={9}>
          <h2>Orders</h2>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>CREATED AT</th>
                <th>PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link
                      className="btn btn-dark btn-sm"
                      to={`/order/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default ProfilePage