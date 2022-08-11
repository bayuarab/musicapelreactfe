import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ComponentStateProvider } from "./context/ComponentStateProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import CategoryCourse from "./routes/categoryCourse";
// import DetailCourse from "./routes/detailCourse";
// // import LandingPage from "./routes/landingPage";
// // import Login from "./routes/login";
// import ManageInvoices from "./routes/manageInvoices";
// import ManageKategori from "./routes/manageKategori";
// import ManageKelas from "./routes/manageKelas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ComponentStateProvider>
          <App />
        </ComponentStateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  // <BrowserRouter>
  // <Routes>
  // <Route path="/" element={<App/>}>
  // <Route path="cart" element={<Cart />} />
  // <Route path="*" element={ <main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>}/>
  // </Route>

  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
