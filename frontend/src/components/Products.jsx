import React from "react";
import { useAuth } from "../context/AuthContext";

function Products() {
  const { user } = useAuth();
  return <div>Hi {user.name}</div>;
}

export default Products;
