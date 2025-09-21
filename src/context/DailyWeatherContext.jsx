import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DailyWeatherContext = createContext();

export const DailyWeatherProvider = ({ children }) => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyData = async (lat, lon) => {
      try {
        const res = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=15&key=a70ba2d124154067afe94f64a218824b`
        );
        setDailyData(res.data.data); // 15-day forecast array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch daily forecast.");
        setLoading(false);
      }
    };

    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchDailyData(latitude, longitude);
        },
        () => {
          setError("Unable to retrieve location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <DailyWeatherContext.Provider value={{ dailyData, loading, error }}>
      {children}
    </DailyWeatherContext.Provider>
  );
};
