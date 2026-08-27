import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
