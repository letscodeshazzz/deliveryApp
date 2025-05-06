import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: "80px", minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
