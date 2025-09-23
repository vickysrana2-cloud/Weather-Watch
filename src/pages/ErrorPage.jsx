
import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route Error:", error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-300 to-orange-200 text-center p-6">
      <div className="max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 border border-white/50">
        <h1 className="text-4xl font-bold text-red-700 mb-2">Oops!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Sorry, an unexpected error has occurred.
        </p>

        {/* ------------------------ Display error details if available */}
        {error && (
          <p className="italic text-sm text-gray-600 mb-6">
            {error.statusText || error.message || "Something went wrong"}
          </p>
        )}

        {/* ----------------------- Back to Home button */}
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-all"
        >
          {"<= "} Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
