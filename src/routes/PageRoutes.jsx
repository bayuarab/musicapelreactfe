import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import RequiredAuth from "../components/RequiredAuth";
import MyAccount from "../pages/account/MyAccount";
// import ManageInvoices from "../pages/admin/manageInvoices";
import ManageKategori from "../pages/admin/manageKategori";
import ManageKelas from "../pages/admin/manageKelas";
import ManagePaymentMethod from "../pages/admin/ManagePaymentMethod";
import ManageSchedule from "../pages/admin/ManageSchedule";
import ManageUser from "../pages/admin/ManageUsers";
import UserInvoices from "../pages/admin/UserInvoices";
import CartPage from "../pages/cart/CartPage";
import Home from "../pages/home/Home";
import InvoiceDetails from "../pages/invoice/InvoiceDetails";
import InvoiceMaster from "../pages/invoice/InvoiceMaster";
import SuccessPayment from "../pages/invoice/SuccessPayment";
import Forget from "../pages/logs/Forget";
import Login from "../pages/logs/Login";
import Register from "../pages/logs/Register";
import Missing from "../pages/missing/Missing";
import NotFound from "../pages/missing/NotFound";
import MyCourses from "../pages/myCourses/MyCourses";
import CategoryCourse from "../pages/product/categoryCourse";
import DetailCourse from "../pages/product/detailCourse";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/category/:categoryid" element={<DetailCourse />} />
        <Route path="/course">
          <Route path=":courseid" element={<CategoryCourse />} />
        </Route>
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/test-payment" element={<ManagePaymentMethod />} />

        {/* User and admin route */}
        <Route element={<RequiredAuth allowedRoles={["student"]} />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-course" element={<MyCourses />} />
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
            <Route path="/admin/invoices" element={<UserInvoices />} />
            <Route path="/admin/users" element={<ManageUser />} />
            <Route path="/admin/schedule" element={<ManageSchedule />} />
            <Route path="/admin/payment" element={<ManagePaymentMethod />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );

  /* Admin route */
  //         <Route element={<RequiredAuth allowedRoles={["admin"]} />}>
  //           <Route path="/admin">
  //             <Route index element={<ManageKelas />} />
  //             <Route path="/admin/kelas" element={<ManageKelas />} />
  //             <Route path="/admin/category" element={<ManageKategori />} />
  //             <Route path="/admin/invoices" element={<UserInvoices />} />
  //             <Route path="/admin/users" element={<ManageUser />} />
  //           </Route>
  //         </Route>
  //       </Route>
  //     </Routes>
  //   );
};

export default PageRoutes;
