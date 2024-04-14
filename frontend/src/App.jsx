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

function App() {
  return (
    <Router>
      <Navbar />
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
    </Router>
  );
}

export default App;
