import Header from "./Header"; //Include Header
import Footer from "./Footer"; //Include Footer
import Home from "./Home";
import Shop from "./Shop";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Error from "./Error";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import Admin from "./admin/Admin";
import "./css/bootstrap.min.css";
import "./css/style.css";
import Dashboard from "./admin/Dashboard";
import Edit from "./admin/Edit";
import OrderDetails from "./admin/OrderDetails";
import Myorders from "./Myorders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CookiesProvider>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/single-product" element={<SingleProduct />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/myorders" element={<Myorders />} />
            <Route path="/admin/adminLogin" element={<AdminLogin />} />
            <Route path="/admin/adminSignup" element={<AdminSignup />} />
            <Route path="/admin/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/edit" element={<Edit />} />
            <Route path="/admin/order" element={<OrderDetails />} />
            <Route path="/*" element={<Error />} />
          </Routes>
          <Footer></Footer>
        </CookiesProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
