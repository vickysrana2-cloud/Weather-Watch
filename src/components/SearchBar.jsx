// src/components/SearchBar.jsx
import React, { useState } from "react";
import axios from "axios";

const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // 🔑 Replace with your OpenWeather API key

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setError("");
      setWeather(null);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      if (onSearch) onSearch(query); // optional callback to parent
    } catch (err) {
      setError("City not found. Try again!");
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white/10 backdrop-blur-xl border border-white/50 rounded-full shadow-md px-3 py-2"
      >
        <input
          type="text"
          placeholder="Search Location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow bg-transparent text-gray-900 placeholder-gray-700 focus:outline-none px-2"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium rounded-full hover:from-sky-600 hover:to-indigo-600 transition-all shadow"
        >
          Search
        </button>
      </form>

      {/* Weather Result */}
      {weather && (
        <div className="absolute top-14 w-full bg-white/30 backdrop-blur-xl border border-white/40 rounded-xl shadow-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-gray-700 capitalize">{weather.weather[0].description}</p>
          <p className="text-2xl font-bold text-sky-700">
            {Math.round(weather.main.temp)}°C
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-14 w-full bg-red-200/70 text-red-900 rounded-xl p-3 text-center text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
