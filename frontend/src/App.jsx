import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { Navbar } from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { JewelryPage } from "./pages/JewelryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { WearsPage } from "./pages/WearsPage";
import { Drawer } from "./components/Drawer";
import { useState } from "react";
import { CartItem } from "./components/CartItem";
import { useSelector } from "react-redux";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Router>
      <Navbar setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/taki" element={<JewelryPage />} />
        <Route path="/giyim" element={<WearsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} length={cartItems.length}>
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </Drawer>
    </Router>
  );
}

export default App;
