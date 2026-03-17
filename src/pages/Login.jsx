import React, { useState } from "react";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      const res = await api.post("/auth/login", form);

      const user = res.data.user;

      // Save user data in localStorage
      localStorage.setItem("userId", user._id);
      localStorage.setItem("activeMode", user.activeMode);
      localStorage.setItem("userName", user.fullName);

      toast.success("Login successful 🚀");

      navigate("/");

    } catch (err) {

      toast.error(err.response?.data?.message || "Login failed");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-500 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;