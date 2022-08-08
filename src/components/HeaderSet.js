import React from "react";
import useAuth from "../hooks/useAuth";
import WebAppBar from "./WebAppBar";

const HeaderSet = () => {
  const { auth } = useAuth();
  return auth?.roles === "admin" ? <></> : <WebAppBar logState={auth?.roles} />;
};

export default HeaderSet;
