import React, { useContext } from "react";
import { DailyWeatherContext } from "../context/DailyWeatherContext";
import { MdLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import {
  WiSunrise,
  WiSunset,
  WiHumidity,
  WiDaySunny,
  WiThermometer,
} from "react-icons/wi";
import { BsWind } from "react-icons/bs";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";

const DailyForcast = () => {
  const { dailyData, cityInfo, loading, error } =
    useContext(DailyWeatherContext);
  console.log(dailyData);

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
    <div className="w-full rounded-2xl mt-2 flex justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 p-2 sm:p-4">
      <div className="w-full bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-4 sm:p-8 flex flex-col gap-6">
        {/* --------------------------------------------------------------------------------Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-blue-800">
            <MdLocationOn className="text-xl" />
            <h2 className="text-2xl font-bold">{cityInfo.city_name}</h2>
            <span className="text-gray-700 text-sm">
              ({cityInfo.country_code})
            </span>
          </div>
          <p className="text-xl font-bold text-black/60">Upcoming 15-Day Weather Trends</p>
          <div className="flex items-center gap-2 text-gray-700">
            <FaRegClock />
            <span className="text-sm">{new Date().toLocaleString()}</span>
          </div>
        </div>

        {/*  --------------------------------------------------------------------------------Forecast Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-white/40 backdrop-blur-md shadow-xl flex flex-col gap-3 text-gray-800"
            >
              {/*  --------------------------------------------------------------------------------Date */}
              <p className="font-semibold text-lg text-gray-900 text-center">
                {new Date(day.valid_date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {/*  --------------------------------------------------------------------------------Weather Icon + Description */}
              <div className="flex flex-col items-center">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                  alt={day.weather.description}
                  className="w-16 h-16"
                />
                <p className="text-sm text-gray-700">
                  {day.weather.description}
                </p>
              </div>

              {/*  --------------------------------------------------------------------------------Temps */}
              <div className="text-center">
                <p className="text-3xl font-bold">{day.temp}°C</p>
                <p className="text-xs text-gray-600">
                  Min: {day.min_temp}°C | Max: {day.max_temp}°C
                </p>
                <p className="text-xs text-gray-600">
                  Feels Like: {day.app_max_temp}°C
                </p>
              </div>

              {/*  --------------------------------------------------------------------------------Extra Details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <WiSunrise className="text-xl text-amber-500" />
                  <span>
                    {new Date(day.sunrise_ts * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false, // -------------------------- 24-hour format
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <WiSunset className="text-xl text-orange-600" />
                  <span>
                    {new Date(day.sunset_ts * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false, // ensures 24-hour format
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <BsWind className="text-sm text-blue-700" />
                  <span>
                    {day.wind_spd} m/s {day.wind_cdir_full}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <WiThermometer className="text-lg text-red-500" />
                  <span>{day.pres} mb</span>
                </div>
                <div className="flex items-center gap-1">
                  <WiHumidity className="text-lg text-sky-500" />
                  <span>{day.rh}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <WiDaySunny className="text-lg text-yellow-500" />
                  <span>UV: {day.uv}</span>
                </div>
              </div>

              {/*  --------------------------------------------------------------------------------Footer Info */}
              <div className="flex justify-between text-[10px] text-gray-500 border-t pt-2">
                <span className="flex items-center gap-1">
                  <TbWorldLatitude /> {cityInfo.lat.toFixed(2)}
                </span>
                <span className="flex items-center gap-1">
                  <TbWorldLongitude /> {cityInfo.lon.toFixed(2)}
                </span>
                <span>{cityInfo.timezone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyForcast;
