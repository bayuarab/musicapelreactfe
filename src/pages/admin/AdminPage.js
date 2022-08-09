import React from "react";
import { Outlet } from "react-router-dom";
import HeaderbarAdmin from "../../component/HeaderBarAdmin";

const AdminPage = () => {
  return (
    <div>
      {/* <HeaderbarAdmin /> */}
      {/* <h1>AdminPage</h1> */}
      <Outlet />
    </div>
  );
};

export default AdminPage;
