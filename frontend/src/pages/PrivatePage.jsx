import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

function PrivatePage(){
  const { userInfo } = useSelector((state)=>state.auth); //store bata

  return (
    userInfo
    ? <Outlet /> 
    : <Navigate to="/signin" />
  )
}
export default PrivatePage;