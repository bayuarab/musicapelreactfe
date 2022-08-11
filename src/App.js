import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import HeaderSet from "./components/HeaderSet";
import PageRoutes from "./routes/PageRoutes";

function App() {
  return (
    <div className="page-container">
      <div className="contentWrapper">
        <HeaderSet />
        <PageRoutes />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
