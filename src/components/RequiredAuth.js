import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const result = () => {
    if (!auth?.roles)
      return <Navigate to="/login" state={{ from: location }} replace />;
    if (allowedRoles?.some((roles) => roles === auth.roles)) return <Outlet />;
    if (auth?.email)
      return <Navigate to="/missing" state={{ from: location }} replace />;
  };

  return <>{result()};</>;
};

export default RequiredAuth;
