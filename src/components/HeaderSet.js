import React from "react";
import useAuth from "../hooks/useAuth";
import HeaderBarAdmin from "../pages/admin/HeaderBarAdmin";
import WebAppBar from "./WebAppBar";

const HeaderSet = (props) => {
  const { roles } = props;
  const { auth } = useAuth();
  return roles === "admin" ? (
    <HeaderBarAdmin />
  ) : (
    <WebAppBar logState={auth?.roles} />
  );
};

export default HeaderSet;
