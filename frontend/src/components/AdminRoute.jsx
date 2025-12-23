import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/signin'></Navigate>
}

export default AdminRoute;