// src/components/SearchBar.jsx
import React, { useState } from "react";
import { useHourlyWeather } from "../context/HourlyWeatherContext";



const SearchBar = () => {

  const[change,setChange]=useState("")
   const { setSearchCity } = useHourlyWeather();

  const handleSubmit=(e)=>{
    e.preventDefault();
    setSearchCity(change)
  }


  return (
    <div className=" w-full pt-2 ">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white/10 backdrop-blur-xl border border-white/50 rounded-full shadow-md px-3 py-2"
      >
        <input
          type="text"
          placeholder="Search Location"
          value={change}
          onChange={(e) => setChange(e.target.value)}
          className="flex-grow bg-transparent text-gray-900 placeholder-gray-700 focus:outline-none px-2"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium rounded-full hover:from-sky-600 hover:to-indigo-600 transition-all shadow"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
