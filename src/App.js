import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import WebAppBar from "./components/WebAppBar";
import PageRoutes from "./routes/PageRoutes";

function App() {
  const [loginState, setLoginState] = useState(false);
  return (
    <div className="base">
      <BrowserRouter>
        <WebAppBar logState={loginState} />
        <div className="contentWrapper">
          <PageRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
