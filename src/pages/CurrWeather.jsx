
import React, { useContext } from "react";
import { HourlyWeatherContext } from "../context/HourlyWeatherContext";
import { WiBarometer, WiHumidity, WiRain, WiStrongWind } from "react-icons/wi";
import HourlySlider from "../components/HourlySlider";
import DisplayRecentAlertsSlider from "../components/DisplayRecentAlertsSlider";
import WeatherMap from "../components/WeatherMap";



const CurrWeather = () => {
  const { hourlyData, loading, city, timeZone, error } =
    useContext(HourlyWeatherContext);

  if (loading) {
    return <p className="text-center mt-10">Loading current weather...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10">{error}</p>;
  }

  if (!hourlyData || hourlyData.length === 0) {
    return <p className="text-center mt-10">No weather data available.</p>;
  }

  // First hour = current weather, rest = forecast
  const current = hourlyData[0];
  console.log(current);
  const forecast = hourlyData.slice(1, 8); // show next 7 hours

  return (
    <>
    <div className="flex flex-col justify-center items-center  rounded-2xl my-2  min-h-screen back bg-sky-200 p-4">
      <div className="mx-auto rounded-xl shadow-md overflow-hidden w-full max-w-7xl sm:mt-16  my-4 font-sans backdrop-blur-2xl bg-black/10 bg-cover">
        {/* Header with city name */}
        <div className="px-9 pt-4 flex justify-between items-center">
          <h1 className="sm:text-6xl text-2xl font-bold text-gray-800">
            {city || "Your Location"}
          </h1>
          <p className=" text-sm  text-gray-800">{timeZone || "Time Zone"}</p>
        </div>

        <div className="p-6">
          {/* Current date & temperature */}
          <div className="text-center mb-6">
            <h2 className="sm:text-9xl text-7xl font-bold text-gray-800">
              {Math.round(current.temp)}°C
            </h2>
            <p className="text-gray-600 sm:text-2xl sm:font-semibold">
              {current.weather.description}
            </p>
          </div>

          {/* Forecast grid */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {forecast.map((hour, index) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-3xl font-medium text-gray-800">
                  {Math.round(hour.temp)}°
                </div>
                <div className="text-xs sm:text-[16px] text-gray-600">
                  {new Date(hour.timestamp_local).getHours()}:00
                </div>
              </div>
            ))}
          </div>

          {/* Weather details */}
          <div
            className="mt-4 p-4 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg 
                border border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800"
          >
            {/* Pressure */}
            <div className="flex justify-between sm:justify-evenly items-center">
              <span className="flex items-center gap-2">
                <WiBarometer className="text-xl text-blue-600" />
                Pressure
              </span>
              <span className="font-semibold">{current.pres} mb</span>
            </div>

            {/* Humidity */}
            <div className="flex justify-between sm:justify-evenly items-center">
              <span className="flex items-center gap-2">
                <WiHumidity className="text-xl text-blue-600" />
                Humidity
              </span>
              <span className="font-semibold">{current.rh}%</span>
            </div>

            {/* Precipitation */}
            <div className="flex justify-between sm:justify-evenly items-center">
              <span className="flex items-center gap-2">
                <WiRain className="text-xl text-blue-600" />
                Precipitation
              </span>
              <span className="font-semibold">{current.pop ?? 0}%</span>
            </div>

            {/* Wind */}
            <div className="flex justify-between sm:justify-evenly items-center">
              <span className="flex items-center gap-2">
                <WiStrongWind className="text-xl text-blue-600" />
                Wind
              </span>
              <span className="font-semibold">
                {current.wind_spd} m/s {current.wind_cdir_full}
              </span>
            </div>
          </div>
        </div>
      </div>
        <HourlySlider />
        <DisplayRecentAlertsSlider/>
    </div>
          <div className="w-full rounded-2xl bg-sky-200 p-2 sm:p-10 mx-auto">
      <div className="sm:p-5 my-2 backdrop-blur-2xl bg-black/30 rounded-2xl mx-auto">
      <WeatherMap/>
      </div>
      </div>
    </>
  );
};

export default CurrWeather;
