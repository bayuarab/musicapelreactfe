import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderSet from "./components/HeaderSet";
import WebAppBar from "./components/WebAppBar";
import useAuth from "./hooks/useAuth";
// import ManageInvoices from "./routes/manageInvoices";
// import ManageKategori from "./routes/manageKategori";
// import ManageKelas from "./routes/manageKelas";
import PageRoutes from "./routes/PageRoutes";

function App() {
  return (
    <div className="base">
      <HeaderSet />
      <div className="contentWrapper">
        <PageRoutes />
      </div>
    </div>
  );
}

export default App;
