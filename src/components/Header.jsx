// src/components/Header.jsx
import React from "react";

const Header = ({ title, subtitle, icon }) => {
  return (
    <header className="w-full text-center py-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md rounded-b-2xl">
      <div className="flex flex-col items-center justify-center">
        {/* Optional Icon */}
        {icon && <div className="text-4xl mb-2">{icon}</div>}

        {/* Title */}
        <h1 className="text-3xl font-bold">{title}</h1>

        {/* Subtitle (optional) */}
        {subtitle && (
          <p className="mt-1 text-sm text-blue-100 max-w-lg">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
