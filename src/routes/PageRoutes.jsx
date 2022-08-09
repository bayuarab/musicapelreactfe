import { Box, Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../component/hero";
import Layout from "../components/Layout";
import RequiredAuth from "../components/RequiredAuth";
import AdminPage from "../pages/admin/AdminPage";
import CartPage from "../pages/cart/CartPage";
import Home from "../pages/home/Home";
import InvoiceDetails from "../pages/invoice/InvoiceDetails";
import InvoiceMaster from "../pages/invoice/InvoiceMaster";
import Loginn from "../pages/Login";
import Missing from "../pages/missing/Missing";
import MyCourses from "../pages/myCourses/MyCourses";
import Registerr from "../pages/Register";
import SuccessPayment from "../pages/SuccessPayment";
import CategoryCourse from "./categoryCourse";
import DetailCourse from "./detailCourse";
import ManageInvoices from "./manageInvoices";
import ManageKategori from "./manageKategori";
import ManageKelas from "./manageKelas";
import Base64Image from "./base64";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginn />} />
        <Route path="/registration" element={<Registerr />} />
        <Route path="*" element={<p>There's nothing here!</p>} />
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
          <Route
            path="*"
            element={
              <Box sx={{ marginTop: "45px" }}>
                <Typography
                  variant="h2"
                  sx={{ textAlign: "center", color: "#5D5FEF" }}
                >
                  Mo kemana nich??
                </Typography>
              </Box>
            }
          />
          <Route path="/missing" element={<Missing />} />
        </Route>

        {/* Admin route */}
        {/* <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
          <Route path="/admin">
            <Route index element={<AdminPage />} />
            <Route path=":kelas" element={<ManageKelas />} />
            <Route path=":category" element={<ManageKategori />} />
            <Route path=":invoices" element={<ManageInvoices />} />
          </Route>
          <Route path="*" element={<p>There's nothing here!</p>} />
          <Route path="/missing" element={<Missing />}></Route>
        </Route> */}
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
