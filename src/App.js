import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WebAppBar from "./components/WebAppBar";
import CartPage from "./pages/cart/CartPage";
import Home from "./pages/home/Home";
import InvoiceDetails from "./pages/invoice/InvoiceDetails";
import InvoiceMaster from "./pages/invoice/InvoiceMaster";
import MyCourses from "./pages/myCourses/MyCourses";

function App() {
  const [loginState, setLoginState] = useState(false);
  return (
    <div className="base">
      <BrowserRouter>
        <WebAppBar logState={loginState} />
        <div className="contentWrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-course" element={<MyCourses />} />
            <Route path="/my-invoice" element={<InvoiceMaster />} />
            <Route path="/invoice-details" element={<InvoiceDetails />} />
            <Route path="*" element={<p>There's nothing here!</p>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );

  //origin dev-latest
  // import { AppBar, Box } from "@mui/material";
  // import React, { useState } from "react";
  // import { BrowserRouter, Route, Routes } from "react-router-dom";
  // import "./App.css";
  // import {
  //   default as ButtonAppBar,
  //   default as HeaderBar,
  // } from "./component/websiteAppBar";

  // function App() {
  //   return (
  //     <div className="base">
  //       <BrowserRouter>
  //       {/* <HeaderBar /> */}
  //       <div className="contentWrapper">
  //         <CartPage />
  //       </div>
  //     </div>
  //   );

  // origin
  // import logo from './logo.svg';
  // import './App.css';
  // import ButtonAppBar from './component/websiteAppBar';
  // import { AppBar, Box } from '@mui/material';
  // import HeaderBar from './component/websiteAppBar';

  // function App() {
  //   return (
  //     <div className="base">
  //       <Box sx={{ flexGrow: 1 }}><HeaderBar/></Box>
  //     </div>
  //   );
}

export default App;
