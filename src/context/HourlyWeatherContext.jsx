
import React, { createContext, useState, useEffect, use } from "react";
import axios from "axios";

export const HourlyWeatherContext = createContext();

export const HourlyWeatherProvider = ({ children }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[city,setCity]=useState("")
  const[timeZone,setTimeZone]=useState("")


  useEffect(() => {
    const fetchHourlyData = async (lat, lon) => {
      try {
        const res = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&hours=24&key=a70ba2d124154067afe94f64a218824b`
        );
        setCity(res.data.city_name)
        setTimeZone(res.data.timezone)
        setHourlyData(res.data.data); // Weatherbit returns array of 24 hours
      } catch (err) {
        console.error("Failed to fetch hourly weather data:", err);
        setError("Unable to fetch hourly weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Get user location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchHourlyData(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied. Please allow location for weather data.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
    }
  }, []);
  // console.log(city)
  console.log(timeZone)
  return (
    <HourlyWeatherContext.Provider value={{ hourlyData,city,loading, timeZone, error }}>
      {children}
    </HourlyWeatherContext.Provider>
  );
};
