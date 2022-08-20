import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (!localAuth) return;
    setAuth({ ...localAuth });
    if (localAuth?.roles === "admin") navigate("/admin", { replace: true });
    if (localAuth?.roles === "student") navigate("/", { replace: true });
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
