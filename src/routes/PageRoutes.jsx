import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import RequiredAuth from "../components/RequiredAuth";
import ManageInvoices from "../pages/admin/manageInvoices";
import ManageKategori from "../pages/admin/manageKategori";
import ManageKelas from "../pages/admin/manageKelas";
import CartPage from "../pages/cart/CartPage";
import Home from "../pages/home/Home";
import InvoiceDetails from "../pages/invoice/InvoiceDetails";
import InvoiceMaster from "../pages/invoice/InvoiceMaster";
import SuccessPayment from "../pages/invoice/SuccessPayment";
import Loginn from "../pages/logs/Login";
import Registerr from "../pages/logs/Register";
import Missing from "../pages/missing/Missing";
import NotFound from "../pages/missing/NotFound";
import MyCourses from "../pages/myCourses/MyCourses";
import CategoryCourse from "./categoryCourse";
import DetailCourse from "./detailCourse";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginn />} />
        <Route path="/registration" element={<Registerr />} />
        <Route path="/missing" element={<Missing />} />
        {/* <Route path="/payment-status" element={<SuccessPayment />} /> */}

        <Route path="*" element={<NotFound />} />
        {/* <Route path="/payment-status" element={<SuccessPayment />} /> */}

        <Route path="category/:categoryid" element={<DetailCourse />} />
        <Route path="course">
          <Route path=":courseid" element={<CategoryCourse />} />
        </Route>
        {/* <Route path="Hero" element={<Hero />} /> */}

        {/* User and admin route */}
        <Route element={<RequiredAuth allowedRoles={["student"]} />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-course" element={<MyCourses />} />
          {/* <Route path="detail" element={<DetailCourse />} />
          <Route path="category" element={<CategoryCourse />} />
          <Route path=":productId" element={<DetailCourse />} /> */}
          <Route path="/my-invoice">
            <Route index element={<InvoiceMaster />} />
            <Route path=":invoiceID" element={<InvoiceDetails />} />
          </Route>
          <Route path="/payment-status" element={<SuccessPayment />} />
          <Route path="*" element={<Route path="*" element={<NotFound />} />} />
          <Route path="/missing" element={<Missing />} />
        </Route>

        {/* Admin route */}
        <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/admin">
            <Route index element={<ManageKelas />} />
            <Route path="/admin/kelas" element={<ManageKelas />} />
            <Route path="/admin/category" element={<ManageKategori />} />
            <Route path="/admin/invoices" element={<ManageInvoices />} />
          </Route>
        </Route>
        {/* <Route path="admin">
          <Route path="kelas" element={<ManageKelas />} />
          <Route path="category" element={<ManageKategori />} />
          <Route path="invoices" element={<ManageInvoices />} />
        </Route> */}
      </Route>
    </Routes>
  );
};

export default PageRoutes;
