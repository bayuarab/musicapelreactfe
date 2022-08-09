import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "../component/hero";
import CartPage from "../pages/cart/CartPage";
import Home from "../pages/home/Home";
import InvoiceDetails from "../pages/invoice/InvoiceDetails";
import InvoiceMaster from "../pages/invoice/InvoiceMaster";
import MyCourses from "../pages/myCourses/MyCourses";
import CategoryCourse from "./categoryCourse";
import DetailCourse from "./detailCourse";
import LandingPage from "./landingPage";
import Loginn from "../pages/Login";
import Registerr from "../pages/Register";
import ManageInvoices from "./manageInvoices";
import ManageKategori from "./manageKategori";
import ManageKelas from "./manageKelas";
import Base64Image from "./base64";

const PageRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cart" element={<CartPage />} />
			<Route path="/my-course" element={<MyCourses />} />
			<Route path="/Login" element={<Loginn />} />
			<Route path="/registrasi" element={<Registerr />} />
			<Route path="Hero" element={<Hero />} />
			<Route path="detail" element={<DetailCourse />} />
			<Route path="category" element={<CategoryCourse />} />
			<Route path=":productId" element={<DetailCourse />} />
			{/* </Route> */}
			<Route path="land" element={<LandingPage />} />

			<Route path="/my-invoice">
				<Route index element={<InvoiceMaster />} />
				<Route path=":invoiceID" element={<InvoiceDetails />} />
			</Route>

			<Route path="admin">
				<Route path="kelas" element={<ManageKelas />} />
				<Route path="category" element={<ManageKategori />} />
				<Route path="invoices" element={<ManageInvoices />} />
			</Route>
			<Route path="/base64" element={<Base64Image/>}/>
			<Route path="*" element={<p>There's nothing here!</p>} />
		</Routes>
	);
};

export default PageRoutes;
