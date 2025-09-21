import React, { useContext, useState } from "react";
import { HourlyWeatherContext } from "../context/HourlyWeatherContext";

const HourlyForecast = () => {
  const { hourlyData, loading, error } = useContext(HourlyWeatherContext);
  const [selectedHour, setSelectedHour] = useState(null);

  if (loading) return <p className="text-center mt-10">Loading hourly forecast...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!hourlyData || hourlyData.length === 0) return <p>No data available.</p>;

  return (
    <div className="mx-auto m-4 font-sans">
      <div className="mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl bg-cover bg-center"
        style={{ backgroundImage: `url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg')` }}>
        <div className="p-4 bg-gray-100 bg-opacity-50 border-b border-red-200">
          <h1 className="text-xl font-bold text-gray-800">{hourlyData[0].city_name}</h1>
        </div>

        {/* Hourly grid */}
        <div className="grid grid-cols-6 gap-2 overflow-x-auto md:grid-cols-10 p-4">
          {hourlyData.map((hour, index) => (
            <div key={index} onClick={() => setSelectedHour(index)}
              className="text-center p-2 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 bg-gray-100 bg-opacity-70">
              <div className="text-sm text-gray-500">
                {new Date(hour.timestamp_local).getHours()}:00
              </div>
              <div className="text-lg font-medium text-gray-800">
                {hour.temp}°
              </div>
              <div className="text-xs text-gray-600">{hour.weather.description}</div>
            </div>
          ))}
        </div>

        {selectedHour !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="text-white rounded-xl shadow-lg relative w-80 p-6 bg-gray-800 bg-opacity-90">
              <button className="absolute top-2 right-2 text-gray-300 hover:text-white"
                onClick={() => setSelectedHour(null)}>
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">
                Details for {new Date(hourlyData[selectedHour].timestamp_local).getHours()}:00
              </h2>
              <div className="space-y-2">
                <p><b>Temperature:</b> {hourlyData[selectedHour].temp}°C</p>
                <p><b>Condition:</b> {hourlyData[selectedHour].weather.description}</p>
                <p><b>Feels Like:</b> {hourlyData[selectedHour].app_temp}°C</p>
                <p><b>Humidity:</b> {hourlyData[selectedHour].rh}%</p>
                <p><b>Wind:</b> {hourlyData[selectedHour].wind_spd.toFixed(1)} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;
