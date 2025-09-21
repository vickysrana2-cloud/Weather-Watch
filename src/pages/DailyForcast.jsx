import React, { useContext } from "react";
import { DailyWeatherContext } from "../context/DailyWeatherContext";

const DailyForcast = () => {
  const { dailyData, loading, error } = useContext(DailyWeatherContext);

  if (loading) {
    return <p className="text-center mt-10">Loading 15-day forecast...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  if (!dailyData || dailyData.length === 0) {
    return <p className="text-center mt-10">No forecast data available.</p>;
  }

  return (
    <div className="mx-auto m-4 font-sans">
      <div
        className="mx-auto rounded-xl shadow-md overflow-hidden md:max-w-3xl bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg')",
        }}
      >
        <div className="p-4 bg-gray-100 bg-opacity-50 border-b border-red-200">
          <h1 className="text-xl font-bold text-gray-800">
            15-Day Weather Forecast
          </h1>
        </div>

        {/* Forecast grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow bg-white/60 backdrop-blur-md flex flex-col items-center"
            >
              <p className="font-semibold text-gray-800">
                {new Date(day.valid_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                alt={day.weather.description}
                className="w-12 h-12"
              />
              <p className="text-lg font-bold text-gray-900">{day.temp}°C</p>
              <p className="text-sm text-gray-700">{day.weather.description}</p>
              <p className="text-xs text-gray-500">
                Min: {day.min_temp}°C | Max: {day.max_temp}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyForcast;
