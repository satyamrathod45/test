import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bell, User, LogOut, Menu, X } from "lucide-react";

const Navbar = ({ handleLogout }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const userName = localStorage.getItem("userName");

  return (
    <nav className="w-full bg-white shadow-sm px-10 py-3 flex items-center justify-between">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Heart className="text-red-500 fill-red-500" size={24} />
        <span>
          Life<span className="text-red-500">Line</span>
        </span>
      </div>

      {/* CENTER NAV LINKS */}
      <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

        <Link to="/" className="hover:text-red-500 transition">
          Home
        </Link>

        <Link to="/dashboard" className="hover:text-red-500 transition">
          Dashboard
        </Link>

        <Link to="/find-donors" className="hover:text-red-500 transition">
          Find Donors
        </Link>

        <Link to="/request" className="hover:text-red-500 transition">
          Request
        </Link>

        <Link to="/create-request" className="hover:text-red-500 transition">
          Create Request
        </Link>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        {userName && (
          <Bell className="cursor-pointer text-gray-600 hover:text-red-500" />
        )}

        {/* USER NOT LOGGED IN */}
        {!userName && (
          <div className="flex gap-3">

            <Link
              to="/login"
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Register
            </Link>

          </div>
        )}

        {/* USER LOGGED IN */}
        {userName && (
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">

            <User size={18} />

            <span className="text-sm font-medium">
              {userName}
            </span>

            <button onClick={handleLogout}>
              <LogOut
                size={18}
                className="cursor-pointer hover:text-red-500"
              />
            </button>

          </div>
        )}

        {/* MOBILE MENU */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;