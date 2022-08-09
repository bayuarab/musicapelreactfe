import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderSet from "./components/HeaderSet";
import WebAppBar from "./components/WebAppBar";
import ManageInvoices from "./routes/manageInvoices";
import ManageKategori from "./routes/manageKategori";
import ManageKelas from "./routes/manageKelas";
import PageRoutes from "./routes/PageRoutes";

function App() {
  return (
    <div className="base">
      <BrowserRouter>
        <HeaderSet roles={"user"} />
        <div className="contentWrapper">
          <PageRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
