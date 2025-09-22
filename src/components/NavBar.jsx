
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `block py-2 px-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-5 z-50
                    bg-white/10 backdrop-blur-3xl shadow-lg relative
                    border border-white/20 rounded-b-2xl">
      {/* Brand / Logo */}
      <div className="text-xl font-bold text-blue-700">WeatherWatch</div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Links */}
      <ul
        className={`${
          open ? "block" : "hidden"
        } absolute right-6 top-16 bg-white backdrop-blur-md shadow-lg rounded-2xl border border-white/20 z-50
        px-6 py-4 md:static md:flex md:items-center md:gap-6 md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-none md:rounded-none md:p-0`}
      >
        <li>
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/hourly" className={linkClasses}>
            Hourly Forcast
          </NavLink>
        </li>
        <li>
          <NavLink to="/daily" className={linkClasses}>
            Daily Forcast
          </NavLink>
        </li>
        <li>
          <NavLink to="/liveReport" className={linkClasses}>
            Live Report
          </NavLink>
        </li>
        <li>
          <NavLink to="/emergencysup" className={linkClasses}>
            Support
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
