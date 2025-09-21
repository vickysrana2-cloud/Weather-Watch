
import React, { useState, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BsWind } from "react-icons/bs";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import {
  WiSunrise,
  WiSunset,
  WiStrongWind,
  WiHumidity,
  WiThermometer,
  WiDaySunny,
} from "react-icons/wi";

const containerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India center
const libraries = ["marker"];

function WeatherMap() {
    
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCJ_wJ-hXDCnKoACXwrZN9qVfc2j95BVlQ",
    libraries // ✅ load marker library
  });

  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Remove old marker if exists
    if (marker) {
      marker.map = null;
    }

    // ✅ Use AdvancedMarkerElement
    const newMarker = new window.google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      map: mapRef.current,
      title: "Selected Location",
    });
    setMarker(newMarker);

    // ✅ Fetch weather
    try {
      const API_KEY = "a70ba2d124154067afe94f64a218824b";
      const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data.data[0]);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setWeather(null);
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;
  console.log(weather)
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        // onLoad={(map) => (mapRef.current = map)}
        mapId="1708cb01188ac97ff093ebe9"

        onClick={handleMapClick}
      />

      {weather && (
        <div className="w-full rounded-2xl mt-2 sm:h-screen flex sm:items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl shadow-2xl 
                       rounded-3xl p-2 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-blue-800">
            <MdLocationOn className="text-xl" />
            <h2 className="text-2xl font-bold">{weather.city_name}</h2>
            <span className="text-gray-700 text-sm">({weather.country_code})</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaRegClock />
            <span className="text-sm">{new Date(weather.ob_time).toLocaleString()}</span>
          </div>
        </div>

        {/* Main Weather Section */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          {/* Left: Weather Info */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
              alt={weather.weather.description}
              className="w-20 h-20"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              {weather.weather.description}
            </h3>
            <p className="text-5xl font-bold text-gray-900 mt-2">
              {weather.temp}°C
            </p>
            <p className="text-sm text-gray-600">
              Feels like: {weather.app_temp}°C | AQI: {weather.aqi}
            </p>
          </div>

          {/* Right: Extra Details */}
          <div className="grid grid-cols-2 gap-4 text-gray-700 w-full sm:w-1/2">
            <div className="flex items-center gap-2">
              <WiSunrise className="text-3xl text-amber-500" />
              <span>Sunrise: {weather.sunrise}</span>
            </div>
            <div className="flex items-center gap-2">
              <WiSunset className="text-3xl text-orange-600" />
              <span>Sunset: {weather.sunset}</span>
            </div>
            <div className="flex items-center gap-2">
              <BsWind className="text-xl text-blue-700" />
              <span>
                Wind: {weather.wind_spd} m/s ({weather.wind_cdir_full})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <WiThermometer className="text-2xl text-red-500" />
              <span>Pressure: {weather.pres} mb</span>
            </div>
            <div className="flex items-center gap-2">
              <WiHumidity className="text-2xl text-sky-500" />
              <span>Humidity: {weather.rh}%</span>
            </div>
            <div className="flex items-center gap-2">
              <WiDaySunny className="text-2xl text-yellow-500" />
              <span>UV Index: {weather.uv}</span>
            </div>
          </div>
        </div>

        {/* Footer: Extra Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 border-t border-white/40">
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <TbWorldLatitude /> Lat: {weather.lat.toFixed(2)}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <TbWorldLongitude /> Lon: {weather.lon.toFixed(2)}
          </span>
          <span className="text-xs text-gray-600">Timezone: {weather.timezone}</span>
        </div>
      </div>
    </div>
      )}
    </div>
  );
}

export default WeatherMap;


