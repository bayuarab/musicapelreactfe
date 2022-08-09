import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const result = () => {
    if (auth?.roles) {
      const second = allowedRoles?.some((roles) => {
        return roles === auth.roles;
      });
      if (second) return <Outlet />;
      if (auth?.email) {
        return <Navigate to="/missing" state={{ from: location }} replace />;
      }
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  return (
    <>{result()};</>
    //   auth?.roles
    //     ? allowedRoles?.some(roles => roles === auth.roles)
    //     ? <Outlet/>
    //     : auth?.username
    //       ? <Navigate to="/missing" state={{ from: location }} replace />
    //       : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
