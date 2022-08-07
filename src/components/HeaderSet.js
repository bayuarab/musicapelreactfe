import React, { useState } from "react";
import HeaderbarAdmin from "../component/HeaderBarAdmin";
import WebAppBar from "./WebAppBar";

const HeaderSet = (props) => {
  const [loginState, setLoginState] = useState(false);
  const { roles } = props;
  return roles === "admin" ? (
    <HeaderbarAdmin />
  ) : (
    <WebAppBar logState={loginState} />
  );
};

export default HeaderSet;
