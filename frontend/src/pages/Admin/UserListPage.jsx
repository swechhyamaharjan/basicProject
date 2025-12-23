import { Table, Row, Col, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useGetUsersQuery } from "../../slices/userApiSlice"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useDeleteUserMutation } from "../../slices/userApiSlice"
import { toast } from "react-toastify"

const UserListPage = () => {
  const {data: users, isLoading, error} = useGetUsersQuery();
  const [deleteUser, {}] = useDeleteUserMutation();
 
  const deleteUserHandler = async(id)=>{
   if(window.confirm("Are you sure you want to delete this user?")){
     try {
      const res = await deleteUser(id).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.error || error?.error)
    }
   }
  }

  return (
    <>
    <h2>Users</h2>
    {
      isLoading ? <Loader /> : error ? <Message>{error?.data?.error}</Message> : (
        <Table striped hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>USER'S NAME</th>
          <th>EMAIL</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="light" size="sm"><FaEdit /></Button>
                <Button variant="light" size="sm" className="ms-2"
                onClick={()=>{deleteUserHandler(user._id)}}><FaTrash style={{color: "red"}}/></Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
      )
    }
    </>
  )
}

export default UserListPage