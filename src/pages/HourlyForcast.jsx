import React, { useContext, useState } from "react";
import { HourlyWeatherContext } from "../context/HourlyWeatherContext";
import { MdLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { WiHumidity, WiDaySunny, WiThermometer } from "react-icons/wi";
import { BsWind } from "react-icons/bs";

const HourlyForecast = () => {
  const { hourlyData, city, loading, error } =
    useContext(HourlyWeatherContext);

  if (loading)
    return <p className="text-center mt-10">Loading hourly forecast...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!hourlyData || hourlyData.length === 0) return <p>No data available.</p>;

  return (
    <div className="mx-auto my-4 rounded-xl backdrop-blur-3xl bg-sky-200 shadow-md font-sans">
      {/* -------------------------------------------------------------- Header */}
      <div className="p-4 flex flex-wrap justify-between px-9 bg-opacity-50 rounded-t-2xl border-b border-blue-200">
        <h1 className="text-xl font-bold text-orange-600 flex items-center"><MdLocationOn/> {city}</h1>
        <h1 className="text-xl font-bold text-black/60">Next 24-Hour Weather Outlook</h1>
      </div>

      {/* -------------------------------------------------------------- Hourly Cards */}
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 ">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="p-6 backdrop-blur-2xl bg-white/30 rounded-3xl shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300"
          >
            {/* -------------------------------------------------------------- Location + Time */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 text-gray-700">
                <FaRegClock className="text-lg" />
                <span className="text-lg font-semibold">
                  {new Date(hour.timestamp_local).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------------- Main Weather Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-8">
              {/* -------------------------------------------------------------- Left Side */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`}
                  alt={hour.weather.description}
                  className="w-20 h-20 drop-shadow-md"
                />
                <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                  {hour.weather.description}
                </h3>
                <p className="text-5xl font-bold text-gray-900 mt-3">
                  {hour.temp}°C
                </p>
                <p className="text-lg font-semibold text-gray-600 mt-1">
                  Feels like: {hour.app_temp}°C
                </p>
              </div>

              {/* -------------------------------------------------------------- Right Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 w-full ">
                <div className="flex items-center gap-2 p-3   bg-white/40 rounded-xl shadow sm:bg-transparent sm:rounded-none sm:shadow-none">
                  <BsWind className="text-xl text-blue-700" />
                  <span className="text-sm font-medium">
                    Wind: {hour.wind_spd.toFixed(1)} m/s ({hour.wind_cdir})
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3  bg-white/40 rounded-xl shadow sm:bg-transparent sm:rounded-none sm:shadow-none">
                  <WiThermometer className="text-2xl text-red-500" />
                  <span className="text-sm font-medium">
                    Pres: {hour.pres} mb
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3  bg-white/40 rounded-xl shadow sm:bg-transparent sm:rounded-none sm:shadow-none">
                  <WiHumidity className="text-2xl text-sky-500" />
                  <span className="text-sm font-medium">
                    Humidity: {hour.rh}%
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3  bg-white/40 rounded-xl shadow sm:bg-transparent sm:rounded-none sm:shadow-none">
                  <WiDaySunny className="text-2xl text-yellow-500" />
                  <span className="text-sm font-medium">
                    UV Index: {hour.uv ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
