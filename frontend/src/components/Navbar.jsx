import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-8 py-2">
      <Link to="/">
        <strong className="text-2xl">MarketPlace</strong>
      </Link>
      <ul className="flex space-x-8 items-center text-gray-700">
        <li className="curosr-pointer hover:text-blue-500">
          <Link to="/">Products</Link>
        </li>
        <li className="curosr-pointer hover:text-blue-500 cursor-pointer">
          {user ? (
            <Link to="/cart">
              <span className="flex space-x-1 items-center">
                <BsCart2 />
                <span>Cart</span>
              </span>
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li className="cursor-pointer ">
          {user ? (
            <span
              onClick={() => {
                (logout(), (<Navigate to="/login" replace />));
              }}
              className="hover:text-blue-400"
            >
              Logout
            </span>
          ) : (
            <span className="text-white bg-gray-900 px-3 py-1 rounded-md">
              <Link to="/signup">Signup</Link>
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
