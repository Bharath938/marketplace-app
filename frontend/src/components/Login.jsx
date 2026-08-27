import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const inputFieldData = [
    {
      id: 1,
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email Address",
    },
    {
      id: 2,
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
    },
  ];
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });

    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
  }

  function validate() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Please provide email address";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please provide valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Please Provide password";
    }

    setErrors(newErrors);

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErros = validate();

    if (Object.keys(validationErros).length > 0) return;

    try {
      setLoading(true);
      setErrors({});
      setError(null);
      const response = await API.post("/auth/login", formData);

      login(response.data.user, response.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 w-screen h-screen">
      <div className="flex flex-col bg-white w-[380px] items-center border border-gray-200 rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold mb-1">Login to your account</h1>
          <p className="text-sm text-gray-500">Welcome back</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          {inputFieldData.map((inputField) => (
            <div
              key={inputField.id}
              className="flex flex-col space-y-2 mb-4 w-full"
            >
              <label
                htmlFor={inputField.name}
                className="text-sm text-gray-600 mb-1"
              >
                {inputField.label}
              </label>
              <input
                type={inputField.type}
                name={inputField.name}
                id={inputField.name}
                value={formData[inputField.name]}
                onChange={handleChange}
                placeholder={inputField.placeholder}
                className="border border-gray-300 px-3 py-2 text-sm rounded-md w-full"
              />
              {errors[inputField.name] && (
                <p className="text-sm text-red-500 mt-1">
                  {errors[inputField.name]}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gray-900 font-medium text-white py-2 rounded-md mt-2 cursor-pointer"
          >
            {loading ? "Loging in..." : "Login"}
          </button>
          {error && (
            <p className="text-sm text-red-500 mt-1 text-center">{error}</p>
          )}
        </form>
        <p className="text-sm mt-2">
          Don't have an account?
          <Link to="/signup" className="text-blue-400 underline ml-1">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
