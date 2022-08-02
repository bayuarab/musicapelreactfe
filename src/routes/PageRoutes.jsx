import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "../pages/cart/CartPage";
import Home from "../pages/home/Home";
import InvoiceDetails from "../pages/invoice/InvoiceDetails";
import InvoiceMaster from "../pages/invoice/InvoiceMaster";
import MyCourses from "../pages/myCourses/MyCourses";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/my-course" element={<MyCourses />} />
      <Route path="/my-invoice" element={<InvoiceMaster />} />
      <Route path="/invoice-details" element={<InvoiceDetails />} />
      <Route path="*" element={<p>There's nothing here!</p>} />
    </Routes>
  );
};

export default PageRoutes;
