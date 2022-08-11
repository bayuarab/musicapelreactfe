import React from "react";
import "./App.css";
import HeaderSet from "./components/HeaderSet";
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
