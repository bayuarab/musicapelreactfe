import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Cart from "./routes/cart";
import App from "./App";
import Login from "./routes/login";
import LandingPage from "./routes/landingPage";
import Hero from "./component/hero";
import DetailCourse from "./routes/detailCourse";
import CategoryCourse from "./routes/categoryCourse";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<App/>}>
  <Route path="cart" element={<Cart />} />
  <Route path="*" element={ <main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main>}/>
  </Route>
  <Route path="Login" element={<Login />} />
  <Route path="Hero" element={<Hero />} />
  <Route path="detail" element={<DetailCourse />}/>
  <Route path="category" element={<CategoryCourse />}/>
    {/* <Route path=":productId" element={<DetailCourse />} /> */}
    {/* </Route> */}
  <Route path="land" element={<LandingPage />} />
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
