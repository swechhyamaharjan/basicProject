import { useState, useEffect } from 'react'
import { Form, Table, Button } from 'react-bootstrap'
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from 'react-router';
import { useGetUserByIdQuery, useUpdateUserMutation} from '../../slices/userApiSlice';

const UserEditPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);
  const [updateUser, {}] = useUpdateUserMutation();

  const updateUserHandler = async(e)=>{
      e.preventDefault();
      try {
        const res = await updateUser({
         id: id,
         fullname: name,
         email
        }).unwrap();
        toast.success(res.message);
        navigate("/admin/users")
      } catch (error) {
        toast.error(error?.data?.error || error?.error)
      }
  }

   useEffect(()=>{
   if(user){
    setName(user.fullname);
    setEmail(user.email);
   }
  }, [user])
  return (
    <>
      <Link className="btn btn-light" to="/admin/users">
        Go Back
      </Link>
      <FormContainer>
         <Form onSubmit={updateUserHandler}>
          <Form.Group className='my-2'>
            <Form.Label>UserName</Form.Label>
            <Form.Control
             type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark">
            Update
          </Button>
         </Form>
      </FormContainer>
    </>
  )
}

export default UserEditPage