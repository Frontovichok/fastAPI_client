import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/AuthSlice";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let [user] = useSelector(selectCurrentUser);

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
